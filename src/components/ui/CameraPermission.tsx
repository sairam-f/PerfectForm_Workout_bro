import { motion } from "framer-motion";
import { Camera, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PermissionState = "prompt" | "granted" | "denied" | "loading";

interface CameraPermissionProps {
  state: PermissionState;
  onRequestPermission: () => void;
  onOpenSettings?: () => void;
  className?: string;
}

export function CameraPermission({
  state,
  onRequestPermission,
  onOpenSettings,
  className,
}: CameraPermissionProps) {
  if (state === "granted") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
    >
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center mb-6",
        state === "denied" 
          ? "bg-destructive/10" 
          : "bg-primary/10"
      )}>
        {state === "denied" ? (
          <AlertTriangle className="w-10 h-10 text-destructive" />
        ) : (
          <Camera className="w-10 h-10 text-primary" />
        )}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        {state === "denied" 
          ? "Camera Access Denied" 
          : "Camera Access Required"}
      </h3>

      <p className="text-muted-foreground text-sm mb-6 max-w-xs">
        {state === "denied"
          ? "Please enable camera access in your device settings to use form analysis during workouts."
          : "We need camera access to analyze your form in real-time and provide instant feedback."}
      </p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <ShieldCheck className="w-4 h-4 text-form-good" />
        <span>Your video is processed locally and never stored</span>
      </div>

      {state === "denied" ? (
        <Button 
          variant="outline" 
          onClick={onOpenSettings}
          className="w-full max-w-xs"
        >
          Open Settings
        </Button>
      ) : (
        <Button
          onClick={onRequestPermission}
          disabled={state === "loading"}
          className="w-full max-w-xs bg-primary hover:bg-primary/90"
        >
          {state === "loading" ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Requesting...
            </span>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Enable Camera
            </>
          )}
        </Button>
      )}
    </motion.div>
  );
}
