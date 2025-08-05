'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userPhone) {
      const fetchForms = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/forms?phone=${userPhone}`);
          if (!response.ok) {
            throw new Error('Failed to fetch forms data.');
          }
          const data = await response.json();
          setForms(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
          setIsLoading(false);
        }
      };

      fetchForms();
    }
  }, [userPhone]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
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
