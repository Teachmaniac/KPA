'use client';
import { useState, useEffect, createContext, useContext } from 'react';

// Auth Hook
export function useAuth() {
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
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

export const FormRefreshContext = createContext<FormRefreshContextType | undefined>(undefined);

export function useFormRefresh() {
  const context = useContext(FormRefreshContext);
  if (context === undefined) {
    throw new Error('useFormRefresh must be used within a FormRefreshProvider');
  }
  return context;
}
