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
    console.log(wikipediaViews);
    return {
        name: "Wikipedia",
        score: score,
        rawValue: wikipediaViews,
        color: "#E9EDE8",
        icon: Globe,
    };
}

export function generatePlatforms(
    wikipediaViews: number
){
    const platforms : PlatformCardProps[] = [];

    platforms.push(
        createWikipediaPlatform(wikipediaViews))

    return platforms
}