import { fetchData, getOptions } from "@/server/handler";
import { queryAnimes, queryAnime } from "@/server/queries";

const url: string = 'https://graphql.anilist.co';

export const getAnimes = async (variables: any) => {
  const data = await fetchData(url, getOptions(queryAnimes, variables));
  return data;
};

export const getAnime = async (id: number) => {
  const data = await fetchData(url, getOptions(queryAnime, { id }));
  return data;
};

