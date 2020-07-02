import gql from 'graphql-tag';

export const QUERY_PROFILE = gql`
  query QUERY_PROFILE {
    user: profile {
      id
    }
  }
`;
