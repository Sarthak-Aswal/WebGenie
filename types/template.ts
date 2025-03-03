export interface Template {
    id: string; // UUID
    name: string;
    description: string;
    html: string;
    css?: string; // Optional field
    thumbnail_url: string;
    created_at: string;
  };