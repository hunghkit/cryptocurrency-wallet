import gql from 'graphql-tag';

export const MUTATION_LOGIN = gql`
  mutation login($user: AuthInput!) {
    login(user: $user) {
      token
      user {
        id
      }
    }
  }
`;
