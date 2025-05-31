
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  position: z.string().min(1, { message: "Please select a position."}),
  cv: z.any().optional(), // For file uploads, validation is more complex and typically handled server-side
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters." }),
});

export type CareerFormValues = z.infer<typeof formSchema>;

interface CareerApplicationFormProps {
  availablePositions: string[];
}

export default function CareerApplicationForm({ availablePositions }: CareerApplicationFormProps) {
  const { toast } = useToast();
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Career application submitted:", values);
    toast({
      title: "Application Sent!",
      description: "Thank you for your interest. We will review your application and get back to you if there's a match.",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Full Name" {...field} className="bg-input focus:bg-background transition-colors"/>
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Your Phone Number" {...field} className="bg-input focus:bg-background transition-colors"/>
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} className="bg-input focus:bg-background transition-colors"/>
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
              <FormLabel>Position Applying For</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-input focus:bg-background transition-colors">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availablePositions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                  <SelectItem value="General Application">General Application</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload CV (PDF, DOC, DOCX)</FormLabel>
              <FormControl>
                <div className="relative">
                    <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                        className="bg-input focus:bg-background transition-colors pr-10"
                    />
                    <Paperclip className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
              <FormLabel>Cover Letter / Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly tell us why you're a good fit..."
                  className="resize-y min-h-[100px] bg-input focus:bg-background transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
          {!form.formState.isSubmitting && <Send className="ml-2 h-5 w-5" />}
        </Button>
      </form>
    </Form>
  );
}
