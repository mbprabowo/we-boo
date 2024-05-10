import { fetchData, getOptions } from "@/server/handler";
import { queryAnimes, queryAnime } from "@/server/queries.tsx";

const url: string = 'https://graphql.anilist.co';

export const getAnimes = async (variables) => {
  const data = await fetchData(url, getOptions(queryAnimes, variables));
  return data;
};

export const getAnime = async (id) => {
  const data = await fetchData(url, getOptions(queryAnime, { id }));
  return data;
};

