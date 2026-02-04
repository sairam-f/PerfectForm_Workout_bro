import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditableFeedbackBlock } from "@/components/feedback/EditableFeedbackBlock";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Mock data
const feedbackData = {
  clientName: "Sarah Johnson",
  workoutName: "Full Body Strength",
  date: "Today",
  aiGeneratedFeedback: `Great effort on today's workout, Sarah! 💪

Here's what I noticed:

**What went well:**
• Your tempo control during squats was excellent
• Push-up form showed real improvement from last week
• Great core stability throughout

**Areas to focus on:**
• Try to keep your knees tracking over your toes during squats - I noticed some inward movement
• On lunges, focus on keeping your front knee behind your toes
• Consider dropping the weight slightly on deadlifts to maintain form

Keep up the hard work! You're making great progress. 🔥`,
};

export function FeedbackScreen() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [isSent, setIsSent] = useState(false);

  const handleApprove = (content: string) => {
    setIsSent(true);
    toast.success("Feedback sent to Sarah!");
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const handleRegenerate = () => {
    toast.info("Regenerating feedback...");
    // In a real app, this would call the AI API
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Send Feedback</h1>
        </div>
      </div>

      {/* Client info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 mb-6"
      >
        <div className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${feedbackData.clientName}`} />
            <AvatarFallback className="bg-primary/10 text-primary">SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{feedbackData.clientName}</h3>
            <p className="text-sm text-muted-foreground">
              {feedbackData.workoutName} • {feedbackData.date}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feedback block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5"
      >
        {isSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-status-completed-bg rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-status-completed/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-status-completed" />
            </div>
            <h3 className="text-xl font-bold text-status-completed mb-2">Feedback Sent!</h3>
            <p className="text-sm text-status-completed/80">
              Sarah will receive your feedback notification
            </p>
          </motion.div>
        ) : (
          <EditableFeedbackBlock
            initialContent={feedbackData.aiGeneratedFeedback}
            onApprove={handleApprove}
            onRegenerate={handleRegenerate}
            isAIGenerated
          />
        )}
      </motion.div>
    </div>
  );
}
