import Auth from './Auth';
import Login from './Login';
import Register from './Register';

export const schema = [Auth.schema, Login.schema, Register.schema];

export const resolvers = [Auth.resolvers, Login.resolvers, Register.resolvers];
