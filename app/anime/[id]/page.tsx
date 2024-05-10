import Image from "next/image";
import Anime from "@/components/Anime";
import { getAnime } from "@/server/actions";

export default async function AnimePage({ params }: { params: any }) {
  const anime = await getAnime(params.id);

  return (
    <main>
      <Anime anime={anime}/>
    </main>
  );
}
