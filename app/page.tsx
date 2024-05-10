import Animes from "@/components/Animes";
import Filter from "@/components/Filter";
import { getAnimes } from "@/server/actions";

export default async function Home({ searchParams }: { searchParams: any }) {
  const title = searchParams.title ? { "search": searchParams.title } : {};
  const genre = searchParams.genre ? { "genres": [ searchParams.genre ] } : {};
  const animes = await getAnimes({ ...title, ...genre });

  return (
    <main>
      <Filter genres={animes.genres} />
      <Animes animes={animes}/>
    </main>
  );
}
