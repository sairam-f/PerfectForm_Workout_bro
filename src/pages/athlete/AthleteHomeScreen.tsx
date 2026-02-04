import { motion } from "framer-motion";
import { Play, Calendar, Flame, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/cards/WorkoutCard";
import { InsightCard } from "@/components/cards/InsightCard";
import { ProgressRing } from "@/components/progress/ProgressRing";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";

// Mock data
const todayWorkout = {
  title: "Full Body Strength",
  duration: "45 min",
  calories: 320,
  exerciseCount: 8,
  difficulty: "intermediate" as const,
};

const weeklyWorkouts = [
  { title: "Upper Body Push", duration: "35 min", calories: 280, exerciseCount: 6, difficulty: "intermediate" as const },
  { title: "Lower Body Power", duration: "40 min", calories: 350, exerciseCount: 7, difficulty: "advanced" as const },
  { title: "Core & Mobility", duration: "25 min", calories: 150, exerciseCount: 5, difficulty: "beginner" as const },
];

export function AthleteHomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm text-muted-foreground">Good morning</span>
          <h1 className="text-2xl font-bold text-foreground">Ready to train?</h1>
        </motion.div>
      </div>

      {/* Weekly Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-5">
            <ProgressRing progress={65} size={100} strokeWidth={8}>
              <div className="text-center">
                <span className="text-2xl font-bold text-foreground">4</span>
                <span className="text-xs text-muted-foreground block">/6 days</span>
              </div>
            </ProgressRing>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Weekly Goal</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-status-attention" />
                  <span className="text-sm text-muted-foreground">1,240 cal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">3h 20m</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-medium text-form-good">🔥 12 day streak!</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Workout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Today's Workout</h2>
        </div>
        <WorkoutCard
          {...todayWorkout}
          isToday
          onClick={() => navigate("/workout")}
        />
        <Button 
          onClick={() => navigate("/workout")}
          className="w-full mt-3 h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90"
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Start Workout
        </Button>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">Quick Insights</h2>
          <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/progress")}>
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <InsightCard
            title="Form Score"
            value="92%"
            change={5}
            variant="success"
            icon={TrendingUp}
          />
          <InsightCard
            title="This Week"
            value="4 workouts"
            change={12}
            variant="info"
            icon={Flame}
          />
        </div>
      </motion.div>

      {/* Upcoming Workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground">This Week</h2>
        </div>
        <div className="space-y-3">
          {weeklyWorkouts.map((workout, index) => (
            <WorkoutCard
              key={index}
              {...workout}
              onClick={() => navigate("/workout")}
            />
          ))}
        </div>
      </motion.div>

      <BottomNav role="athlete" />
    </div>
  );
}
