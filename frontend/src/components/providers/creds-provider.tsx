"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { getCreds } from "@/api/extension";
import { setUser } from "@/redux/userSlice";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchCreds = async () => {
        try{
        const { NCid, address } = await getCreds() as { NCid: string, address: string };
        if (NCid && address && pathname !== '/dashboard') {
            router.push('/dashboard');
        }
        }
       catch (err) {
        console.error(err);
      }
    };

    fetchCreds();
  }, []);

  return <>{children}</>;
}
