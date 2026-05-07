# PocketWise - Mobile Expense Tracker

A modern, highly-polished, and cloud-synced personal finance tracking mobile application built with React, Capacitor, and Supabase.

This application features a beautiful mobile-first design, interactive charts, and real-time database syncing to help you take control of your financial life seamlessly across all your devices.

# 📄 [Expense Tracker App SDLC Document](https://drive.google.com/file/d/1-V60WEIjtJFCk1CEByx8lITHfn5VFUwM/view?usp=sharing)

## ✨ Key Features

- **📊 Dynamic Dashboard**: Get a quick overview of your total balance, recent transactions, and monthly income vs. expense summary.
- **💸 Expense Management & Receipt Uploads**: Add, edit, and delete transactions with categorizations, payment methods, notes, and image uploads for receipts.
- **🎯 Budget Tracking**: Set monthly limits per category. Visual progress bars and smart alerts tell you when you are nearing or exceeding your limits.
- **🌍 Multi-Language & Currency**: Full internationalization (i18n) support with customizable currency formatting based on your locale.
- **☁️ Cloud Synced & Offline Capable**: Powered by Supabase. Your data is securely saved to the cloud, allowing you to access it from any device, while supporting offline usage.
- **🔒 Secure Authentication**: Built-in email/password login, social login capabilities, and account protection using Supabase Auth.
- **📤 Export Data**: One-click export of your filtered transaction history to CSV format.
- **📱 Mobile Native Experience**: Packaged with Capacitor for Android deployment. Includes a persistent bottom navigation shell, smooth animations (Framer Motion), and glassmorphism UI.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI Primitives
- **Mobile runtime**: Capacitor (Android/iOS)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend & Database**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Internationalization**: i18n
- **Forms & Validation**: React Hook Form, Zod

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### 1. Clone & Install
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Expense-Trackers-App/expense-tracker-mobile-app.git
cd expense-tracker-mobile-app
npm install
```

### 2. Supabase Setup (Database & Storage)
This app relies on Supabase for authentication, data persistence, and receipt image storage.
1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Open the **SQL Editor** in your Supabase dashboard and run the provided `supabase_schema.sql` script to create tables (`expenses`, `budgets`, `settings`, `profiles`) and setup Row Level Security (RLS).
4. Create a new Storage Bucket (e.g., `receipts`) for the receipt upload feature, ensuring it is public or has correct RLS policies.

### 3. Environment Variables
Connect your React app to your Supabase project:
1. Locate your Supabase URL and Anon Key in your Project Settings > API.
2. Create a `.env` file in the root of the project.
3. Add the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Run the App Locally
Start the Vite development server:
```bash
npm run dev
```

### 5. Build for Mobile (Android)
If you're running the mobile build using Capacitor:
```bash
npm run build
npx cap sync android
npx cap open android
```

## 📂 Project Structure

- `android/` - Capacitor Android native project files
- `src/components/` - Reusable UI components (buttons, layouts, navigation, etc.)
- `src/context/` - Global state management hooking UI to Supabase
- `src/lib/` - Utility functions, types, i18n configuration, and Supabase client
- `src/pages/` - Main application views (Dashboard, Expenses, Analytics, Settings, Profile, etc.)
- `supabase_schema.sql` - The database schema used to initialize the cloud backend

## 🛡️ Security
This app uses Supabase Row Level Security (RLS). Every database query automatically filters data by `user_id`. It is impossible for a user to query or modify data belonging to another user.

---
*Built with modern web technologies.*
