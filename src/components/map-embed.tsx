
import Image from 'next/image';

export default function MapEmbed() {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border">
      {/* This is a placeholder. For a real map, you'd integrate Google Maps API or similar. */}
      <Image 
        src="https://placehold.co/800x450/D4E7F0/29ABE2?text=Office+Location+Map" 
        alt="Map showing office location"
        layout="fill"
        objectFit="cover"
        data-ai-hint="map location"
      />
    </div>
  );
}
