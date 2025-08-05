import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Form = {
  id: string;
  customerName: string;
  projectName: string;
  details?: string;
  amount: number;
  submittedAt: string;
};

export function FormsTable({ forms }: { forms: Form[] }) {
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
