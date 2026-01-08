import { useEffect, useState } from "react";
import logo from "@/assets/pranveda-logo.png";

const LoadingAnimation = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show loading for 2 seconds, then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadingComplete, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-glow">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
        </div>
        <img
          src={logo}
          alt="PRANVEDA Logo"
          className="w-32 h-32 object-contain animate-scale-in relative z-10"
        />
        <div className="mt-6 text-center animate-fade-up animation-delay-300">
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
