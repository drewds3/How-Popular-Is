import type { PlatformCardProps } from "@/components/PlatformCard";

import {
  Bird,
  Play,
  Newspaper,
  TreePalm,
  LucideIcon,
  Globe
} from "lucide-react"

/* const platforms = [
  {
    name: "Twitter/X",
    score: 94,
    color: "#3BA4F6",
    icon: Bird,
  },
  {
    name: "Youtube",
    score: 88,
    color: "#FF4B5C",
    icon: Play,
  },
  {
    name: "Facebook",
    score: 71,
    color: "#4D74D9",
    letter: "f"
  },
  {
    name: "Noticias",
    score: 96,
    color: "#F59E0B",
    icon: Newspaper,
  },
  {
    name: "Google",
    score: 82,
    color: "#6284FF",
    letter: "G",
  },
  {
    name: "Miami me lo confirmó",
    score: 100,
    color: "#6284FF",
    icon: TreePalm,
  },
] */

function createWikipediaPlatform(
  wikipediaViews: number
){
    const score = Math.min(
    100,
    Math.round(
        Math.pow(
        Math.log10(wikipediaViews + 1) 
        / Math.log10(5000000),
        2.3
        ) * 100
    )
    );
    
    return {
        name: "Wikipedia",
        score: score,
        rawValue: wikipediaViews,
        color: "#E9EDE8",
        icon: Globe,
    };
}

function createNewsPlatform(
  articles: number
){
    const score = Math.min(
    100,
    Math.round(
        Math.pow(
        Math.log10(articles + 1) 
        / Math.log10(10000),
        2.3
        ) * 100
    )
    );

    return {
        name: "Noticias",
        score: score,
        rawValue: articles,
        color: "#F59E0B",
        icon: Newspaper,
    };
}

export function generatePlatforms(
    wikipediaViews: number,
    articles: number
){
    const platforms : PlatformCardProps[] = [];

    platforms.push(
        createWikipediaPlatform(wikipediaViews))

    platforms.push(
      createNewsPlatform(articles)
    )

    return platforms
}