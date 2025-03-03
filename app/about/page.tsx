import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail } from 'lucide-react'; // Import an email icon

export default function About() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center opacity-50 dark:opacity-30"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
        />

        {/* Foreground Content */}
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                About WebGenie
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Learn more about our mission, team, and the technology behind WebGenie.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="#team">Meet the Team</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                <Link href="#mission">Our Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Our Mission
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                At WebGenie, our mission is to make web development accessible to everyone, regardless of their technical expertise. We believe that anyone should be able to bring their ideas to life on the web, and we're here to make that happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A group of passionate individuals dedicated to making web development accessible to everyone.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm"
              >
                {/* Profile Image */}
                <img
                  alt={member.name}
                  className="rounded-full aspect-square h-24 w-24 object-cover" // Fixed size and aspect ratio
                  src={member.avatar}
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-center text-muted-foreground">
                  {member.role}
                </p>
                {/* Contact Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  asChild
                >
                  <Link href={`mailto:${member.email}`}>
                    <Mail className="mr-2 h-4 w-4" /> Contact
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Team Members Data
const teamMembers = [
  {
    name: "Ayush Mathpal",
    role: "CEO & Founder",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    email: "john.doe@webgenie.com",
  },
  {
    name: "Ayush Durgapal",
    role: "Lead Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    email: "jane.smith@webgenie.com",
  },
  {
    name: "Sarthak Aswal",
    role: "Lead Developer",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop",
    email: "michael.brown@webgenie.com",
  },
  {
    name: "Saiman Rana",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    email: "emily.johnson@webgenie.com",
  },
];