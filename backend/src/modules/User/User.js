import bcrypt from 'bcrypt';
import randomstring from 'randomstring';

import { database } from '../database';

const networkType = process.env.testnet ? 'testnet' : 'bitcoin';

const UserSchema = new database.Schema(
  {
    firstName: { type: String, maxlength: 80 },
    lastName: { type: String, maxlength: 175 },
    email: {
      type: String,
      maxlength: 255,
      unique: true,
    },
    loginKey: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    gender: {
      type: String,
      default: 'none',
      enum: ['male', 'female', 'none'],
    },
    password: { type: String, maxlength: 255 },
    disabled: { type: Boolean, default: false },
    roles: [{ type: String, default: 'user' }],
    wallets: [
      {
        address: {
          type: String,
          unique: true,
          required: true,
        },
        network: String,
        wif: {
          required: true,
          type: String,
        },
        pubicKey: {
          required: true,
          type: Buffer,
        },
        keyPair: database.Schema.Types.Mixed,
        currency: {
          name: {
            type: String,
            required: true,
          },
          symbol: {
            type: String,
            required: true,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true },
  },
);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.methods.getBTCWallet = function () {
  return this.wallets.find(
    (wallet) =>
      wallet.currency.symbol === 'BTC' && wallet.network === networkType,
  );
};

UserSchema.statics.getBTCWallet = async function (_id) {
  const rs = await this.findOne({ _id }, { wallets: 1 });

  if (!rs) {
    throw new Error('BTC wallet not found');
  }

  return rs.wallets.find(
    (wallet) =>
      wallet.currency.symbol === 'BTC' && wallet.network === networkType,
  );
};

UserSchema.statics.authenticate = async function ({ email, password } = {}) {
  try {
    const user = await this.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password || '')) {
      throw { message: 'Authentication failed. Invalid user or password.' };
    }

    return user;
  } catch (e) {
    console.warn('authenticate:', e);
    throw e;
  }
};

UserSchema.statics.register = async function ({
  email,
  password,
  confirmPassword,
  ...others
} = {}) {
  try {
    const user = await this.findOne({ email });

    if (user) {
      throw { email: 'Email has taken' };
    }

    if (!password || confirmPassword !== password) {
      throw { confirmPassword: 'Confirm password need to map password' };
    }

    const permitParams = {
      email,
      ...others,
    };

    permitParams.loginKey = randomstring.generate(40);
    permitParams.password = bcrypt.hashSync(password, 10);

    return this.create(permitParams);
  } catch (e) {
    console.warn('register:', e);
    throw e;
  }
};

/**
 * Ignore password in response to json or object
 */
UserSchema.set('toJSON', {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});

UserSchema.set('toObject', {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});

export default database.model('user', UserSchema);
