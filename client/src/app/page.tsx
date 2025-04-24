"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { Dashboard } from "../components/Dashboard";

export default function Page() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const isReady = useAuthStore((s) => s.isReady);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  if (!isReady) return null;
  if (!user) return null;

  return <Dashboard />;
}
