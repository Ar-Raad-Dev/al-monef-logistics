
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
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل." }),
  phone: z.string().min(7, { message: "الرجاء إدخال رقم هاتف صالح." }),
  email: z.string().email({ message: "الرجاء إدخال عنوان بريد إلكتروني صالح." }),
  position: z.string().min(1, { message: "الرجاء تحديد وظيفة."}),
  cv: z.any().optional(),
  message: z.string().min(10, { message: "يجب أن تتكون الرسالة من 10 أحرف على الأقل." }).max(500, { message: "لا يمكن أن تتجاوز الرسالة 500 حرف." }),
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("تم إرسال طلب التوظيف:", values);
    toast({
      title: "تم إرسال الطلب!",
      description: "شكرًا لاهتمامك. سنراجع طلبك وسنتصل بك إذا كان هناك تطابق.",
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
              <FormLabel>الاسم الكامل</FormLabel>
              <FormControl>
                <Input placeholder="اسمك الكامل" {...field} className="bg-input focus:bg-background transition-colors"/>
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
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="رقم هاتفك" {...field} className="bg-input focus:bg-background transition-colors"/>
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
                <FormLabel>البريد الإلكتروني</FormLabel>
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
              <FormLabel>الوظيفة المتقدم لها</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-input focus:bg-background transition-colors">
                    <SelectValue placeholder="اختر وظيفة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availablePositions.map(pos => (
                    <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                  ))}
                  <SelectItem value="General Application">طلب عام</SelectItem>
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
              <FormLabel>تحميل السيرة الذاتية (PDF, DOC, DOCX)</FormLabel>
              <FormControl>
                <div className="relative">
                    <Input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} 
                        className="bg-input focus:bg-background transition-colors pr-10"
                    />
                    <Paperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" /> {/* Adjusted icon position for RTL */}
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
              <FormLabel>رسالة تعريفية / رسالة (اختياري)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="أخبرنا بإيجاز لماذا أنت مناسب..."
                  className="resize-y min-h-[100px] bg-input focus:bg-background transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full transition-transform hover:scale-105" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "جارٍ الإرسال..." : "إرسال الطلب"}
          {!form.formState.isSubmitting && <Send className="mr-2 h-5 w-5" />} {/* Changed ml-2 to mr-2 */}
        </Button>
      </form>
    </Form>
  );
}
