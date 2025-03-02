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
        redirectTo: `${window.location.origin}/auth/callback`, // Ensure this URL is set in Supabase auth settings
      },
    });

    if (error) alert(error.message);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-white dark:bg-black transition-colors duration-300">
      <Card className="w-full max-w-md p-4 border border-gray-300 dark:border-gray-600 shadow-md bg-white dark:bg-black text-black dark:text-white">
        <CardHeader>
          <CardTitle className="text-center mb-6 text-lg lg:text-2xl font-bold">
            Sign in to WebGenie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-gray-400 dark:border-gray-500 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            onClick={() => loginWithProvider("google")}
          >
            <LogIn className="mr-2 h-4 w-4 " /> Sign in with Google
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-400 dark:border-gray-500 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            onClick={() => loginWithProvider("github")}
          >
            <Github className="mr-2 h-4 w-4" /> Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
