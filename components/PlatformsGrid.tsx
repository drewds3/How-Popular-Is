import PlatformCard from "./PlatformCard"
import type {PlatformCardProps} from "./PlatformCard"

type PlatformsGridProps = {
  platforms: PlatformCardProps[];
};

export default function PlatformsGrid(
  {platforms}: PlatformsGridProps) {
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