
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/dictionaries';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  learnMoreText: string;
  lang: Locale;
}

const ServiceCard = React.memo(function ServiceCard({ icon: Icon, title, description, link, learnMoreText, lang }: ServiceCardProps) {
  const LearnMoreIcon = lang === 'ar' ? ArrowLeft : ArrowRight;
  const iconMarginClass = lang === 'ar' ? "mr-2" : "ml-2";

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
            {learnMoreText} <LearnMoreIcon className={`${iconMarginClass} h-4 w-4 group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
          </Button>
        </Link>
      </div>
    </Card>
  );
});

export default ServiceCard;
