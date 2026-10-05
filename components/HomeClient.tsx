"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CubeGridLanding from "./CubeGridLanding";

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLanding, setShowLanding] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("seen-landing");
      setShowLanding(!seen);
    } catch {
      setShowLanding(true);
    }
  }, []);

  const handleEnter = () => {
    try {
      sessionStorage.setItem("seen-landing", "true");
    } catch {}
    setShowLanding(false);
  };

  if (showLanding === null) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <AnimatePresence>
        {showLanding && <CubeGridLanding onEnter={handleEnter} />}
      </AnimatePresence>
    </>
  );
}
