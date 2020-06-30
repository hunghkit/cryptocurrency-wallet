import axios from 'axios';

function BTC(url, address) {
  this.url = url;
  this.address = address;
}

BTC.prototype.getInfo = async function () {
  const { data } = await axios.get(this.url + `/rawaddr/${this.address}`);
  return data;
};

BTC.prototype.getBalance = async function () {
  const { data } = await axios.get(
    this.url + `/balance?active=${this.address}`,
  );
  return data;
};

BTC.prototype.getUnspent = async function () {
  const { data } = await axios.get(
    this.url + `/unspent?active=${this.address}`,
  );
  return data;
};

BTC.prototype.getTransaction = async function (txId) {
  const { data } = await axios.get(this.url + `/rawtx/${txId}?format=hex`);
  return data;
};

BTC.prototype.getBlock = async function (hash) {
  const { data } = await axios.get(this.url + `/rawblock/${hash}?format=hex`);
  return data;
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
