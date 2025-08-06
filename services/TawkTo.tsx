// components/integrations/TawkTo.tsx
"use client";
import { useEffect } from "react";

export default function TawkTo() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.async = true;
      const tawkToId = process.env.NEXT_PUBLIC_TAWK_TO_ID;
      if (tawkToId) {
        script.src = `https://embed.tawk.to/${tawkToId}/1ip5bv6ch`;
      } else {
        return; // Don't load if no ID is provided
      }
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.body.appendChild(script);

      return () => {
        if (script.parentNode) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return null;
}
