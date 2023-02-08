import { gql } from '../__generated__';

export const COUNT_USERS = gql(`
  query countUsers {
    countUsers
  }
`);

export const GET_USERS = gql(`
  query getUsers($limit: Int, $page: Int, $search: String) {
    getUsers(limit: $limit, page: $page, search: $search) {
      data {
        id
        name
        email
        image
        createdAt
        updatedAt
      }
      meta {
        currentPage
        pages
        total
      }
    }
  }
`);

export const GET_USER = gql(`
  query getUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`);
