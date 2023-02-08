import { gql } from '../__generated__';

export const CREATE_CATEGORY = gql(`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      image
      name
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_CATEGORY = gql(`
  mutation updateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input)
  }
`);

export const DELETE_CATEGORY = gql(`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`);

export const FEATURE_CATEGORY = gql(`
  mutation featureCategory($categoryId: ID!) {
    featureCategory(id: $categoryId)
  }
`);

export const UNFEATURE_CATEGORY = gql(`
  mutation unfeatureCategory($categoryId: ID!) {
    unfeatureCategory(id: $categoryId)
  }
`);
