import { getBTCWallet } from '../../User/handlers';
import { createUsingNetwork } from '../../../services/btc';

export const getBTCList = async (id, { limit = 50, page = 0 } = {}) => {
  const _page = Math.max(page, 1);
  const next = { limit, page: _page + 1 };
  const offset = limit * (_page - 1);
  const sender = await getBTCWallet(id);
  const api = createUsingNetwork(sender);
  const { txs: nodes } = await api.getInfo({ offset, limit });

  if (nodes.length < limit) {
    next.page = null;
  }

  return {
    next,
    nodes,
  };
};
