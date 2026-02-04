import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export type ClientStatus = "completed" | "skipped" | "attention";

interface StatusBadgeProps {
  status: ClientStatus;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const statusConfig: Record<ClientStatus, {
  icon: React.ElementType;
  label: string;
  bgClass: string;
  textClass: string;
  iconClass: string;
}> = {
  completed: {
    icon: CheckCircle,
    label: "Completed",
    bgClass: "bg-status-completed-bg",
    textClass: "text-status-completed",
    iconClass: "text-status-completed",
  },
  skipped: {
    icon: XCircle,
    label: "Skipped",
    bgClass: "bg-status-skipped-bg",
    textClass: "text-status-skipped",
    iconClass: "text-status-skipped",
  },
  attention: {
    icon: AlertCircle,
    label: "Needs Attention",
    bgClass: "bg-status-attention-bg",
    textClass: "text-status-attention",
    iconClass: "text-status-attention",
  },
};

export function StatusBadge({ 
  status, 
  showLabel = true, 
  size = "md",
  className 
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bgClass,
        config.textClass,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      <Icon className={cn(
        config.iconClass,
        size === "sm" ? "w-3 h-3" : "w-4 h-4"
      )} />
      {showLabel && <span>{config.label}</span>}
    </div>
  );
}
