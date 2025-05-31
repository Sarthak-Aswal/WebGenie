"use client";
import {toast} from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useRouter } from 'next/navigation';

type Project = {
  id: string;
  user_id: string;
   name:string;
  html_code: string;
  created_at: string;
  updated_at: string;
};

export default function ProjectsPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
 
  useEffect(() => {
    async function fetchUserAndProjects() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setErrorMsg("Error fetching session.");
          setUser(null);
          setLoading(false);
          return;
        }

        const user = sessionData?.session?.user ?? null;
        if (!user) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(user);

        // Fetch projects for this user
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
          setErrorMsg("Failed to fetch projects.");
          setProjects([]);
        } else {
          setProjects(projectsData || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setErrorMsg("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndProjects();
  }, []);
const router = useRouter();

const handleOpenInEditor = (project: Project) => {
  sessionStorage.setItem("generatedTemplate", JSON.stringify({
    html: project.html_code,
    projectId:project.id,
    name: project.name,
  }));
  router.push("/editor");
};

const deleteProject = async (id: string) => {
  if (!confirm("Are you sure you want to delete this project?")) return;
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert("Failed to delete project.");
      console.error("Delete error:", error);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project deleted successfully");
  } catch (err) {
    console.error("Unexpected delete error:", err);
    alert("Something went wrong during deletion.");
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
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <p className="mb-4 text-lg">
          You must be logged in to view and save projects.
        </p>
        <Link href="/login">
          <Button>Login to start saving projects</Button>
        </Link>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found. Start creating one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">Project Name: {project.name}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Created at: {project.created_at.slice(0, 10)}
                </p>
              </div>
              <div className="flex gap-2">
  <Button
    variant="outline"
    onClick={() => handleOpenInEditor(project)}
    className="flex-grow"
  >
    Open in Editor
  </Button>
  <Button
    variant="destructive"
    onClick={() => deleteProject(project.id)}
    className="flex-grow"
  >
    Delete
  </Button>
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
