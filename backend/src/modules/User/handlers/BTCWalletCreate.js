import * as bitcoin from 'bitcoinjs-lib';

import User from '../User';

const networkType = process.env.testnet ? 'testnet' : 'bitcoin';
const network = bitcoin.networks[networkType];

export const createBTCWallet = async (userId) => {
  const btcWallet = await User.findOne(
    {
      'wallets.currency.symbol': 'BTC',
      _id: userId,
      'wallets.network': networkType,
    },
    { email: 1 },
  );

  if (btcWallet) {
    throw { message: `BTC wallet for user ${userId} existed` };
  }

  const keyPair = bitcoin.ECPair.makeRandom({ network });

  const { address } = bitcoin.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network,
  });

  const params = {
    address,
    keyPair,
    network: networkType,
    wif: keyPair.toWIF(),
    currency: {
      symbol: 'BTC',
      name: 'Bitcoin',
    },
    publicKey: keyPair.publicKey,
  };

  await User.updateOne(
    { _id: userId },
    {
      $push: {
        wallets: params,
      },
    },
  );

  const rs = await User.findOne({ 'wallets.address': address }, { wallets: 1 });

  if (!rs) {
    throw { message: `User ${userId} not exist` };
  }

  return rs.wallets.find((item) => item.address === address);
};
