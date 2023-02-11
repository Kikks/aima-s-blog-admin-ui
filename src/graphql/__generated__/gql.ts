/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation createCategory($input: CategoryInput!) {\n    createCategory(input: $input) {\n      id\n      image\n      name\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation updateCategory($id: ID!, $input: CategoryInput!) {\n    updateCategory(id: $id, input: $input)\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation featureCategory($categoryId: ID!) {\n    featureCategory(id: $categoryId)\n  }\n": types.FeatureCategoryDocument,
    "\n  mutation unfeatureCategory($categoryId: ID!) {\n    unfeatureCategory(id: $categoryId)\n  }\n": types.UnfeatureCategoryDocument,
    "\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n": types.LikePostDocument,
    "\n  mutation commentOnPost($postId: ID!, $input: CommentInput!) {\n    createComment(postId: $postId, input: $input) {\n      id\n      body\n      user {\n        id\n        name\n        email\n        image\n      }\n      createdAt\n    }\n  }\n": types.CommentOnPostDocument,
    "\n  mutation deleteComment($commentId: ID!) {\n    deleteComment(id: $commentId)\n  }\n": types.DeleteCommentDocument,
    "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      coverImage\n      preview\n      body\n      slug\n      category {\n        id\n        image\n        name\n        createdAt\n        updatedAt\n      }\n      isPublished\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation updatePost($postId: ID!, $input: PostInput!) {\n    updatePost(id: $postId, input: $input)\n  }\n": types.UpdatePostDocument,
    "\n  mutation deletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n": types.DeletePostDocument,
    "\n  mutation publishPost($postId: ID!) {\n    publishPost(id: $postId)\n  }\n": types.PublishPostDocument,
    "\n  mutation unpublishPost($postId: ID!) {\n    unpublishPost(id: $postId)\n  }\n": types.UnpublishPostDocument,
    "\n  mutation featurePost($postId: ID!, $themeId: ID!, $index: Int) {\n    featurePost(postId: $postId, themeId: $themeId, index: $index)\n  }\n": types.FeaturePostDocument,
    "\n  mutation unfeaturePost($postId: ID!) {\n    unfeaturePost(postId: $postId)\n  }\n": types.UnfeaturePostDocument,
    "\n  query getThemes {\n    getThemes {\n      id\n      name\n    }\n  }\n": types.GetThemesDocument,
    "\n  query getLatestTheme {\n    getLatestTheme {\n      id\n      name\n    }\n  }\n": types.GetLatestThemeDocument,
    "\n  mutation adminLogin($input: AdminLoginInput!) {\n    adminLogin(input: $input) {\n      token\n      user {\n        id\n        image\n        firstName\n        lastName\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.AdminLoginDocument,
    "\n  query getFeaturedCategories {\n    getFeaturedCategories {\n      id\n      name\n      image\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetFeaturedCategoriesDocument,
    "\n  query getCategories($search: String, $page: Int, $limit: Int) {\n    getCategories(search: $search, page: $page, limit: $limit) {\n      data {\n        id\n        name\n        image\n        isFeatured\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query getCategory($categoryId: ID!) {\n    getCategory(id: $categoryId) {\n      id\n      name\n      image\n      isFeatured\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetCategoryDocument,
    "\n  query countCategories {\n    countCategories\n  }\n": types.CountCategoriesDocument,
    "\n  query getCategoryStats(\n    $limit: Int\n    $page: Int\n    $search: String\n  ) {\n    getCategoriesStats(\n      limit: $limit\n      page: $page\n      search: $search\n    ) {\n      data {\n        category {\n          id\n          name\n          image\n          isFeatured\n          createdAt\n          updatedAt\n        }\n        posts\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n": types.GetCategoryStatsDocument,
    "\n  query getUserLikeForPost($postId: ID!) {\n    getUserLikeForPost(postId: $postId) {\n      id\n      post\n      user\n    }\n  }\n": types.GetUserLikeForPostDocument,
    "\n  query getComments($postId: ID!, $page: Int, $limit: Int) {\n    getComments(postId: $postId, limit: $limit, page: $page) {\n      data {\n        id\n        body\n        user {\n          id\n          name\n          email\n          image\n        }\n        post\n        createdAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n": types.GetCommentsDocument,
    "\n  query featuredPosts {\n    getFeaturedPosts {\n      theme {\n        name\n      }\n      index\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        category {\n          id\n          name\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.FeaturedPostsDocument,
    "\n  query getAllPosts(\n    $category: ID\n    $limit: Int\n    $order: String\n    $page: Int\n    $search: String\n    $sortBy: String\n    $isPublished: Boolean\n  ) {\n    getAllPosts(\n      category: $category\n      limit: $limit\n      order: $order\n      page: $page\n      search: $search\n      sortBy: $sortBy\n      isPublished: $isPublished\n    ) {\n      data {\n        id\n        title\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n": types.GetAllPostsDocument,
    "\n  query adminGetPost($postId: ID!) {\n    adminGetPost(id: $postId) {\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        audio\n        body\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      comments\n      likes\n    }\n  }\n": types.AdminGetPostDocument,
    "\n  query getPreviousAndNextosts($postId: ID!) {\n    getPreviousAndNextPosts(postId: $postId) {\n      next {\n        title\n        slug\n        id\n      }\n      prev {\n        title\n        slug\n        id\n      }\n    }\n  }\n": types.GetPreviousAndNextostsDocument,
    "\n  query countPosts {\n    countPosts {\n      total\n      drafts\n      published\n    }\n  }\n": types.CountPostsDocument,
    "\n  query getIsPostFeaured($postId: ID!) {\n    getIsPostFeatured(postId: $postId)\n  }\n": types.GetIsPostFeauredDocument,
    "\n  query countUsers {\n    countUsers\n  }\n": types.CountUsersDocument,
    "\n  query getUsers($limit: Int, $page: Int, $search: String) {\n    getUsers(limit: $limit, page: $page, search: $search) {\n      data {\n        id\n        name\n        email\n        image\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query getUser($getUserId: ID!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createCategory($input: CategoryInput!) {\n    createCategory(input: $input) {\n      id\n      image\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createCategory($input: CategoryInput!) {\n    createCategory(input: $input) {\n      id\n      image\n      name\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateCategory($id: ID!, $input: CategoryInput!) {\n    updateCategory(id: $id, input: $input)\n  }\n"): (typeof documents)["\n  mutation updateCategory($id: ID!, $input: CategoryInput!) {\n    updateCategory(id: $id, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteCategory($id: ID!) {\n    deleteCategory(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation featureCategory($categoryId: ID!) {\n    featureCategory(id: $categoryId)\n  }\n"): (typeof documents)["\n  mutation featureCategory($categoryId: ID!) {\n    featureCategory(id: $categoryId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unfeatureCategory($categoryId: ID!) {\n    unfeatureCategory(id: $categoryId)\n  }\n"): (typeof documents)["\n  mutation unfeatureCategory($categoryId: ID!) {\n    unfeatureCategory(id: $categoryId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation likePost($postId: ID!) {\n    likePost(postId: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation commentOnPost($postId: ID!, $input: CommentInput!) {\n    createComment(postId: $postId, input: $input) {\n      id\n      body\n      user {\n        id\n        name\n        email\n        image\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation commentOnPost($postId: ID!, $input: CommentInput!) {\n    createComment(postId: $postId, input: $input) {\n      id\n      body\n      user {\n        id\n        name\n        email\n        image\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteComment($commentId: ID!) {\n    deleteComment(id: $commentId)\n  }\n"): (typeof documents)["\n  mutation deleteComment($commentId: ID!) {\n    deleteComment(id: $commentId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      coverImage\n      preview\n      body\n      slug\n      category {\n        id\n        image\n        name\n        createdAt\n        updatedAt\n      }\n      isPublished\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($input: PostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      coverImage\n      preview\n      body\n      slug\n      category {\n        id\n        image\n        name\n        createdAt\n        updatedAt\n      }\n      isPublished\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updatePost($postId: ID!, $input: PostInput!) {\n    updatePost(id: $postId, input: $input)\n  }\n"): (typeof documents)["\n  mutation updatePost($postId: ID!, $input: PostInput!) {\n    updatePost(id: $postId, input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation deletePost($postId: ID!) {\n    deletePost(id: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation publishPost($postId: ID!) {\n    publishPost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation publishPost($postId: ID!) {\n    publishPost(id: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unpublishPost($postId: ID!) {\n    unpublishPost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation unpublishPost($postId: ID!) {\n    unpublishPost(id: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation featurePost($postId: ID!, $themeId: ID!, $index: Int) {\n    featurePost(postId: $postId, themeId: $themeId, index: $index)\n  }\n"): (typeof documents)["\n  mutation featurePost($postId: ID!, $themeId: ID!, $index: Int) {\n    featurePost(postId: $postId, themeId: $themeId, index: $index)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation unfeaturePost($postId: ID!) {\n    unfeaturePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation unfeaturePost($postId: ID!) {\n    unfeaturePost(postId: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getThemes {\n    getThemes {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getThemes {\n    getThemes {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getLatestTheme {\n    getLatestTheme {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getLatestTheme {\n    getLatestTheme {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation adminLogin($input: AdminLoginInput!) {\n    adminLogin(input: $input) {\n      token\n      user {\n        id\n        image\n        firstName\n        lastName\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation adminLogin($input: AdminLoginInput!) {\n    adminLogin(input: $input) {\n      token\n      user {\n        id\n        image\n        firstName\n        lastName\n        email\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getFeaturedCategories {\n    getFeaturedCategories {\n      id\n      name\n      image\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getFeaturedCategories {\n    getFeaturedCategories {\n      id\n      name\n      image\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategories($search: String, $page: Int, $limit: Int) {\n    getCategories(search: $search, page: $page, limit: $limit) {\n      data {\n        id\n        name\n        image\n        isFeatured\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategories($search: String, $page: Int, $limit: Int) {\n    getCategories(search: $search, page: $page, limit: $limit) {\n      data {\n        id\n        name\n        image\n        isFeatured\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategory($categoryId: ID!) {\n    getCategory(id: $categoryId) {\n      id\n      name\n      image\n      isFeatured\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getCategory($categoryId: ID!) {\n    getCategory(id: $categoryId) {\n      id\n      name\n      image\n      isFeatured\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query countCategories {\n    countCategories\n  }\n"): (typeof documents)["\n  query countCategories {\n    countCategories\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getCategoryStats(\n    $limit: Int\n    $page: Int\n    $search: String\n  ) {\n    getCategoriesStats(\n      limit: $limit\n      page: $page\n      search: $search\n    ) {\n      data {\n        category {\n          id\n          name\n          image\n          isFeatured\n          createdAt\n          updatedAt\n        }\n        posts\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCategoryStats(\n    $limit: Int\n    $page: Int\n    $search: String\n  ) {\n    getCategoriesStats(\n      limit: $limit\n      page: $page\n      search: $search\n    ) {\n      data {\n        category {\n          id\n          name\n          image\n          isFeatured\n          createdAt\n          updatedAt\n        }\n        posts\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserLikeForPost($postId: ID!) {\n    getUserLikeForPost(postId: $postId) {\n      id\n      post\n      user\n    }\n  }\n"): (typeof documents)["\n  query getUserLikeForPost($postId: ID!) {\n    getUserLikeForPost(postId: $postId) {\n      id\n      post\n      user\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getComments($postId: ID!, $page: Int, $limit: Int) {\n    getComments(postId: $postId, limit: $limit, page: $page) {\n      data {\n        id\n        body\n        user {\n          id\n          name\n          email\n          image\n        }\n        post\n        createdAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query getComments($postId: ID!, $page: Int, $limit: Int) {\n    getComments(postId: $postId, limit: $limit, page: $page) {\n      data {\n        id\n        body\n        user {\n          id\n          name\n          email\n          image\n        }\n        post\n        createdAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query featuredPosts {\n    getFeaturedPosts {\n      theme {\n        name\n      }\n      index\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        category {\n          id\n          name\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query featuredPosts {\n    getFeaturedPosts {\n      theme {\n        name\n      }\n      index\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        category {\n          id\n          name\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getAllPosts(\n    $category: ID\n    $limit: Int\n    $order: String\n    $page: Int\n    $search: String\n    $sortBy: String\n    $isPublished: Boolean\n  ) {\n    getAllPosts(\n      category: $category\n      limit: $limit\n      order: $order\n      page: $page\n      search: $search\n      sortBy: $sortBy\n      isPublished: $isPublished\n    ) {\n      data {\n        id\n        title\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllPosts(\n    $category: ID\n    $limit: Int\n    $order: String\n    $page: Int\n    $search: String\n    $sortBy: String\n    $isPublished: Boolean\n  ) {\n    getAllPosts(\n      category: $category\n      limit: $limit\n      order: $order\n      page: $page\n      search: $search\n      sortBy: $sortBy\n      isPublished: $isPublished\n    ) {\n      data {\n        id\n        title\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query adminGetPost($postId: ID!) {\n    adminGetPost(id: $postId) {\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        audio\n        body\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      comments\n      likes\n    }\n  }\n"): (typeof documents)["\n  query adminGetPost($postId: ID!) {\n    adminGetPost(id: $postId) {\n      post {\n        id\n        title\n        coverImage\n        preview\n        slug\n        audio\n        body\n        category {\n          id\n          name\n        }\n        isPublished\n        publishedAt\n        createdAt\n        updatedAt\n      }\n      comments\n      likes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPreviousAndNextosts($postId: ID!) {\n    getPreviousAndNextPosts(postId: $postId) {\n      next {\n        title\n        slug\n        id\n      }\n      prev {\n        title\n        slug\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPreviousAndNextosts($postId: ID!) {\n    getPreviousAndNextPosts(postId: $postId) {\n      next {\n        title\n        slug\n        id\n      }\n      prev {\n        title\n        slug\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query countPosts {\n    countPosts {\n      total\n      drafts\n      published\n    }\n  }\n"): (typeof documents)["\n  query countPosts {\n    countPosts {\n      total\n      drafts\n      published\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getIsPostFeaured($postId: ID!) {\n    getIsPostFeatured(postId: $postId)\n  }\n"): (typeof documents)["\n  query getIsPostFeaured($postId: ID!) {\n    getIsPostFeatured(postId: $postId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query countUsers {\n    countUsers\n  }\n"): (typeof documents)["\n  query countUsers {\n    countUsers\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUsers($limit: Int, $page: Int, $search: String) {\n    getUsers(limit: $limit, page: $page, search: $search) {\n      data {\n        id\n        name\n        email\n        image\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUsers($limit: Int, $page: Int, $search: String) {\n    getUsers(limit: $limit, page: $page, search: $search) {\n      data {\n        id\n        name\n        email\n        image\n        createdAt\n        updatedAt\n      }\n      meta {\n        currentPage\n        pages\n        total\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUser($getUserId: ID!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query getUser($getUserId: ID!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;