'use server';

import { z } from 'zod';
import { loginSchema, addFormSchema } from './schemas';

// This is a mock in-memory store. In a real app this would be a database.
const formsStore: (z.infer<typeof addFormSchema> & { id: string; submittedBy: string; submittedAt: Date; })[] = [];

// Add some initial data for demonstration for the specific user.
const initialMockData = [
    { id: '1', submittedBy: '7760873976', customerName: 'Alice Corp', projectName: 'Website Redesign', details: 'Phase 1 of redesign, focusing on UI/UX.', amount: 5000, submittedAt: new Date('2024-07-20T10:00:00Z') },
    { id: '2', submittedBy: '7760873976', customerName: 'Bob Industries', projectName: 'Mobile App Dev', details: 'iOS and Android native applications.', amount: 15000, submittedAt: new Date('2024-07-21T14:30:00Z') },
];

formsStore.push(...initialMockData);


export async function login(data: z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }
    
    const { phone, password } = validatedFields.data;

    // Credentials from the assignment description
    if (phone === '7760873976' && password === 'to_share@123') {
        return { success: 'Login successful!', phone };
    } else {
        return { error: 'Invalid phone number or password.' };
    }
}

export async function addForm(data: z.infer<typeof addFormSchema>, phone: string) {
    const validatedFields = addFormSchema.safeParse(data);
    
    if (!validatedFields.success) {
        const errors = validatedFields.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
        return { error: `Validation failed: ${errors}` };
    }
    
    // Simulate data integrity check failure as per user request
    if (validatedFields.data.projectName.toLowerCase().includes('fail')) {
        return { error: "Data integrity check failed for project name. Please choose a different name." };
    }

    const newForm = {
        id: new Date().getTime().toString(),
        submittedBy: phone,
        ...validatedFields.data,
        submittedAt: new Date(),
    };

    formsStore.push(newForm);
    return { success: "Form submitted successfully!" };
}

export async function getForms(phone: string) {
    // Filter forms for the specific user phone number
    const userForms = formsStore.filter(form => form.submittedBy === phone);
    return { forms: userForms };
}
