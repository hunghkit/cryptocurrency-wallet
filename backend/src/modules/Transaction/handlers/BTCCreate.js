import * as bitcoin from 'bitcoinjs-lib';

import { createUsingNetwork } from '../../../services/btc';

import { getBTCWallet } from '../../User/handlers';

export const createBTCTransaction = async (id, input) => {
  const sender = await getBTCWallet(id);
  const network = bitcoin.networks[sender.network];
  const psbt = new bitcoin.Psbt({ network: bitcoin.networks.testnet });
  const api = createUsingNetwork(sender);
  psbt.setVersion(2); // These are defaults. This line is not needed.
  psbt.setLocktime(0xfffffffe); // These are defaults. This line is not needed.
  const keyPair = bitcoin.ECPair.fromWIF(sender.wif, network);

  let [tx] = await api.getUnspent();

  if (!tx) {
    throw new Error('Out of balance');
  }

  console.log('tx:', tx);

  const hex = await api.getTransaction(tx.txid, 'hex');

  const inputData = {
    hash: tx.txid,
    index: tx.vout,
    nonWitnessUtxo: Buffer.from(hex, 'hex'),
  };

  psbt.addInput(inputData);

  const outData = {
    value: Math.round(input.amount * 1e8),
    address: input.recipient,
  };

  psbt.addOutput(outData);
  psbt.signInput(0, keyPair);
  psbt.validateSignaturesOfInput(0);
  psbt.finalizeAllInputs();

  const newHex = psbt.extractTransaction().toHex();
  const txid = await api.pushTransaction(newHex);

  console.log('txid:', txid);

  return {
    txid,
  };
};
