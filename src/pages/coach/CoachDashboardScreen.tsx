import { motion } from "framer-motion";
import { Users, CheckCircle, AlertCircle, XCircle, TrendingUp, Calendar } from "lucide-react";
import { InsightCard } from "@/components/cards/InsightCard";
import { ClientCard } from "@/components/cards/ClientCard";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";
import type { ClientStatus } from "@/components/badges/StatusBadge";

// Mock data
const dashboardStats = {
  totalClients: 24,
  completedToday: 18,
  needsAttention: 3,
  avgFormScore: 86,
};

const recentClients: Array<{
  id: string;
  name: string;
  status: ClientStatus;
  lastWorkout: string;
  streak?: number;
}> = [
  { id: "1", name: "Sarah Johnson", status: "attention", lastWorkout: "Form issues detected", streak: 5 },
  { id: "2", name: "Mike Chen", status: "completed", lastWorkout: "Upper Body Push", streak: 12 },
  { id: "3", name: "Emma Wilson", status: "skipped", lastWorkout: "Missed today's workout" },
  { id: "4", name: "Alex Rivera", status: "completed", lastWorkout: "Leg Day", streak: 8 },
  { id: "5", name: "Jordan Lee", status: "attention", lastWorkout: "Needs feedback" },
];

export function CoachDashboardScreen() {
  const navigate = useNavigate();

  const attentionClients = recentClients.filter(c => c.status === "attention");
  const completedClients = recentClients.filter(c => c.status === "completed");

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm text-muted-foreground">Coach Dashboard</span>
          <h1 className="text-2xl font-bold text-foreground">Good morning, Coach</h1>
        </motion.div>
      </div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <InsightCard
            title="Total Clients"
            value={dashboardStats.totalClients.toString()}
            icon={Users}
          />
          <InsightCard
            title="Completed Today"
            value={dashboardStats.completedToday.toString()}
            icon={CheckCircle}
            variant="success"
          />
          <InsightCard
            title="Needs Attention"
            value={dashboardStats.needsAttention.toString()}
            icon={AlertCircle}
            variant="warning"
          />
          <InsightCard
            title="Avg Form Score"
            value={`${dashboardStats.avgFormScore}%`}
            change={3}
            icon={TrendingUp}
          />
        </div>
      </motion.div>

      {/* Today's overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Today's Summary</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-completed" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{dashboardStats.completedToday}</span> completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-skipped" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">3</span> skipped
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-attention" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{dashboardStats.needsAttention}</span> attention
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Needs attention */}
      {attentionClients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-status-attention" />
            <h2 className="text-lg font-bold text-foreground">Needs Attention</h2>
          </div>
          <div className="space-y-2">
            {attentionClients.map((client) => (
              <ClientCard
                key={client.id}
                name={client.name}
                status={client.status}
                lastWorkout={client.lastWorkout}
                streak={client.streak}
                onClick={() => navigate(`/coach/clients/${client.id}`)}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent completions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-status-completed" />
          <h2 className="text-lg font-bold text-foreground">Recent Completions</h2>
        </div>
        <div className="space-y-2">
          {completedClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              status={client.status}
              lastWorkout={client.lastWorkout}
              streak={client.streak}
              onClick={() => navigate(`/coach/clients/${client.id}`)}
            />
          ))}
        </div>
      </motion.div>

      <BottomNav role="coach" />
    </div>
  );
}
