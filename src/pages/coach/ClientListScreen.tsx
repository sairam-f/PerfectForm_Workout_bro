import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/cards/ClientCard";
import { BottomNav } from "@/components/navigation/BottomNav";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { ClientStatus } from "@/components/badges/StatusBadge";

// Mock data
const allClients: Array<{
  id: string;
  name: string;
  status: ClientStatus;
  lastWorkout: string;
  streak?: number;
  avatarUrl?: string;
}> = [
  { id: "1", name: "Sarah Johnson", status: "attention", lastWorkout: "Form issues detected", streak: 5 },
  { id: "2", name: "Mike Chen", status: "completed", lastWorkout: "Upper Body Push", streak: 12 },
  { id: "3", name: "Emma Wilson", status: "skipped", lastWorkout: "Missed today's workout" },
  { id: "4", name: "Alex Rivera", status: "completed", lastWorkout: "Leg Day", streak: 8 },
  { id: "5", name: "Jordan Lee", status: "attention", lastWorkout: "Needs feedback" },
  { id: "6", name: "Taylor Smith", status: "completed", lastWorkout: "Full Body", streak: 15 },
  { id: "7", name: "Casey Brown", status: "completed", lastWorkout: "Core & Mobility", streak: 3 },
  { id: "8", name: "Morgan Davis", status: "skipped", lastWorkout: "Rest day taken" },
];

type FilterType = "all" | "completed" | "skipped" | "attention";

const filters: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: Filter },
  { id: "completed", label: "Completed", icon: CheckCircle },
  { id: "attention", label: "Attention", icon: AlertCircle },
  { id: "skipped", label: "Skipped", icon: XCircle },
];

export function ClientListScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredClients = allClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: allClients.length,
    completed: allClients.filter(c => c.status === "completed").length,
    attention: allClients.filter(c => c.status === "attention").length,
    skipped: allClients.filter(c => c.status === "skipped").length,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <span className="text-sm text-muted-foreground">{allClients.length} active clients</span>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "rounded-full gap-1.5 flex-shrink-0",
                  isActive && "bg-primary hover:bg-primary/90"
                )}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  isActive ? "bg-primary-foreground/20" : "bg-muted"
                )}>
                  {statusCounts[filter.id]}
                </span>
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* Client list */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="px-5"
      >
        {filteredClients.length > 0 ? (
          <div className="space-y-2">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ClientCard
                  name={client.name}
                  avatarUrl={client.avatarUrl}
                  status={client.status}
                  lastWorkout={client.lastWorkout}
                  streak={client.streak}
                  onClick={() => navigate(`/coach/clients/${client.id}`)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        )}
      </motion.div>

      <BottomNav role="coach" />
    </div>
  );
}
