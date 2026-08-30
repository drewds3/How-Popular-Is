import type { PlatformCardProps } from "@/components/PlatformCard";

import {
  Bird,
  Play,
  Newspaper,
  TreePalm,
  LucideIcon,
  Globe,
  Frown
} from "lucide-react"
import { getYoutubeViews } from "./youtube";

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
        color: "#525252",
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
        color: "#DF9907",
        icon: Newspaper,
    };
}

function createYoutubePlatform(
  youtubeViews: number
){
    const score = Math.min(
    100,
    Math.round(
        Math.pow(
        Math.log10(youtubeViews + 1) 
        / Math.log10(100000000),
        2.3
        ) * 100
    )
    );
    
    return {
      name: "Youtube",
      score: score,
      rawValue: youtubeViews ,
      color: "#DB3310",
      icon: Play,
    };
}

function createGooglePlatform(
  score: number
){    
    return {
      name: "Google",
      score: Math.floor(score),
      rawValue: score ,
      color: "#1C68E3",
      letter: "G",
    };
}

export function generatePlatforms(
    wikipediaViews: number,
    articles: number,
    youtubeViews: number,
    scoreGoogleTrends: number
){
    const platforms : PlatformCardProps[] = [];

    if(wikipediaViews > -1) platforms.push(
      createWikipediaPlatform(wikipediaViews))

    if(articles > -1) platforms.push(
      createNewsPlatform(articles)
    )

    if(youtubeViews > -1) platforms.push(
      createYoutubePlatform(youtubeViews)
    )

    if(scoreGoogleTrends > -1) platforms.push(
      createGooglePlatform(scoreGoogleTrends)
    )

    if (platforms.length > 0) return platforms
    else 
    {
      platforms.push({
        name: "No se ha podido conectar a ninguna plataforma",
          score: -1,
          rawValue: -1,
          color: "#F59E0B",
          icon: Frown,
      });
      return platforms;
    } 
}