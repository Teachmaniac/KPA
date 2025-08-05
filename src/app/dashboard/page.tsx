import { AddForm } from '@/components/dashboard/AddForm';
import { FormsTable } from '@/components/dashboard/FormsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getForms } from '@/lib/actions';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const headerList = headers();
  // The phone number is passed from the layout after client-side auth check
  const phone = headerList.get('x-user-phone');

  // Fetch forms on the server. This will re-run when the page is refreshed.
  const { forms } = phone ? await getForms(phone) : { forms: [] };

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
            <FormsTable forms={forms} />
        </CardContent>
      </Card>
    </div>
  );
}
