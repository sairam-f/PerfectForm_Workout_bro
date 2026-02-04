import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Calendar, TrendingUp, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { ProgressRing } from "@/components/progress/ProgressRing";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";

// Mock client data
const clientData = {
  id: "1",
  name: "Sarah Johnson",
  status: "attention" as const,
  streak: 5,
  memberSince: "Jan 2024",
  goal: "Weight Loss",
  level: "Intermediate",
  avgFormScore: 82,
  weeklyWorkouts: 4,
  recentWorkouts: [
    { 
      id: "w1", 
      name: "Full Body Strength", 
      date: "Today", 
      formScore: 78, 
      issues: ["Squat depth", "Back rounding"] 
    },
    { 
      id: "w2", 
      name: "Upper Body Push", 
      date: "Yesterday", 
      formScore: 85, 
      issues: [] 
    },
    { 
      id: "w3", 
      name: "Lower Body Power", 
      date: "2 days ago", 
      formScore: 88, 
      issues: ["Knee valgus on lunges"] 
    },
  ],
  aiHighlights: [
    { type: "warning", message: "Squat form has declined 8% this week" },
    { type: "info", message: "Push-up form improved significantly" },
    { type: "warning", message: "Consider reducing weight on deadlifts" },
  ],
};

export function ClientDetailScreen() {
  const navigate = useNavigate();
  const { clientId } = useParams();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Client Details</h1>
        </div>
      </div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-16 h-16 ring-2 ring-border">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${clientData.name}`} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{clientData.name}</h2>
                <span className="text-sm">🔥 {clientData.streak}</span>
              </div>
              <StatusBadge status={clientData.status} size="sm" />
              <p className="text-sm text-muted-foreground mt-2">
                {clientData.goal} • {clientData.level} • Since {clientData.memberSince}
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 h-10 rounded-xl"
              onClick={() => navigate(`/coach/feedback/${clientId}`)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Feedback
            </Button>
            <Button variant="outline" className="flex-1 h-10 rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Adjust Plan
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Form score overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-5">
            <ProgressRing progress={clientData.avgFormScore} size={80} strokeWidth={6}>
              <span className="text-lg font-bold text-foreground">{clientData.avgFormScore}%</span>
            </ProgressRing>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Avg Form Score</h3>
              <p className="text-sm text-muted-foreground">
                {clientData.weeklyWorkouts} workouts this week
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-form-warning" />
                <span className="text-xs text-form-warning font-medium">-3% vs last week</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <h3 className="font-semibold text-foreground mb-3">AI Insights</h3>
        <div className="space-y-2">
          {clientData.aiHighlights.map((highlight, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-xl text-sm flex items-start gap-2",
                highlight.type === "warning"
                  ? "bg-status-attention-bg text-status-attention"
                  : "bg-accent text-accent-foreground"
              )}
            >
              {highlight.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              {highlight.message}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent workouts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5"
      >
        <h3 className="font-semibold text-foreground mb-3">Recent Workouts</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {clientData.recentWorkouts.map((workout, index) => (
            <button
              key={workout.id}
              onClick={() => navigate(`/coach/workout/${workout.id}`)}
              className={cn(
                "w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors",
                index !== clientData.recentWorkouts.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-foreground">{workout.name}</span>
                  {workout.issues.length > 0 && (
                    <AlertTriangle className="w-4 h-4 text-form-warning" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{workout.date}</span>
                {workout.issues.length > 0 && (
                  <p className="text-xs text-form-warning mt-1">
                    {workout.issues.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2.5 py-1 rounded-lg text-sm font-semibold",
                  workout.formScore >= 85
                    ? "bg-form-good/10 text-form-good"
                    : workout.formScore >= 75
                      ? "bg-primary/10 text-primary"
                      : "bg-form-warning/10 text-form-warning"
                )}>
                  {workout.formScore}%
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
