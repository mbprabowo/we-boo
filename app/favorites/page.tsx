"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Animes from "@/components/Animes";
import AnimesEmpty from "@/components/AnimesEmpty";
import AnimesPlaceholder from "@/components/AnimesPlaceholder";
import Filter from "@/components/Filter";
import FilterPlaceholder from "@/components/FilterPlaceholder";
import { getAnimes } from "@/server/actions";

export default function FavoritePage() {
  const [ animes, setAnimes ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ ids ] = useState(
    typeof window !== "undefined" && window.localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  )
  const searchParams = useSearchParams(); 
  const title = searchParams.get("title") ? { "search": searchParams.get("title") } : {};
  const genre = searchParams.get("genre") ? { "genres": [ searchParams.get("genre") ] } : {};

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAnimes({ "id": ids, ...title, ...genre });
      setAnimes(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main>
      {
        animes && (
          <div>
            <Filter genres={animes.genres} />
            <Animes animes={animes}/>
          </div>
        )
      }
      {
        !animes && (
          <div>
            <FilterPlaceholder />
            <AnimesPlaceholder />
          </div>
        )
      }
      {
        !isLoading && animes.Page.media.length === 0 && (
          <AnimesEmpty />
        )
      }
    </main>
  );
}
