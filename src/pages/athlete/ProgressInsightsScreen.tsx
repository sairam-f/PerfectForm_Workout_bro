import { motion } from "framer-motion";
import { TrendingUp, Calendar, Flame, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/cards/InsightCard";
import { ProgressRing } from "@/components/progress/ProgressRing";
import { BottomNav } from "@/components/navigation/BottomNav";
import { cn } from "@/lib/utils";

// Mock progress data
const weeklyData = [
  { day: "Mon", value: 85, completed: true },
  { day: "Tue", value: 92, completed: true },
  { day: "Wed", value: 78, completed: true },
  { day: "Thu", value: 88, completed: true },
  { day: "Fri", value: 0, completed: false },
  { day: "Sat", value: 0, completed: false },
  { day: "Sun", value: 0, completed: false },
];

const achievements = [
  { icon: "🔥", title: "7 Day Streak", description: "Completed 7 days in a row" },
  { icon: "💪", title: "Form Master", description: "95%+ form score 3 workouts" },
  { icon: "🏃", title: "Early Bird", description: "5 workouts before 8am" },
];

const monthlyStats = {
  workouts: 18,
  totalTime: "12h 45m",
  calories: 4250,
  avgFormScore: 87,
};

export function ProgressInsightsScreen() {
  const avgFormScore = weeklyData.filter(d => d.completed).reduce((sum, d) => sum + d.value, 0) / weeklyData.filter(d => d.completed).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-foreground">Progress</h1>
            <span className="text-sm text-muted-foreground">Track your journey</span>
          </motion.div>
          <Button variant="outline" size="sm" className="gap-1">
            This Week
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekly Form Score Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Weekly Form Scores</h3>
            <span className="text-sm text-primary font-medium">Avg: {Math.round(avgFormScore)}%</span>
          </div>
          
          {/* Bar chart */}
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: day.completed ? `${day.value}%` : "8px" }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                  className={cn(
                    "w-full rounded-t-lg",
                    day.completed
                      ? day.value >= 85
                        ? "bg-form-good"
                        : day.value >= 70
                          ? "bg-primary"
                          : "bg-form-warning"
                      : "bg-muted"
                  )}
                  style={{ minHeight: day.completed ? `${day.value}%` : "8px" }}
                />
                <span className="text-xs text-muted-foreground mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Monthly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <h3 className="font-semibold text-foreground mb-3">This Month</h3>
        <div className="grid grid-cols-2 gap-3">
          <InsightCard
            title="Total Workouts"
            value={monthlyStats.workouts.toString()}
            change={15}
            icon={Calendar}
          />
          <InsightCard
            title="Active Time"
            value={monthlyStats.totalTime}
            change={8}
            icon={TrendingUp}
          />
          <InsightCard
            title="Calories Burned"
            value={monthlyStats.calories.toLocaleString()}
            change={12}
            icon={Flame}
            variant="warning"
          />
          <InsightCard
            title="Avg Form Score"
            value={`${monthlyStats.avgFormScore}%`}
            change={5}
            icon={Award}
            variant="success"
          />
        </div>
      </motion.div>

      {/* Form Score Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-4">
            <ProgressRing progress={monthlyStats.avgFormScore} size={80} strokeWidth={6}>
              <span className="text-lg font-bold text-foreground">{monthlyStats.avgFormScore}%</span>
            </ProgressRing>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Form Score Trend</h3>
              <p className="text-sm text-muted-foreground">
                Your form has improved by <span className="text-form-good font-medium">5%</span> this month
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-form-good" />
                <span className="text-xs text-form-good font-medium">On track for goals</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5"
      >
        <h3 className="font-semibold text-foreground mb-3">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 bg-card rounded-xl border border-border p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                {achievement.icon}
              </div>
              <div>
                <span className="font-semibold text-foreground block">{achievement.title}</span>
                <span className="text-sm text-muted-foreground">{achievement.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav role="athlete" />
    </div>
  );
}
