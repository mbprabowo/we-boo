"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Filter({ genres }: { genres: any }) {
  const searchParams = useSearchParams();
  const [ title, setTitle ] = useState(searchParams.get("title") ? searchParams.get("title") : "");
  const [ genre ] = useState(searchParams.get("genre") ? searchParams.get("genre") : "");
  const [ page ] = useState(usePathname().replace("/", ""));

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  }

  const handleChangeGenre = (value: string) => {
    window.location.href = `/${page}?title=${title}&genre=${value}`;
  }
  
  const handleEnter = (event: any) => {
    if (event.key === 'Enter'){
      window.location.href = `/${page}?title=${title}&genre=${genre}`;
    }
  }

  return (
    <div className="container py-4 flex justify-between gap-x-4">
      <Input
        className="w-[400px]"
        value={title || ""}
        placeholder="Search Anime..."
        onChange={(e) => handleChange(e)}
        onKeyDown={(event) => handleEnter(event)}
      />
      <Select value={genre || ""} onValueChange={(value) => handleChangeGenre(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genres" />
        </SelectTrigger>
        <SelectContent>
          {
            genres.map((genre: any) => (
              <SelectItem value={genre} key={genre}>{ genre }</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
};
