
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // Changed to ArrowLeft for RTL

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
}

export default function ServiceCard({ icon: Icon, title, description, link }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-10 w-10 text-primary" />
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base text-muted-foreground leading-relaxed">{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <Link href={link}>
          <Button variant="outline" className="w-full group hover:bg-accent hover:text-accent-foreground transition-colors">
            اعرف المزيد <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> {/* Changed to ArrowLeft and margin */}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
