"use client";
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Edit, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import type { Database } from '@/lib/database.types';

export default function ProjectsPage() {
  const supabase = createClientComponentClient<Database>();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load projects');
        console.error(error);
      } else {
        setProjects(data || []);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete project');
    } else {
      setProjects(projects.filter(p => p.id !== id));
      toast.success('Project deleted');
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Link href="/editor">
          <Button>New Project</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium truncate">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {new Date(project.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link href={`/editor?project=${project.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}