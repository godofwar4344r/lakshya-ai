"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function AuthRedirectHandler() {
  useEffect(() => {
    if (!window.location.hash.includes("access_token")) return;

    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.replace("/workspace");
      }
    });
  }, []);

  return null;
}
