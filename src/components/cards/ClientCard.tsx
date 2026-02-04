import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge, ClientStatus } from "@/components/badges/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientCardProps {
  name: string;
  avatarUrl?: string;
  status: ClientStatus;
  lastWorkout?: string;
  streak?: number;
  onClick?: () => void;
  className?: string;
}

export function ClientCard({
  name,
  avatarUrl,
  status,
  lastWorkout,
  streak,
  onClick,
  className,
}: ClientCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl bg-card border border-border",
        "cursor-pointer transition-colors hover:bg-accent/50",
        className
      )}
    >
      <Avatar className="w-12 h-12 ring-2 ring-border">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-semibold text-foreground truncate">{name}</h4>
          {streak && streak > 0 && (
            <span className="text-xs text-form-warning font-medium">
              🔥 {streak}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} size="sm" showLabel={false} />
          {lastWorkout && (
            <span className="text-xs text-muted-foreground truncate">
              {lastWorkout}
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
    </motion.div>
  );
}
