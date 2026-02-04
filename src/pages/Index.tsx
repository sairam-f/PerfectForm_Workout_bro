import { motion } from "framer-motion";
import { Dumbbell, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <Dumbbell className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black text-foreground text-center mb-3"
        >
          Workout Bro AI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center max-w-xs mb-12"
        >
          Real-time form feedback powered by AI. Train smarter, get stronger.
        </motion.p>

        {/* Role selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-sm space-y-3"
        >
          <Button
            onClick={() => navigate("/onboarding")}
            className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-semibold justify-between px-6"
          >
            <div className="flex items-center gap-3">
              <Dumbbell className="w-6 h-6" />
              <span>I'm an Athlete</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => navigate("/coach")}
            variant="outline"
            className="w-full h-16 rounded-2xl text-lg font-semibold justify-between px-6 border-2"
          >
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" />
              <span>I'm a Coach</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-6 pb-8 text-center"
      >
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
