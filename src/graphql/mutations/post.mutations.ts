import { gql } from '../__generated__';

export const CREATE_POST = gql(`
  mutation createPost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      coverImage
      preview
      body
      slug
      category {
        id
        image
        name
        createdAt
        updatedAt
      }
      isPublished
      createdAt
      updatedAt
    }
  }
`);

export const UPDATE_POST = gql(`
  mutation updatePost($postId: ID!, $input: PostInput!) {
    updatePost(id: $postId, input: $input)
  }
`);

export const DELETE_POST = gql(`
  mutation deletePost($postId: ID!) {
    deletePost(id: $postId)
  }
`);

export const PUBLISH_POST = gql(`
  mutation publishPost($postId: ID!) {
    publishPost(id: $postId)
  }
`);

export const UNPUBLISH_POST = gql(`
  mutation unpublishPost($postId: ID!) {
    unpublishPost(id: $postId)
  }
`);

export const FEATURE_POST = gql(`
  mutation featurePost($postId: ID!, $themeId: ID!, $index: Int) {
    featurePost(postId: $postId, themeId: $themeId, index: $index)
  }
`);

export const UNFEATURE_POST = gql(`
  mutation unfeaturePost($postId: ID!) {
    unfeaturePost(postId: $postId)
  }
`);
