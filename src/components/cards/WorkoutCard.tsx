import { motion } from "framer-motion";
import { Clock, Flame, ChevronRight, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkoutCardProps {
  title: string;
  duration: string;
  calories?: number;
  exerciseCount: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  imageUrl?: string;
  isToday?: boolean;
  onClick?: () => void;
  className?: string;
}

const difficultyColors = {
  beginner: "text-form-good bg-form-good/10",
  intermediate: "text-form-warning bg-form-warning/10",
  advanced: "text-form-poor bg-form-poor/10",
};

export function WorkoutCard({
  title,
  duration,
  calories,
  exerciseCount,
  difficulty = "intermediate",
  imageUrl,
  isToday = false,
  onClick,
  className,
}: WorkoutCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer",
        "transition-shadow hover:shadow-lg",
        isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
    >
      {/* Background gradient or image */}
      {imageUrl ? (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
      )}

      <div className="relative p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {isToday && (
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-2">
                Today
              </span>
            )}
            <h3 className="font-bold text-lg text-foreground leading-tight">
              {title}
            </h3>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          {calories && (
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>{calories} cal</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Dumbbell className="w-4 h-4" />
            <span>{exerciseCount} exercises</span>
          </div>
        </div>

        <div className="mt-3">
          <span className={cn(
            "inline-block px-2.5 py-1 text-xs font-medium rounded-lg capitalize",
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
