import { createUsingNetwork } from '../../../services/btc';

export const getBTCBalance = async (input) => {
  const api = createUsingNetwork(input);
  const wallet = await api.getInfo();
  return wallet.final_balance / 1e8;
};
