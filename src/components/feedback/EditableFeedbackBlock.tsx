import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, Edit3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EditableFeedbackBlockProps {
  initialContent: string;
  onApprove: (content: string) => void;
  onRegenerate?: () => void;
  isAIGenerated?: boolean;
  className?: string;
}

export function EditableFeedbackBlock({
  initialContent,
  onApprove,
  onRegenerate,
  isAIGenerated = true,
  className,
}: EditableFeedbackBlockProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsModified(value !== initialContent);
  };

  const handleApprove = () => {
    onApprove(content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border bg-card overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          {isAIGenerated && (
            <>
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                AI-Generated Feedback
              </span>
            </>
          )}
          {isModified && (
            <span className="text-xs text-form-warning px-2 py-0.5 bg-form-warning/10 rounded-full">
              Modified
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="h-8 px-2"
        >
          <Edit3 className="w-4 h-4 mr-1" />
          {isEditing ? "Preview" : "Edit"}
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="min-h-[120px] resize-none border-dashed"
            placeholder="Write your feedback..."
          />
        ) : (
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
        {onRegenerate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Regenerate
          </Button>
        )}
        <Button
          onClick={handleApprove}
          size="sm"
          className="ml-auto bg-primary hover:bg-primary/90"
        >
          <Check className="w-4 h-4 mr-1" />
          Approve & Send
        </Button>
      </div>
    </motion.div>
  );
}
