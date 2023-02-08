import { gql } from '../__generated__';

export const GET_FEATURED_CATEGORIES = gql(`
  query getFeaturedCategories {
    getFeaturedCategories {
      id
      name
      image
      createdAt
      updatedAt
    }
  }
`);

export const GET_CATEGORIES = gql(`
  query getCategories($search: String, $page: Int, $limit: Int) {
    getCategories(search: $search, page: $page, limit: $limit) {
      data {
        id
        name
        image
        isFeatured
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

export const GET_CATEGORY = gql(`
  query getCategory($categoryId: ID!) {
    getCategory(id: $categoryId) {
      id
      name
      image
      isFeatured
      description
      createdAt
      updatedAt
    }
  }
`);

export const COUNT_CATEGORIES = gql(`
  query countCategories {
    countCategories
  }
`);

export const GET_CATEGORIES_STATS = gql(`
  query getCategoryStats(
    $limit: Int
    $page: Int
    $search: String
  ) {
    getCategoriesStats(
      limit: $limit
      page: $page
      search: $search
    ) {
      data {
        category {
          id
          name
          image
          isFeatured
          createdAt
          updatedAt
        }
        posts
      }
      meta {
        currentPage
        pages
        total
      }
    }
  }
`);
