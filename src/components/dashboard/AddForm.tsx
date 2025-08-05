'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { addFormSchema, type AddFormSchema } from '@/lib/schemas';
import { addForm } from '@/lib/actions';
import { useAuth } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function AddForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { userPhone } = useAuth();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddFormSchema>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      customerName: '',
      projectName: '',
      details: '',
      amount: 0,
    },
  });

  const onSubmit = (values: AddFormSchema) => {
    if (!userPhone) {
      toast({
        title: 'Error',
        description: 'You must be logged in to submit a form.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await addForm(values, userPhone);
      if (result.success) {
        toast({
          title: 'Success',
          description: result.success,
        });
        form.reset();
        
        // Refresh the server components on the page to refetch data
        router.refresh();

      } else if (result.error) {
        toast({
          title: 'Submission Failed',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Q3 Marketing Campaign" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide a brief description of the project..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1000" onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Form
            </Button>
        </div>
      </form>
    </Form>
  );
}
