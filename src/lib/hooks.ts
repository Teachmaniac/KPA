
'use client';
import { useState, useEffect, createContext, useContext } from 'react';

// Auth Hook
export function useAuth() {
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const phone = localStorage.getItem('kpa-user-phone');
    if (phone) {
      setUserPhone(phone);
    }
  }, []);

  return { userPhone };
}

// Form Refresh Context
interface FormRefreshContextType {
  refreshCount: number;
  refresh: () => void;
}

const FormRefreshContext = createContext<FormRefreshContextType | undefined>(undefined);

export function FormRefreshProvider({ children }: { children: React.ReactNode }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const refresh = () => setRefreshCount(count => count + 1);

  return (
    <FormRefreshContext.Provider value={{ refreshCount, refresh }}>
      {children}
    </FormRefreshContext.Provider>
  );
}

export function useFormRefresh() {
  const context = useContext(FormRefreshContext);
  if (context === undefined) {
    throw new Error('useFormRefresh must be used within a FormRefreshProvider');
  }
  return context;
}
