
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface FleetCardProps {
  name: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  imageHint: string;
}

export default function FleetCard({ name, description, imageUrl, icon: Icon, imageHint }: FleetCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-56 w-full">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint={imageHint}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-3">
           <Icon className="h-8 w-8 text-primary" />
           <CardTitle className="text-xl font-headline">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
