import { supabase } from '@/lib/supabase';
import TemplateEditor from '@/components/TemplateEditor';

// Function to generate static paths for SSG
export async function generateStaticParams() {
  // Fetch all template IDs from Supabase
  const { data: templates, error } = await supabase
    .from('templates')
    .select('id');

  if (error) {
    console.error('Error fetching templates:', error);
    return [];
  }

  // Return an array of objects with the dynamic parameter (id)
  return templates.map((template) => ({
    id: template.id,
  }));
}

export default function TemplatePage({ params }: { params: { id: string } }) {
  return <TemplateEditor id={params.id} />;
}