"use client";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Template } from "@/types/template";
import { ClipLoader } from "react-spinners";

export default function Examples() {
  const { scrollYProgress } = useScroll();

  // ✅ Move all useTransform calls OUTSIDE JSX
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const yBackgroundLayer2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yBackgroundLayer3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yGradient = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase.from("templates").select("*");
      if (error) throw error;
      setTemplates(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return (
    <motion.div style={{ overflow: "hidden" }}>
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <motion.section className="relative overflow-hidden h-screen">
          {/* Parallax Background Layers */}
          <motion.div
            style={{ y: yBackground, scale: scaleBackground }}
            className="absolute inset-0 bg-[url('/images/robot-coding.jpg')] bg-cover bg-center opacity-50 dark:opacity-30 h-screen"
          />
          <motion.div
            style={{ y: yBackgroundLayer2 }}
            className="absolute inset-0 bg-[url('/images/robot-coding.jpg')] bg-cover bg-center opacity-30 dark:opacity-20 h-screen"
          />
          <motion.div
            style={{ y: yBackgroundLayer3 }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 h-screen"
          />

          {/* Foreground Content */}
          <motion.div
            style={{ y: yForeground }}
            className="container px-4 md:px-6 relative z-10 h-screen flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Examples
              </h1>
              <p className="mx-auto max-w-[700px] text-sm md:text-base lg:text-xl">
                Explore real-world examples of websites built with WebGenie.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Examples Grid Section */}
        <motion.section className="py-12 md:py-24 bg-muted/50 relative overflow-hidden">
          {/* Parallax Background Layers */}
          <motion.div
            style={{ y: yBackground }}
            className="absolute inset-0 bg-[url('/images/examples-bg-3.jpg')] bg-cover bg-center opacity-50 dark:opacity-30"
          />
          <motion.div
            style={{ y: yGradient }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
          />

          {/* Foreground Content */}
          <motion.div
            style={{ y: yForeground }}
            className="container px-4 md:px-6 relative z-10"
          >
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col space-y-4 rounded-lg border bg-card p-4 sm:p-6 shadow-sm"
                >
                  <img
                    alt={template.name}
                    className="rounded-lg w-full h-40 sm:h-48 object-cover"
                    src={template.thumbnail_url}
                  />
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {template.name}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {template.description}
                  </p>
                  <Link href={`/template/${template.id}`} passHref>
                    <Button className="w-full">View Demo</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>
    </motion.div>
  );
}
;