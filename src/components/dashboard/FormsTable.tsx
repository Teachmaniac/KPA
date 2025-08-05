'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks';

type Form = {
  id: string;
  customerName: string;
  projectName: string;
  details?: string;
  amount: number;
  submittedAt: string;
};

export function FormsTable({ initialForms }: { initialForms: Form[] }) {
  const [forms, setForms] = useState<Form[]>(initialForms);
  const { userPhone } = useAuth();

  useEffect(() => {
    async function fetchForms() {
      if (userPhone) {
        // Fetch forms for the current user
        const response = await fetch(`/api/forms?phone=${userPhone}`);
        if (response.ok) {
          const data = await response.json();
          setForms(data);
        }
      }
    }
    fetchForms();
  }, [userPhone]); // Re-fetch when userPhone is available or changes

  useEffect(() => {
    // This effect is to listen for the custom event and refetch forms
    const handleFormSubmitted = () => {
      async function refetchForms() {
        if (userPhone) {
          const response = await fetch(`/api/forms?phone=${userPhone}`);
          if (response.ok) {
            const data = await response.json();
            setForms(data);
          }
        }
      }
      refetchForms();
    };

    window.addEventListener('form-submitted', handleFormSubmitted);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('form-submitted', handleFormSubmitted);
    };
  }, [userPhone]);


  if (!forms || forms.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Forms Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">You have not submitted any forms yet. Add one using the form above.</p>
      </div>
    );
  }

  // Sort forms by submittedAt date in descending order (most recent first)
  const sortedForms = [...forms].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  return (
    <div className="rounded-md border">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Submitted At</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {sortedForms.map((form) => (
            <TableRow key={form.id}>
                <TableCell className="font-medium">{form.customerName}</TableCell>
                <TableCell>{form.projectName}</TableCell>
                <TableCell>
                    <Badge variant="secondary">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(form.amount)}
                    </Badge>
                </TableCell>
                <TableCell className="text-right">{new Date(form.submittedAt).toLocaleDateString()}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}
