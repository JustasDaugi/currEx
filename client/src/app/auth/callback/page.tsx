"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const t = params.get("token");
    if (t) {
      setToken(t);
      fetchUser().finally(() => {
        window.history.replaceState({}, "", "/");
        router.replace("/");
      });
    } else {
      router.replace("/login");
    }
  }, [router, setToken, fetchUser]);

  return <div className="p-6 text-center">Signing you in…</div>;
}
