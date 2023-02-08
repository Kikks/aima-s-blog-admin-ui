import { gql } from '../__generated__';

export const GET_THEMES = gql(`
  query getThemes {
    getThemes {
      id
      name
    }
  }
`);

export const GET_LATEST_THEME = gql(`
  query getLatestTheme {
    getLatestTheme {
      id
      name
    }
  }
`);
