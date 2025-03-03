"use client";
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Examples() {
  const { scrollYProgress } = useScroll();

  // Parallax transformations for background and foreground
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
        className="relative overflow-hidden h-screen"
      >
        {/* Parallax Background Layers */}
        <motion.div
          style={{ y: yBackground, scale: scaleBackground }}
          className="absolute inset-0 bg-[url('/images/robot-coding.jpg')] bg-cover bg-center opacity-50 dark:opacity-30 h-screen"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
          className="absolute inset-0 bg-[url('/images/robot-coding.jpg')] bg-cover bg-center opacity-30 dark:opacity-20 h-screen"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 h-screen"
        />

        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10 h-screen flex items-center justify-center"
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Examples
              </h1>
              <p className="mx-auto max-w-[700px] text-sm md:text-base lg:text-xl">
                Explore real-world examples of websites built with WebGenie.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Examples Grid Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="py-12 md:py-24 bg-muted/50 relative overflow-hidden"
      >
        {/* Parallax Background Layers */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 bg-[url('/images/examples-bg-3.jpg')] bg-cover bg-center opacity-50 dark:opacity-30"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '40%']) }}
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
        />

        {/* Foreground Content */}
        <motion.div
          style={{ y: yForeground }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm"
              >
                <img
                  alt={example.name}
                  className="rounded-lg w-full h-40 sm:h-48 object-cover"
                  src={example.image}
                />
                <h3 className="text-lg sm:text-xl font-semibold">{example.name}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{example.description}</p>
                <Button className="w-full">View Demo</Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}

// Examples Data
const examples = [
  {
    name: "Portfolio Website",
    description: "A modern portfolio website for a photographer.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "E-Commerce Store",
    description: "A fully functional e-commerce store with product listings.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Blog Platform",
    description: "A clean and minimal blog platform for writers.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Landing Page",
    description: "A high-conversion landing page for a SaaS product.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Corporate Website",
    description: "A professional website for a corporate business.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Event Page",
    description: "A vibrant event page for a music festival.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop",
  },
];