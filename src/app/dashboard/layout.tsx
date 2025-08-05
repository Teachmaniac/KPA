
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/dashboard/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { FormRefreshProvider } from '@/lib/hooks';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const phone = localStorage.getItem('kpa-user-phone');
    if (!phone) {
      router.replace('/');
    } else {
      setIsAuth(true);
    }
  }, [router, pathname]);

  if (!isAuth) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Skeleton className="h-8 w-48" />
                <div className="ml-auto">
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
            <main className="flex-1 p-4 md:p-8 space-y-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
    );
  }

  return (
    <FormRefreshProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </FormRefreshProvider>
  );
}
