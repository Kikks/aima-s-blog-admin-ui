import { gql } from '../__generated__';

export const GET_FEATURED_POSTS = gql(`
  query featuredPosts {
    getFeaturedPosts {
      theme {
        name
      }
      post {
        id
        title
        coverImage
        preview
        slug
        category {
          id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const GET_POSTS = gql(`
  query getAllPosts(
    $category: ID
    $limit: Int
    $order: String
    $page: Int
    $search: String
    $sortBy: String
    $isPublished: Boolean
  ) {
    getAllPosts(
      category: $category
      limit: $limit
      order: $order
      page: $page
      search: $search
      sortBy: $sortBy
      isPublished: $isPublished
    ) {
      data {
        id
        title
        category {
          id
          name
        }
        isPublished
        publishedAt
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

export const GET_POST = gql(`
  query adminGetPost($postId: ID!) {
    adminGetPost(id: $postId) {
      post {
        id
        title
        coverImage
        preview
        slug
        audio
        body
        category {
          id
          name
        }
        isPublished
        publishedAt
        createdAt
        updatedAt
      }
      comments
      likes
    }
  }
`);

export const GET_PREVIOUS_AND_NEXT_POST = gql(`
  query getPreviousAndNextosts($postId: ID!) {
    getPreviousAndNextPosts(postId: $postId) {
      next {
        title
        slug
        id
      }
      prev {
        title
        slug
        id
      }
    }
  }
`);

export const COUNT_POSTS = gql(`
  query countPosts {
    countPosts {
      total
      drafts
      published
    }
  }
`);

export const GET_IS_POST_FEATURED = gql(`
  query getIsPostFeaured($postId: ID!) {
    getIsPostFeatured(postId: $postId)
  }
`);
