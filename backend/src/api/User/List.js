import { filterUser } from '../../modules/User/handlers';

const userList = (_, args) => {
  return filterUser(args.input);
};

const schema = `
  extend type Query {
    userList(input: UserFilter): UserConnection!
  }

  type UserConnection {
    total: Int
    nodes: [User]
  }

  input UserFilter {
    keyword: String
  }
`;

const resolvers = {
  Query: {
    userList,
  },
};

export default {
  schema,
  resolvers,
};
