import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Dumbbell, Target, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  options: { id: string; label: string; description?: string }[];
  multiSelect?: boolean;
}

const steps: OnboardingStep[] = [
  {
    id: "goal",
    title: "What's your fitness goal?",
    subtitle: "Choose your primary focus",
    icon: Target,
    options: [
      { id: "strength", label: "Build Strength", description: "Get stronger and build muscle" },
      { id: "weight-loss", label: "Lose Weight", description: "Burn fat and get lean" },
      { id: "endurance", label: "Improve Endurance", description: "Increase stamina and cardio" },
      { id: "flexibility", label: "Stay Flexible", description: "Improve mobility and recovery" },
    ],
  },
  {
    id: "experience",
    title: "What's your experience level?",
    subtitle: "We'll tailor workouts to match",
    icon: Zap,
    options: [
      { id: "beginner", label: "Beginner", description: "New to fitness or returning after a break" },
      { id: "intermediate", label: "Intermediate", description: "Workout regularly, familiar with exercises" },
      { id: "advanced", label: "Advanced", description: "Experienced, looking for intense challenges" },
    ],
  },
  {
    id: "equipment",
    title: "What equipment do you have?",
    subtitle: "Select all that apply",
    icon: Dumbbell,
    multiSelect: true,
    options: [
      { id: "none", label: "Bodyweight Only" },
      { id: "dumbbells", label: "Dumbbells" },
      { id: "barbell", label: "Barbell & Plates" },
      { id: "kettlebell", label: "Kettlebells" },
      { id: "bands", label: "Resistance Bands" },
      { id: "gym", label: "Full Gym Access" },
    ],
  },
];

export function OnboardingScreen() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleSelect = (optionId: string) => {
    const stepId = step.id;
    if (step.multiSelect) {
      const current = selections[stepId] || [];
      if (current.includes(optionId)) {
        setSelections({ ...selections, [stepId]: current.filter((id) => id !== optionId) });
      } else {
        setSelections({ ...selections, [stepId]: [...current, optionId] });
      }
    } else {
      setSelections({ ...selections, [stepId]: [optionId] });
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      // Complete onboarding
      navigate("/home");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const isSelected = (optionId: string) => {
    return selections[step.id]?.includes(optionId) || false;
  };

  const canProceed = (selections[step.id]?.length || 0) > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6">
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 px-6 py-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
          >
            <step.icon className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {step.title}
          </h1>
          <p className="text-muted-foreground mb-8">{step.subtitle}</p>

          {/* Options */}
          <div className="space-y-3">
            {step.options.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => handleSelect(option.id)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  "flex items-center justify-between",
                  isSelected(option.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div>
                  <span className={cn(
                    "font-semibold block",
                    isSelected(option.id) ? "text-primary" : "text-foreground"
                  )}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-sm text-muted-foreground mt-0.5 block">
                      {option.description}
                    </span>
                  )}
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  isSelected(option.id)
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}>
                  {isSelected(option.id) && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom action */}
      <div className="px-6 pb-8 safe-bottom">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90"
        >
          {isLastStep ? "Get Started" : "Continue"}
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
