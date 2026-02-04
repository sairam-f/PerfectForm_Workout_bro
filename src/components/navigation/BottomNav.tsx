import { NavLink, useLocation } from "react-router-dom";
import { Home, Dumbbell, TrendingUp, User, Users, LayoutDashboard, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const athleteNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dumbbell, label: "Workout", path: "/workout" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: User, label: "Profile", path: "/profile" },
];

const coachNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/coach" },
  { icon: Users, label: "Clients", path: "/coach/clients" },
  { icon: MessageSquare, label: "Feedback", path: "/coach/feedback" },
  { icon: User, label: "Profile", path: "/coach/profile" },
];

interface BottomNavProps {
  role?: "athlete" | "coach";
}

export function BottomNav({ role = "athlete" }: BottomNavProps) {
  const location = useLocation();
  const navItems = role === "coach" ? coachNavItems : athleteNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && item.path !== "/coach" && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full touch-manipulation"
            >
              <motion.div
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
