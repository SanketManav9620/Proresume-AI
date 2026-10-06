import React, { useEffect, useState } from "react";

export const ScrollP = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
 