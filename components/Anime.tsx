import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import homeIconLg from "@/assets/icons/home-lg.svg";
import BookmarkButton from "@/components/BookmarkButton";

export default function Anime({ anime }: { anime: any }) {
  const backgroundColor: string = anime.Media.coverImage.color ? anime.Media.coverImage.color : "#f1a143";

  return (
    <div className="container">
      {
        anime.Media.bannerImage && (
          <div className="relative w-full h-64 rounded-lg" style={{ backgroundColor: `${backgroundColor}`}}>
            <Image
              src={anime.Media.bannerImage}
              className="rounded-lg object-cover object-center"
              alt="Cover Image"
              fill
              sizes="100%"
            />
          </div>
        )
      }
      <div className="w-full md:w-3/4 mx-auto pt-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl sm:text-4xl font-bold">
            { anime.Media.title.userPreferred }
          </div>
          <BookmarkButton animeId={anime.Media.id} />
        </div>
        <div className="pt-4">
          <div className="flex gap-x-4">
            <div className="hidden sm:block md:basis-1/4 basis-2/4 relative w-full h-80 rounded-lg" style={{ backgroundColor: `${backgroundColor}`}}>
              <Image
                src={anime.Media.coverImage.large}
                className="rounded-lg object-cover object-center"
                alt="Banner Image"
                fill
                sizes="100%"
              />
            </div>
            <div className="basis-full sm:basis-2/4 md:basis-3/4">
              <div className="flex gap-x-2">
                <Badge
                  variant="outline"
                  className={"text-sm font-semibold " + (anime.Media.averageScore > 70 ? 'text-green-400' : 'text-red-400')}
                >
                  { anime.Media.averageScore }%
                </Badge>
               {
                  anime.Media.genres.map((genre: string) => (
                    <Badge key={genre}>
                      { genre }
                    </Badge>
                  ))
                }
              </div>
              <div className="pt-4 text-slate-400 line-clamp-6 md:line-clamp-none">
                { anime.Media.description }
              </div>
              <div className="flex pt-8 items-center">
                <Image src={homeIconLg} alt="home-icon" />
                <div className="pl-1 text-sm sm:text-lg font-medium">
                  { anime.Media.studios?.edges[0]?.node?.name }
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}
