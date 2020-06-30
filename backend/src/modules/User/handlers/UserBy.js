import User from '../User';

export const getUserBy = (by, ...args) => User.findOne(by, ...args);
