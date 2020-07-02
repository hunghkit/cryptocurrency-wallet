import Auth from './Auth';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';

export const schema = [
  Auth.schema,
  Login.schema,
  Register.schema,
  Profile.schema,
];

export const resolvers = [
  Auth.resolvers,
  Login.resolvers,
  Register.resolvers,
  Profile.resolvers,
];
