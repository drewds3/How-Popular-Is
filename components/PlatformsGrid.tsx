import PlatformCard from "./PlatformCard"

import {
  Bird,
  Play,
  MessageSquare,
  Newspaper,
  TreePalm,
} from "lucide-react"

const platforms = [
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
]

export default function PlatformsGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.name}
          {...platform}
        />
      ))}
    </div>
  )
}