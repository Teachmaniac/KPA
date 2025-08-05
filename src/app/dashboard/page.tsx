import { AddForm } from '@/components/dashboard/AddForm';
import { FormsTable } from '@/components/dashboard/FormsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// No longer need getForms or headers here

export default async function DashboardPage() {
  // The initial fetch is now handled inside FormsTable to ensure it can re-fetch.
  // We can pass an empty array initially.
  const initialForms = [];

  return (
    <div className="container mx-auto grid gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Add New Form</CardTitle>
          <CardDescription>
            Fill out the form below to submit new data to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddForm />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Submitted Forms</CardTitle>
            <CardDescription>
            Here are the forms you have submitted.
            </CardDescription>
        </CardHeader>
        <CardContent>
            {/* FormsTable is now a client component and will fetch its own data */}
            <FormsTable initialForms={initialForms} />
        </CardContent>
      </Card>
    </div>
  );
}
