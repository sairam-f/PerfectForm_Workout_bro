import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TempoGuideProps {
  phase: "down" | "hold" | "up" | "rest";
  tempo?: string; // e.g., "3-1-2" for down-hold-up
  className?: string;
}

const phaseConfig = {
  down: { label: "Down", color: "bg-primary" },
  hold: { label: "Hold", color: "bg-form-warning" },
  up: { label: "Up", color: "bg-form-good" },
  rest: { label: "Rest", color: "bg-muted" },
};

export function TempoGuide({ phase, tempo, className }: TempoGuideProps) {
  const config = phaseConfig[phase];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {tempo && (
        <span className="text-xs text-muted-foreground font-medium">
          Tempo: {tempo}
        </span>
      )}
      <div className="flex items-center gap-3">
        {(["down", "hold", "up"] as const).map((p) => (
          <div
            key={p}
            className={cn(
              "flex flex-col items-center gap-1 transition-opacity duration-200",
              phase === p ? "opacity-100" : "opacity-40"
            )}
          >
            <motion.div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                phaseConfig[p].color
              )}
              animate={phase === p ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, repeat: Infinity }
              } : { scale: 1 }}
            >
              <span className="text-xs font-bold text-white uppercase">
                {p.charAt(0)}
              </span>
            </motion.div>
            <span className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground">
              {phaseConfig[p].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
