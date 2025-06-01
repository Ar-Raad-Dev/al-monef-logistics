
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import type { Translations, Locale } from "@/lib/dictionaries";

type ContactFormDictionary = Translations['contactPage']['form'];

interface ContactFormProps {
  dictionary: ContactFormDictionary;
  lang: Locale;
}

export default function ContactForm({ dictionary: d, lang }: ContactFormProps) {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: d.fullNameMinLengthError }),
    email: z.string().email({ message: d.emailInvalidError }),
    subject: z.string().min(5, { message: d.subjectMinLengthError }),
    message: z.string().min(10, { message: d.messageMinLengthError }).max(500, { message: d.messageMaxLengthError }),
  });
  
  type ContactFormValues = z.infer<typeof formSchema>;


  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: d.submitSuccessTitle,
          description: d.submitSuccessDescription,
          variant: "default", 
        });
        form.reset();
      } else {
        toast({
          title: d.submitErrorTitle || "Submission Error",
          description: result.message || d.submitErrorDescription || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast({
        title: d.submitErrorTitle || "Network Error",
        description: d.submitNetworkErrorDescription || "Could not connect to the server. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{d.fullNameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={d.fullNamePlaceholder} {...field} className="bg-input focus:bg-background transition-colors"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{d.emailLabel}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={d.emailPlaceholder} {...field} className="bg-input focus:bg-background transition-colors"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{d.subjectLabel}</FormLabel>
              <FormControl>
                <Input placeholder={d.subjectPlaceholder} {...field} className="bg-input focus:bg-background transition-colors"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{d.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={d.messagePlaceholder}
                  className="resize-y min-h-[120px] bg-input focus:bg-background transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? d.submittingButtonText : d.submitButtonText}
          {!form.formState.isSubmitting && <Send className={`${lang === 'ar' ? 'mr-2' : 'ml-2'} h-5 w-5`} />}
        </Button>
      </form>
    </Form>
  );
}
