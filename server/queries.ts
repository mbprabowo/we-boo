export const queryAnimes: string = `
  query ($page: Int = 1, $id: [Int], $search: String, $genres: [String], $sort: [MediaSort] = [POPULARITY_DESC, SCORE_DESC]) {
    Page(page: $page, perPage: 20) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(id_in: $id, sort: $sort, search: $search, genre_in: $genres, type: ANIME) {
        id
        title {
          userPreferred
        }
        coverImage {
          extraLarge
          large
          color
        }
        bannerImage
        season
        seasonYear
        description
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        averageScore
        popularity
        studios(isMain: true) {
          edges {
            node {
              name
            }
          }
        }
      }
    }
    genres: GenreCollection
  }
`;

export const queryAnime: string = `
  query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        userPreferred
      }
      coverImage {
        large
        color
      }
      bannerImage
      description
      averageScore
      format
      genres
      studios(isMain: true) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
