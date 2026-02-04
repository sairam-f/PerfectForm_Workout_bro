# Workout Bro

## Project info

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I edit this code?

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Project Insights

### Assumptions Made
- Users primarily access the app on mobile devices given the "on-the-go" nature of fitness and coaching.
- Coaches require a dashboard view to manage multiple athletes, while athletes need a streamlined, focused interface for their workouts.
- The "AI" component implies real-time video analysis or sensor data interpretation to provide feedback, though the current implementation focuses on the UI/UX shell.

### UX Process
The design prioritizes a "mobile-first" approach with large, touch-friendly targets (e.g., the 64px height buttons). I utilized `framer-motion` to introduce subtle entrance animations (fade-ins, slide-ups) to create a premium, polished feel without overwhelming the user. The color palette uses high-contrast primary colors against a clean background to ensure readability in gym environments. Navigation is simplified into clear "Athlete" vs "Coach" pathways to reduce cognitive load at the start.

### What I Built
I built "FitForm AI", a responsive web application serving as a dual-sided platform for athletes and coaches. Key features include:
- **Role-Based Onboarding**: distinct flows for Athletes (training focus) and Coaches (management focus).
- **Interactive UI**: High-performance components using `shadcn-ui` and Tailwind CSS for a consistent design system.
- **Routing Architecture**: A scalable routing setup using `react-router-dom` to handle the different user journeys.

### How AI is Used in the Product
AI is the core differentiator of FitForm. It is designed to provide **Real-time Form Feedback**. By leveraging computer vision (simulated or planned integration), the app analyzes user movements via their camera feed to offer instantaneous corrections on posture and technique, ensuring safe and effective training.
