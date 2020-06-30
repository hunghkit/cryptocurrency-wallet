import User from './User';
import List from './List';

export const schema = [User.schema, List.schema];

export const resolvers = [User.resolvers, List.resolvers];
