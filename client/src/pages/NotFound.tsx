import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-brand-orange" />
        </div>
        <h1 className="font-serif text-6xl font-bold text-white mb-2">404</h1>
        <h2 className="font-serif text-xl font-semibold text-foreground/80 mb-4">
          Page Not Found
        </h2>
        <p className="text-foreground/50 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => setLocation("/")}
          className="bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold glow-orange"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
