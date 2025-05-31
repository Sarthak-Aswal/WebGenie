"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

type Project = {
  id: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    checkUserAndFetchProjects();
  }, []);

  const checkUserAndFetchProjects = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(user);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data);
    }

    setLoading(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Failed to delete project: " + error.message);
      setDeletingId(null);
    } else {
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Please log in to see your projects</h2>
        <p className="mb-6 text-muted-foreground max-w-md">
          You need to be logged in to save and manage your projects.
        </p>
        <Link href="/login" passHref>
          <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div>
      <main className="flex flex-col min-h-screen">
        {/* Header Section */}
        <motion.section className="relative overflow-hidden h-[40vh]">
          <motion.div
            style={{ y: yBackground }}
            className="absolute inset-0 bg-[url('/images/examples-bg-3.jpg')] bg-cover bg-center opacity-40 dark:opacity-20"
          />
          <motion.div
            style={{ y: yForeground }}
            className="container px-4 md:px-6 relative z-10 h-full flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-bold">Your Projects</h1>
              <p className="text-muted-foreground">
                View and manage all your saved projects.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Project Grid */}
        <section className="py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            {projects.length === 0 ? (
              <div className="text-center text-gray-500">No projects found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col space-y-3 rounded-lg border bg-card p-4 sm:p-6 shadow-sm"
                  >
                    <div className="text-sm text-muted-foreground">
                      Created on:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <p className="line-clamp-3 text-sm">
                      {project.code.length > 100
                        ? project.code.slice(0, 100) + "..."
                        : project.code}
                    </p>

                    <div className="flex space-x-3">
                      <Link href={`/project/${project.id}`} passHref>
                        <Button className="flex-1">Open</Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => deleteProject(project.id)}
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
