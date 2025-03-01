"use client";

import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, LogIn } from "lucide-react";

export default function LoginPage() {
  const loginWithProvider = async (provider: "github" | "google") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Make sure this URL is set in Supabase auth settings
      },
    });

    if (error) alert(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold dark:text-white">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full dark:border-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => loginWithProvider("google")}
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full dark:border-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => loginWithProvider("github")}
          >
            <Github className="mr-2 h-4 w-4" /> Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
