import { AddForm } from '@/components/dashboard/AddForm';
import { FormsTable } from '@/components/dashboard/FormsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getForms } from '@/lib/actions';
import { headers } from 'next/headers';

// This is a mock authentication check. In a real app, you'd use a more robust solution.
async function getAuthenticatedUserPhone() {
  const userPhone = headers().get('x-user-phone');
  return userPhone;
}


export default async function DashboardPage() {
  const userPhone = await getAuthenticatedUserPhone();
  let forms = [];
  if (userPhone) {
    const result = await getForms(userPhone);
    forms = result.forms;
  }

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
            Here are the forms you have submitted via the API.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <FormsTable initialForms={forms} />
        </CardContent>
      </Card>
    </div>
  );
}
