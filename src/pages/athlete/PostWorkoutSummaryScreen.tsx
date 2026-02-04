import { motion } from "framer-motion";
import { Trophy, Clock, Flame, TrendingUp, CheckCircle, AlertTriangle, Share2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/progress/ProgressRing";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Mock summary data
const summaryData = {
  duration: "32:15",
  calories: 285,
  formScore: 88,
  exercises: 5,
  improvements: [
    "Your squat depth improved by 15%",
    "Maintained consistent tempo throughout",
    "Great core engagement on planks",
  ],
  corrections: [
    "Keep elbows closer during push-ups",
    "Avoid leaning forward on lunges",
  ],
  exerciseBreakdown: [
    { name: "Squats", reps: 12, formScore: 92 },
    { name: "Push-ups", reps: 15, formScore: 78 },
    { name: "Lunges", reps: 10, formScore: 85 },
    { name: "Plank", reps: 30, formScore: 95 },
    { name: "Deadlifts", reps: 10, formScore: 90 },
  ],
};

export function PostWorkoutSummaryScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Celebration header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
        <div className="relative px-5 pt-12 pb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-black text-foreground mb-2"
          >
            Workout Complete!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground"
          >
            Great job pushing through today
          </motion.p>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 mb-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
            <span className="text-xl font-bold text-foreground block">{summaryData.duration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 text-status-attention" />
            <span className="text-xl font-bold text-foreground block">{summaryData.calories}</span>
            <span className="text-xs text-muted-foreground">Calories</span>
          </div>
          <div className="bg-card rounded-xl border border-border p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-form-good" />
            <span className="text-xl font-bold text-foreground block">{summaryData.exercises}</span>
            <span className="text-xs text-muted-foreground">Exercises</span>
          </div>
        </div>
      </motion.div>

      {/* Form Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-5">
            <ProgressRing progress={summaryData.formScore} size={80} strokeWidth={6}>
              <span className="text-xl font-bold text-foreground">{summaryData.formScore}%</span>
            </ProgressRing>
            <div>
              <h3 className="font-bold text-foreground mb-1">Overall Form Score</h3>
              <p className="text-sm text-muted-foreground">
                {summaryData.formScore >= 85 
                  ? "Excellent work! Your form was great today." 
                  : "Good effort! Focus on the areas below to improve."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* What went well */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-5 mb-6"
      >
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-form-good" />
          What Went Well
        </h2>
        <div className="space-y-2">
          {summaryData.improvements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-status-completed-bg rounded-xl p-3 text-sm text-status-completed"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Areas to improve */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-5 mb-6"
      >
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-form-warning" />
          Areas to Improve
        </h2>
        <div className="space-y-2">
          {summaryData.corrections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="bg-status-attention-bg rounded-xl p-3 text-sm text-status-attention"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Exercise breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="px-5 mb-8"
      >
        <h2 className="text-lg font-bold text-foreground mb-3">Exercise Breakdown</h2>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {summaryData.exerciseBreakdown.map((exercise, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center justify-between p-4",
                index !== summaryData.exerciseBreakdown.length - 1 && "border-b border-border"
              )}
            >
              <div>
                <span className="font-medium text-foreground">{exercise.name}</span>
                <span className="text-sm text-muted-foreground block">{exercise.reps} reps</span>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-lg text-sm font-semibold",
                exercise.formScore >= 90 
                  ? "bg-form-good/10 text-form-good"
                  : exercise.formScore >= 80
                    ? "bg-primary/10 text-primary"
                    : "bg-form-warning/10 text-form-warning"
              )}>
                {exercise.formScore}%
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="px-5 safe-bottom"
      >
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={() => {}}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            onClick={() => navigate("/home")}
          >
            <Home className="w-4 h-4 mr-2" />
            Done
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
