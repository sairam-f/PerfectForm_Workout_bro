import { motion } from "framer-motion";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

// Mock workout review data
const workoutData = {
  id: "w1",
  clientName: "Sarah Johnson",
  workoutName: "Full Body Strength",
  date: "Today, 10:30 AM",
  duration: "32:15",
  overallScore: 78,
  exercises: [
    { 
      name: "Squats", 
      reps: 12, 
      formScore: 72, 
      issues: [
        { timestamp: "2:15", description: "Knees caving inward", severity: "warning" },
        { timestamp: "3:45", description: "Not hitting parallel depth", severity: "warning" },
      ],
      positives: ["Good tempo control", "Stable core"],
    },
    { 
      name: "Push-ups", 
      reps: 15, 
      formScore: 85, 
      issues: [
        { timestamp: "5:20", description: "Elbows flaring out", severity: "info" },
      ],
      positives: ["Full range of motion", "Consistent pace"],
    },
    { 
      name: "Lunges", 
      reps: 10, 
      formScore: 75, 
      issues: [
        { timestamp: "8:10", description: "Front knee passing toes", severity: "warning" },
      ],
      positives: ["Good balance", "Controlled descent"],
    },
  ],
};

export function WorkoutReviewScreen() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const exercise = workoutData.exercises[selectedExercise];

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Workout Review</h1>
            <p className="text-sm text-muted-foreground">{workoutData.clientName}</p>
          </div>
        </div>
      </div>

      {/* Video preview placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-5 mb-4"
      >
        <div className="aspect-video bg-card rounded-2xl border border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2 mx-auto">
                <Play className="w-8 h-8 text-primary fill-current" />
              </div>
              <p className="text-sm text-muted-foreground">Video playback</p>
            </div>
          </div>
          
          {/* Playback controls */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <SkipForward className="w-4 h-4" />
              </Button>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-primary rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">2:15 / 32:15</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Exercise tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-4"
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {workoutData.exercises.map((ex, index) => (
            <Button
              key={index}
              variant={selectedExercise === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedExercise(index)}
              className={cn(
                "rounded-full flex-shrink-0",
                selectedExercise === index && "bg-primary hover:bg-primary/90"
              )}
            >
              {ex.name}
              <span className={cn(
                "ml-1.5 px-1.5 py-0.5 rounded-full text-xs",
                ex.formScore >= 80 
                  ? "bg-form-good/20 text-form-good"
                  : "bg-form-warning/20 text-form-warning"
              )}>
                {ex.formScore}%
              </span>
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Exercise details */}
      <motion.div
        key={selectedExercise}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-5"
      >
        {/* Issues */}
        {exercise.issues.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-form-warning" />
              Issues Detected
            </h3>
            <div className="space-y-2">
              {exercise.issues.map((issue, index) => (
                <div
                  key={index}
                  className="bg-status-attention-bg rounded-xl p-3 flex items-start gap-3"
                >
                  <button className="px-2 py-1 rounded bg-status-attention text-white text-xs font-mono flex-shrink-0">
                    {issue.timestamp}
                  </button>
                  <p className="text-sm text-status-attention">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Positives */}
        <div className="mb-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-form-good" />
            What Went Well
          </h3>
          <div className="space-y-2">
            {exercise.positives.map((positive, index) => (
              <div
                key={index}
                className="bg-status-completed-bg rounded-xl p-3 text-sm text-status-completed"
              >
                {positive}
              </div>
            ))}
          </div>
        </div>

        {/* Send feedback button */}
        <Button 
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 mt-4"
          onClick={() => navigate(`/coach/feedback/${workoutData.id}`)}
        >
          Generate Feedback
        </Button>
      </motion.div>
    </div>
  );
}
