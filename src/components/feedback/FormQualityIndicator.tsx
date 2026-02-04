import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle } from "lucide-react";

export type FormQuality = "excellent" | "good" | "warning" | "poor";

interface FormQualityIndicatorProps {
  quality: FormQuality;
  message?: string;
  className?: string;
  compact?: boolean;
}

const qualityConfig: Record<FormQuality, {
  icon: React.ElementType;
  label: string;
  bgClass: string;
  textClass: string;
  glowClass: string;
}> = {
  excellent: {
    icon: CheckCircle2,
    label: "Excellent Form",
    bgClass: "bg-form-excellent",
    textClass: "text-form-excellent-foreground",
    glowClass: "form-glow-excellent",
  },
  good: {
    icon: CheckCircle2,
    label: "Good Form",
    bgClass: "bg-form-good",
    textClass: "text-form-good-foreground",
    glowClass: "form-glow-good",
  },
  warning: {
    icon: AlertTriangle,
    label: "Adjust Form",
    bgClass: "bg-form-warning",
    textClass: "text-form-warning-foreground",
    glowClass: "form-glow-warning",
  },
  poor: {
    icon: XCircle,
    label: "Fix Form",
    bgClass: "bg-form-poor",
    textClass: "text-form-poor-foreground",
    glowClass: "form-glow-poor",
  },
};

export function FormQualityIndicator({ 
  quality, 
  message, 
  className,
  compact = false
}: FormQualityIndicatorProps) {
  const config = qualityConfig[quality];
  const Icon = config.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={quality}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn(
          "rounded-2xl transition-all duration-300",
          config.bgClass,
          config.glowClass,
          compact ? "px-3 py-2" : "px-4 py-3",
          className
        )}
      >
        <div className={cn(
          "flex items-center gap-2",
          config.textClass
        )}>
          <Icon className={cn(compact ? "w-4 h-4" : "w-5 h-5")} />
          <div className="flex flex-col">
            <span className={cn(
              "font-semibold",
              compact ? "text-xs" : "text-sm"
            )}>
              {config.label}
            </span>
            {message && !compact && (
              <span className="text-xs opacity-90">{message}</span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
