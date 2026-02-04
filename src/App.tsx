import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Athlete screens
import { OnboardingScreen } from "./pages/athlete/OnboardingScreen";
import { AthleteHomeScreen } from "./pages/athlete/AthleteHomeScreen";
import { LiveWorkoutScreen } from "./pages/athlete/LiveWorkoutScreen";
import { PostWorkoutSummaryScreen } from "./pages/athlete/PostWorkoutSummaryScreen";
import { ProgressInsightsScreen } from "./pages/athlete/ProgressInsightsScreen";
import { AthleteProfileScreen } from "./pages/athlete/AthleteProfileScreen";

// Coach screens
import { CoachDashboardScreen } from "./pages/coach/CoachDashboardScreen";
import { ClientListScreen } from "./pages/coach/ClientListScreen";
import { ClientDetailScreen } from "./pages/coach/ClientDetailScreen";
import { WorkoutReviewScreen } from "./pages/coach/WorkoutReviewScreen";
import { FeedbackScreen } from "./pages/coach/FeedbackScreen";
import { CoachProfileScreen } from "./pages/coach/CoachProfileScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Index />} />
          
          {/* Athlete routes */}
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/home" element={<AthleteHomeScreen />} />
          <Route path="/workout" element={<LiveWorkoutScreen />} />
          <Route path="/workout/summary" element={<PostWorkoutSummaryScreen />} />
          <Route path="/progress" element={<ProgressInsightsScreen />} />
          <Route path="/profile" element={<AthleteProfileScreen />} />
          
          {/* Coach routes */}
          <Route path="/coach" element={<CoachDashboardScreen />} />
          <Route path="/coach/clients" element={<ClientListScreen />} />
          <Route path="/coach/clients/:clientId" element={<ClientDetailScreen />} />
          <Route path="/coach/workout/:workoutId" element={<WorkoutReviewScreen />} />
          <Route path="/coach/feedback/:clientId" element={<FeedbackScreen />} />
          <Route path="/coach/profile" element={<CoachProfileScreen />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
