"use client";
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wand2, Code, Sparkles, Zap, Shield, Users } from 'lucide-react';

export default function Features() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yForeground = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 relative overflow-hidden"
      >
        {/* Background Image with Gradient Overlay */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-[url('/images/features-bg.jpg')] bg-cover bg-center opacity-50 dark:opacity-30"
        />
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
        />

        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Features
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore the powerful features that make WebGenie the ultimate web development tool.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Grid Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-muted/50"
      >
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </motion.section>
    </main>
  );
}

// Features Data
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