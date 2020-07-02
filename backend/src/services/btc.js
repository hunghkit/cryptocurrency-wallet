import axios from 'axios';

function BTC({ url, detail, alternative }, address) {
  this.url = url;
  this.detail = detail;
  this.address = address;
  this.alternative = alternative;
}

BTC.prototype.getInfo = async function ({ limit = 50, offset = 0 } = {}) {
  const { data } = await axios.get(
    this.url +
      `/rawaddr/${this.address}?offset=${offset || 0}&limit=${limit || 50}`,
  );

  if (data && data.txs.length > 0) {
    data.txs = data.txs.map((tx) => ({
      ...tx,
      txid: tx.hash,
      href: `${this.detail}/tx/${tx.hash}`,
    }));
  }

  if (data) {
    data.href = `${this.detail}/address/${data.address}`;
  }

  return data;
};

BTC.prototype.getBalance = async function () {
  const { data } = await axios.get(
    this.url + `/balance?active=${this.address}`,
  );

  if (data) {
    data.href = `${this.detail}/address/${data.address}`;
  }

  return data;
};

BTC.prototype.getUnspent = async function ({ limit = 50, offset = 0 } = {}) {
  try {
    const { data } = await axios.get(
      this.url +
        `/unspent?active=${this.address}&offset=${Math.max(offset, 0)}&limit=${
          limit || 50
        }`,
    );

    if (data && data.unspent_outputs) {
      return data.unspent_outputs.map((tx) => ({
        ...tx,
        result: tx.value,
        vout: tx.tx_output_n,
        txid: tx.tx_hash_big_endian,
      }));
    }

    return [];
  } catch (e) {
    console.log('error:', e);
    return [];
  }
};

BTC.prototype.getTransaction = async function (txId, format = 'hex') {
  const { data } = await axios.get(
    this.url + `/rawtx/${txId}?format=${format}`,
  );

  if (data && format === 'json') {
    data.href = `${this.detail}/tx/${txId}`;
  }

  return data;
};

BTC.prototype.pushTransaction = async function (tx) {
  // Can not push raw transaction to https://blockchain.info, so have to change to https://blockstream.info
  const { data } = await axios.post(this.alternative + '/tx', tx);
  return data;
};

BTC.prototype.getBlock = async function (hash, format = 'hex') {
  const { data } = await axios.get(
    this.url + `/rawblock/${hash}?format=${format}`,
  );
  return data;
};

export const getExchangeRate = async (currency = 'BTC') => {
  const { data } = await axios.get(
    `https://blockchain.info/ticker?base${currency}`,
  );
  return Object.entries(data).map(([currency, item]) => ({
    ...item,
    currency,
  }));
};

export const apiUrlForNetwork = (network) => {
  switch (network) {
    case 'bitcoin':
      return {
        url: 'https://blockchain.info',
        detail: 'https://blockchain.com/btc',
        alternative: 'https://blockstream.info/api',
      };
    case 'testnet':
      return {
        url: 'https://testnet.blockchain.info',
        detail: 'https://blockchain.com/btc-testnet',
        alternative: 'https://blockstream.info/testnet/api',
      };
    default:
      throw new Error('Invalid network: ' + network);
  }
};

export const createUsingNetwork = ({ network, address }) => {
  return new BTC(apiUrlForNetwork(network), address);
};

export default BTC;
