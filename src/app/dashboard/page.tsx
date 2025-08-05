
import { AddForm } from '@/components/dashboard/AddForm';
import { FormsTable } from '@/components/dashboard/FormsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
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
            <FormsTable />
        </CardContent>
      </Card>
    </div>
  );
}
