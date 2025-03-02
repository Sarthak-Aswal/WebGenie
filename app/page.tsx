"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wand2, Code, Sparkles, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Parallax transformations for background elements
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yForeground = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 bg-gradient-to-b from-background to-muted relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBackground, scale: scaleBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
        />
        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Turn Your Ideas Into Websites with{" "}
                <span className="text-primary">WebGenie</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Describe your dream website in plain text, and watch as WebGenie brings it to life with AI-powered web development.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8">
                Try It Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8">
                View Examples
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Prompt Demo Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
        />
        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                From Prompt to Production in Minutes
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Simply describe what you want, and WebGenie handles the rest. No coding required.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-primary font-medium">1</span>
                  </div>
                  <p className="font-medium">Enter your website description</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-primary font-medium">2</span>
                  </div>
                  <p className="font-medium">WebGenie generates your site</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-primary font-medium">3</span>
                  </div>
                  <p className="font-medium">Customize and publish</p>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Try it yourself</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter a description of the website you want to create
                  </p>
                </div>
                <div className="space-y-4">
                  <textarea
                    className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Create a modern portfolio website for a photographer with a gallery section, about page, and contact form..."
                  ></textarea>
                  <Button className="w-full">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Website
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/50 relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
        />
        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Everything You Need to Build Amazing Websites
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                WebGenie combines AI with powerful web development tools to create stunning websites in minutes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-center text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
        />
        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Loved by Creators Worldwide
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See what our users are saying about WebGenie.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src={testimonial.avatar}
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
        />
        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Create Your Dream Website?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of creators who are building amazing websites with WebGenie.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Wand2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">WebGenie</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Turn your ideas into beautiful websites with AI-powered web development.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Product</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Examples
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Templates
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Guides
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium">Company</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2025 WebGenie. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Data for features and testimonials
const features = [
  {
    icon: Wand2,
    title: "AI-Powered Design",
    description: "Our AI understands your vision and creates beautiful, responsive designs that match your description.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Generate production-ready code that's optimized for performance and easy to customize.",
  },
  {
    icon: Sparkles,
    title: "Customizable Templates",
    description: "Start with AI-generated designs and easily customize them to match your brand.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete websites in minutes, not days or weeks.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Built with security in mind and optimized for reliability and performance.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Share your projects with team members and clients for seamless collaboration.",
  },
];

const testimonials = [
  {
    quote: "WebGenie saved me weeks of development time. I described my e-commerce site, and it generated a beautiful, functional website in minutes.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    name: "Sarah Johnson",
    role: "Entrepreneur",
  },
  {
    quote: "As a designer with limited coding skills, WebGenie has been a game-changer. I can now bring my designs to life without writing a single line of code.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    name: "Michael Chen",
    role: "UI Designer",
  },
  {
    quote: "Our agency has been able to take on more clients and deliver projects faster thanks to WebGenie. It's like having an extra developer on the team.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
    name: "Emily Rodriguez",
    role: "Agency Owner",
  },
];