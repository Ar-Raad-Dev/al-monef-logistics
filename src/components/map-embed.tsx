
import Image from 'next/image';
import type { Locale } from '@/lib/dictionaries';

interface MapEmbedProps {
  altText: string;
  lang: Locale; // lang might be used for different map tiles or query params in a real map
}

export default function MapEmbed({ altText, lang }: MapEmbedProps) {
  // In a real scenario, lang could be used to adjust the map language or default view
  const mapPlaceholderText = lang === 'ar' ? "موقع+البدائع،+القصيم" : "Al+Badai,+Al+Qassim+Location";
  const placeholderUrl = `https://placehold.co/800x450/D4E7F0/29ABE2?text=${mapPlaceholderText}`;

  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-border">
      <Image 
        src={placeholderUrl} 
        alt={altText}
        fill
        style={{objectFit:"cover"}}
        data-ai-hint="map qassim"
      />
    </div>
  );
}
