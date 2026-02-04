import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

const variantStyles = {
  default: "bg-card border-border",
  success: "bg-status-completed-bg border-status-completed/20",
  warning: "bg-status-attention-bg border-status-attention/20",
  info: "bg-accent border-primary/20",
};

export function InsightCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  className,
}: InsightCardProps) {
  const TrendIcon = change === undefined || change === 0 
    ? Minus 
    : change > 0 
      ? TrendingUp 
      : TrendingDown;

  const trendColor = change === undefined || change === 0
    ? "text-muted-foreground"
    : change > 0
      ? "text-form-good"
      : "text-form-poor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-4 transition-all",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <TrendIcon className="w-4 h-4" />
            <span className="font-medium">
              {change > 0 ? "+" : ""}{change}%
            </span>
            {changeLabel && (
              <span className="text-muted-foreground text-xs ml-1">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
