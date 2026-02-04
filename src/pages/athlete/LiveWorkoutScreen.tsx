import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Pause, Play, ChevronRight, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormQualityIndicator, FormQuality } from "@/components/feedback/FormQualityIndicator";
import { RepCounter } from "@/components/feedback/RepCounter";
import { TempoGuide } from "@/components/feedback/TempoGuide";
import { CameraPermission } from "@/components/ui/CameraPermission";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Mock exercise data
const exercises = [
  { name: "Squats", targetReps: 12, tempo: "3-1-2" },
  { name: "Push-ups", targetReps: 15, tempo: "2-1-2" },
  { name: "Lunges", targetReps: 10, tempo: "3-1-2" },
  { name: "Plank", targetReps: 30, tempo: "" }, // seconds
  { name: "Deadlifts", targetReps: 10, tempo: "3-1-2" },
];

export function LiveWorkoutScreen() {
  const navigate = useNavigate();
  const [cameraState, setCameraState] = useState<"prompt" | "granted" | "denied" | "loading">("prompt");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [reps, setReps] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [formQuality, setFormQuality] = useState<FormQuality>("good");
  const [tempoPhase, setTempoPhase] = useState<"down" | "hold" | "up" | "rest">("down");
  const [workoutTime, setWorkoutTime] = useState(0);

  const exercise = exercises[currentExercise];
  const isLastExercise = currentExercise === exercises.length - 1;

  // Simulate camera permission
  const handleRequestPermission = () => {
    setCameraState("loading");
    setTimeout(() => setCameraState("granted"), 1500);
  };

  // Timer
  useEffect(() => {
    if (cameraState !== "granted" || isPaused) return;
    const interval = setInterval(() => {
      setWorkoutTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cameraState, isPaused]);

  // Simulate AI feedback changes
  useEffect(() => {
    if (cameraState !== "granted" || isPaused) return;
    const interval = setInterval(() => {
      const qualities: FormQuality[] = ["excellent", "good", "good", "warning"];
      setFormQuality(qualities[Math.floor(Math.random() * qualities.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [cameraState, isPaused]);

  // Simulate tempo phase changes
  useEffect(() => {
    if (cameraState !== "granted" || isPaused || !exercise.tempo) return;
    const phases: ("down" | "hold" | "up")[] = ["down", "hold", "up"];
    let phaseIndex = 0;
    const interval = setInterval(() => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setTempoPhase(phases[phaseIndex]);
    }, 1500);
    return () => clearInterval(interval);
  }, [cameraState, isPaused, exercise.tempo]);

  // Simulate rep counting
  useEffect(() => {
    if (cameraState !== "granted" || isPaused) return;
    if (reps >= exercise.targetReps) return;
    const interval = setInterval(() => {
      setReps((r) => Math.min(r + 1, exercise.targetReps));
    }, 2500);
    return () => clearInterval(interval);
  }, [cameraState, isPaused, reps, exercise.targetReps]);

  const handleNextExercise = () => {
    if (isLastExercise) {
      navigate("/workout/summary");
    } else {
      setCurrentExercise((c) => c + 1);
      setReps(0);
      setFormQuality("good");
    }
  };

  const handleEndWorkout = () => {
    navigate("/workout/summary");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Show camera permission screen
  if (cameraState !== "granted") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <X className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">Setup</span>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <CameraPermission
            state={cameraState}
            onRequestPermission={handleRequestPermission}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark relative overflow-hidden">
      {/* Simulated camera feed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.1),_transparent_70%)]" />
      </div>

      {/* Overlay gradients */}
      <div className="workout-overlay absolute inset-0 pointer-events-none" />

      {/* Top controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center justify-between px-4 py-3 safe-top"
      >
        <Button variant="ghost" size="icon" onClick={handleEndWorkout} className="text-foreground">
          <X className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <span className="text-2xl font-bold text-foreground tabular-nums">
            {formatTime(workoutTime)}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMuted(!isMuted)}
          className="text-foreground"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Exercise info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 px-5 pt-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Exercise {currentExercise + 1} of {exercises.length}
          </span>
        </div>
        <h1 className="text-3xl font-black text-foreground">{exercise.name}</h1>
      </motion.div>

      {/* Form quality indicator - top center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 px-5 mt-6"
      >
        <FormQualityIndicator 
          quality={formQuality}
          message={formQuality === "warning" ? "Keep your back straight" : undefined}
        />
      </motion.div>

      {/* Center content - Rep counter */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <RepCounter current={reps} total={exercise.targetReps} />
        </motion.div>

        {/* Tempo guide */}
        {exercise.tempo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <TempoGuide phase={tempoPhase} tempo={exercise.tempo} />
          </motion.div>
        )}
      </div>

      {/* Bottom controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 px-5 pb-8 safe-bottom"
      >
        {/* Progress bar for current exercise */}
        <div className="mb-6">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(reps / exercise.targetReps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Play className="w-6 h-6 fill-current" />
            ) : (
              <Pause className="w-6 h-6" />
            )}
          </Button>

          <Button
            size="lg"
            className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-base font-semibold"
            onClick={handleNextExercise}
          >
            {isLastExercise ? "Finish" : "Next"}
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-2"
            onClick={handleNextExercise}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Pause overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <span className="text-4xl font-black text-foreground mb-4">PAUSED</span>
            <Button
              size="lg"
              className="h-14 px-8 rounded-full"
              onClick={() => setIsPaused(false)}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Resume
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
