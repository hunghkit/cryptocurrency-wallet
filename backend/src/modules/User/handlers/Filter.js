import User from '../User';

export const filterUser = async (input) => {
  const nodes = await User.find(input);

  return {
    nodes,
    total: nodes.length,
  };
};
