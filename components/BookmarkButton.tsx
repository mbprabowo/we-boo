"use client";

import Image from "next/Image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import bookmarkIcon from "@/assets/icons/bookmark.svg";
import bookmarkIconSolidWhite from "@/assets/icons/bookmark-solid-white.svg";

export default function BookmarkButton({ animeId }) {
  const [ currentBookmark ] = useState(
    localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  )
  const [ isBookmark, setIsBookmark ] = useState(currentBookmark.includes(animeId));

  const handleBookmark = () => {
    const mergedBookmark = isBookmark
      ? currentBookmark.filter(dt => dt !== animeId)
      : [ ...currentBookmark, animeId ];

    setIsBookmark(!isBookmark);
    localStorage.setItem("favorites", JSON.stringify(mergedBookmark));
  }

  return (
    <div>
      <Button
        variant={isBookmark ? "" : "secondary"}
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
