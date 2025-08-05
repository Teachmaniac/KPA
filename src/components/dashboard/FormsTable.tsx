
'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth, useFormRefresh } from '@/lib/hooks';

type Form = {
  id: string;
  customerName: string;
  projectName: string;
  details?: string;
  amount: number;
  submittedAt: string;
};

export function FormsTable() {
  const { userPhone } = useAuth();
  const { refreshCount } = useFormRefresh();
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userPhone) {
      setIsLoading(true);
      // Fetch forms via the API route
      fetch(`/api/forms?phone=${userPhone}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
             // Sort forms by submittedAt date in descending order (most recent first)
            const sortedData = [...data].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            setForms(sortedData);
          } else {
            // Handle cases where the API returns an error or unexpected format
            setForms([]);
          }
        })
        .catch(() => setForms([])) // Handle fetch errors
        .finally(() => setIsLoading(false));
    }
  }, [userPhone, refreshCount]); // Re-run when userPhone or refreshCount changes

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <Loader2 className="mx-auto h-12 w-12 text-muted-foreground animate-spin" />
            <h3 className="mt-4 text-lg font-semibold">Loading Forms...</h3>
            <p className="mt-2 text-sm text-muted-foreground">Please wait while we fetch your submitted forms.</p>
      </div>
    );
  }

  if (forms.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Forms Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">You have not submitted any forms yet. Add one using the form above.</p>
      </div>
    );
  }
  
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
            {forms.map((form) => (
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
