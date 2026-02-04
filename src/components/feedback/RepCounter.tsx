import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RepCounterProps {
  current: number;
  total?: number;
  className?: string;
}

export function RepCounter({ current, total, className }: RepCounterProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
        Reps
      </span>
      <div className="flex items-baseline gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            className="text-5xl font-black text-foreground tabular-nums"
          >
            {current}
          </motion.span>
        </AnimatePresence>
        {total && (
          <span className="text-2xl font-semibold text-muted-foreground">
            /{total}
          </span>
        )}
      </div>
    </div>
  );
}
