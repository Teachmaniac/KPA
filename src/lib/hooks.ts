'use client';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const phone = localStorage.getItem('kpa-user-phone');
    setUserPhone(phone);
  }, []);

  return { userPhone };
}
