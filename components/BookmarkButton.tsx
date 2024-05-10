"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import bookmarkIcon from "@/assets/icons/bookmark.svg";
import bookmarkIconSolidWhite from "@/assets/icons/bookmark-solid-white.svg";

export default function BookmarkButton({ animeId }: { animeId: number }) {
  const [ currentBookmark ] = useState(
    typeof window !== "undefined" && localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites") || "{}")
      : []
  )
  const [ isBookmark, setIsBookmark ] = useState(currentBookmark.includes(animeId));

  const handleBookmark = () => {
    const mergedBookmark = isBookmark
      ? currentBookmark.filter((dt: number) => dt !== animeId)
      : [ ...currentBookmark, animeId ];

    setIsBookmark(!isBookmark);
    localStorage.setItem("favorites", JSON.stringify(mergedBookmark));
  }

  return (
    <div>
      <Button
        variant={isBookmark ? "default" : "secondary"}
        onClick={() => handleBookmark()}
      >
        <span>{ isBookmark ? "Remove from List" : "Add to List" }</span>
        <Image
          src={isBookmark ? bookmarkIconSolidWhite : bookmarkIcon}
          alt="bookmark-icon"
          className="ml-2"
        />
      </Button>
    </div>
  )
}
