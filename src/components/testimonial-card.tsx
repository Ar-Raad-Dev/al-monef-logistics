
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Removed CardHeader as it wasn't used
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  company: string;
  testimonial: string;
  avatarUrl?: string;
  rating?: number;
}

export default function TestimonialCard({ name, company, testimonial, avatarUrl, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg bg-card">
      <CardContent className="pt-6 pb-4 flex-grow">
        <p className="text-muted-foreground italic leading-relaxed">&quot;{testimonial}&quot;</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-4 border-t">
        <div className="flex items-center gap-3 mb-2">
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={name} // Alt text is sufficient with the name
              width={40} 
              height={40} 
              className="rounded-full" 
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-primary">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-sm text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{company}</p>
          </div>
        </div>
        {rating && (
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground'}`}
              />
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
