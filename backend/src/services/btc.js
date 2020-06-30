import axios from 'axios';

function BTC(url, address) {
  this.url = url;
  this.address = address;
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
    }));
  }
  return data;
};

BTC.prototype.getBalance = async function () {
  const { data } = await axios.get(
    this.url + `/balance?active=${this.address}`,
  );
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
  return data;
};

BTC.prototype.pushTransaction = async function (tx) {
  if (this.url === 'https://testnet.blockchain.info') {
    const { data } = await axios.post(
      'https://blockstream.info/testnet/api/tx',
      tx,
    );
    return data;
  } else {
    const { data } = await axios.post(this.url + '/pushtx', { tx });
    return data;
  }
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
      return 'https://blockchain.info';
    case 'testnet':
      return 'https://testnet.blockchain.info';
    default:
      throw new Error('Invalid network: ' + network);
  }
};

export const createUsingNetwork = ({ network, address }) => {
  return new BTC(apiUrlForNetwork(network), address);
};

export default BTC;
