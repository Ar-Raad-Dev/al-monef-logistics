
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Paperclip } from "lucide-react";
import type { Translations, Locale } from "@/lib/dictionaries";
import { useRef } from "react";

type CareerFormDictionary = Translations['careersPage']['form'];

interface CareerApplicationFormProps {
  availablePositions: string[];
  dictionary: CareerFormDictionary;
  lang: Locale;
}

export default function CareerApplicationForm({ availablePositions, dictionary: d, lang }: CareerApplicationFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define schema INSIDE the component to ensure browser APIs like FileList are available
  const formSchema = z.object({
    name: z.string().min(2, { message: d.fullNameMinLengthError }),
    phone: z.string().min(7, { message: d.phoneMinLengthError }),
    email: z.string().email({ message: d.emailInvalidError }),
    position: z.string().min(1, { message: d.positionRequiredError}),
    cv: z.instanceof(FileList).optional()
      .refine(files => !files || files.length === 0 || (files?.[0]?.size !== undefined && files[0].size <= 5 * 1024 * 1024), d.cvFileSizeError || `Max file size is 5MB.`)
      .refine(files => !files || files.length === 0 || (files?.[0]?.type !== undefined && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0].type)), d.cvFileTypeError || "Only PDF, DOC, DOCX files are allowed."),
    message: z.string().min(10, { message: d.coverLetterMinLengthError }).max(500, { message: d.coverLetterMaxLengthError }).optional().or(z.literal('')),
  });
  
  type CareerFormValues = z.infer<typeof formSchema>;

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      position: "",
      cv: undefined,
      message: "",
    },
  });

  async function onSubmit(values: CareerFormValues) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('position', values.position);
    if (values.message) {
      formData.append('message', values.message);
    }
    if (values.cv && values.cv.length > 0) {
      formData.append('cv', values.cv[0]);
    }

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData, 
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: d.submitSuccessTitle,
          description: d.submitSuccessDescription,
          variant: "default", 
        });
        form.reset();
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
      } else {
        toast({
          title: d.submitErrorTitle || "Submission Error",
          description: result.message || d.submitErrorDescription || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to submit career application:", error);
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
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{d.phoneLabel}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={d.phonePlaceholder} {...field} className="bg-input focus:bg-background transition-colors"/>
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
        </div>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{d.positionLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-input focus:bg-background transition-colors">
                    <SelectValue placeholder={d.positionSelectPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availablePositions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                  <SelectItem value="General Application">{d.generalApplicationOption}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cv"
          render={({ field: { onChange, value, ...restField } }) => (
            <FormItem>
              <FormLabel>{d.cvLabel} <span className="text-xs text-muted-foreground">{d.cvFileTypes}</span></FormLabel>
              <FormControl>
                <div className="relative">
                    <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={(e) => onChange(e.target.files)} 
                        className={`bg-input focus:bg-background transition-colors ${lang === 'ar' ? 'pl-10' : 'pr-10'}`}
                        ref={fileInputRef}
                        {...restField}
                    />
                    <Paperclip className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                </div>
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
              <FormLabel>{d.coverLetterLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={d.coverLetterPlaceholder}
                  className="resize-y min-h-[100px] bg-input focus:bg-background transition-colors"
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
