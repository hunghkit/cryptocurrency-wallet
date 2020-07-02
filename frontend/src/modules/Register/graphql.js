import gql from 'graphql-tag';

export const MUTATION_REGISTER = gql`
  mutation register($user: RegisterInput!) {
    register(user: $user) {
      token
      user {
        id
      }
    }
  }
`;
