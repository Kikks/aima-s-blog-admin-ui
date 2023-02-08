import { gql } from '../__generated__';

export const LOGIN = gql(`
  mutation adminLogin($input: AdminLoginInput!) {
    adminLogin(input: $input) {
      token
      user {
        id
        image
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
    }
  }
`);
