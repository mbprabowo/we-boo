"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimesPlaceholder from "@/components/AnimesPlaceholder";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAnimes } from "@/server/actions";
import homeIcon from "@/assets/icons/home.svg";

export default function Animes(response) {
  const searchParams = useSearchParams();
  const listOfAnimes = response.animes?.Page?.media;
  const [ animes, setAnimes ] = useState(listOfAnimes);
  const { ref, inView } = useInView();
  const [ page, setPage ] = useState(1);
  const [ keyword, setKeyword ] = useState();
  const [ hasNextPage, setHasNextPage ] = useState(response.animes?.Page?.pageInfo?.hasNextPage);

  const fetchAnime = async () => {
    const title = searchParams.get('title') ? { "search": searchParams.get('title') } : {};
    const genre = searchParams.get('genre') ? { "genres": [ searchParams.get('genre') ] } : {};
    const data = await getAnimes({
      "page": page + 1,
      ...title,
      ...genre
    });
    setAnimes(animes.concat(data.Page.media));
    setPage(page + 1);
    setHasNextPage(data.Page.pageInfo.hasNextPage);
  }

  useEffect(() => {
    if (inView && hasNextPage) fetchAnime();
  }, [inView])
 
  if (animes) {
    return (
      <div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            animes.map(anime => (
              <Link href={`/anime/${anime.id}`} key={anime.id}>
                <Card className="p-4">
                  <CardTitle className="line-clamp-1">
                    {anime.title.userPreferred}
                  </CardTitle>
                  <div className="flex gap-x-2 pt-4">
                    <CardContent className="basis-1/2 p-0">
                      <div className="relative w-full h-48">
                        <Image
                          className="object-cover object-center"
                          src={anime.coverImage.large}
                          alt="Cover Image"
                          fill
                          sizes="100%"
                        />
                      </div>
                    </CardContent>
                    <div className="basis-1/2">
                      <div className="flex justify-between">
                        <Badge>{ anime.format }</Badge>
                        <Badge
                          variant="outline"
                          className={"text-sm font-semibold " + (anime.averageScore > 70 ? 'text-green-400' : 'text-red-400')}
                        >
                          { anime.averageScore }%
                        </Badge>
                      </div>
                      <div className="pt-4 text-xs text-slate-400 line-clamp-6">{ anime.description }</div>
                      <div className="flex pt-8 items-center">
                        <Image src={homeIcon} alt="home-icon" />
                        <div className="pl-1 text-sm font-medium line-clamp-1">
                          { anime.studios?.edges[0]?.node?.name }
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          }
        </div>
        {
          hasNextPage && (
            <div ref={ref}>
              <AnimesPlaceholder />
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="container flex justify-center items-center">Error fetching data</div>
  )
};
