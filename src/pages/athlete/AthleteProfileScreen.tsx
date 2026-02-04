import { motion } from "framer-motion";
import { Settings, ChevronRight, Bell, User, Shield, LogOut, HelpCircle, Moon, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/navigation/BottomNav";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: User, label: "Edit Profile", description: "Update your info" },
  { icon: Bell, label: "Notifications", description: "Manage alerts" },
  { icon: Camera, label: "Camera Settings", description: "Form analysis preferences" },
  { icon: Shield, label: "Privacy & Security", description: "Data and permissions" },
  { icon: HelpCircle, label: "Help & Support", description: "FAQs and contact" },
];

export function AthleteProfileScreen() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 ring-4 ring-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=athlete" />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">Jordan Davis</h2>
              <p className="text-muted-foreground text-sm">Intermediate • Strength Focus</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  🔥 12 day streak
                </span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-border">
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">47</span>
              <span className="text-xs text-muted-foreground block">Workouts</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">89%</span>
              <span className="text-xs text-muted-foreground block">Avg Form</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-foreground">8</span>
              <span className="text-xs text-muted-foreground block">Badges</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Dark Mode</span>
            </div>
            <Switch />
          </div>
        </div>
      </motion.div>

      {/* Menu items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-5 mb-6"
      >
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors",
                index !== menuItems.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <span className="font-medium text-foreground block">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="px-5"
      >
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/20 text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </motion.div>

      <BottomNav role="athlete" />
    </div>
  );
}
