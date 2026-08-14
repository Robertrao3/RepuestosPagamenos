import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | Repuestos Pagamenos C.A.`
      : "Repuestos Pagamenos C.A. — Repuestos de calidad en Venezuela";
    return () => {
      document.title = "Repuestos Pagamenos C.A.";
    };
  }, [title]);
}
