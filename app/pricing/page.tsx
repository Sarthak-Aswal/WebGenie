import { Button } from '@/components/ui/button';

export default function Pricing() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden"> {/* Prevent scrolling */}
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-[url('/images/pricing-bg.jpg')] bg-cover bg-center opacity-50 dark:opacity-30"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30"
        />

        {/* Foreground Content */}
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Pricing Plans
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that fits your needs and start building your dream website today.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="h-screen flex items-center justify-center bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
                <p className="text-3xl font-bold">{plan.price}</p>
                <Button className="w-full">Get Started</Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Pricing Plans Data
const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small projects",
    price: "₹500/month",
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "₹800/month",
  },
  {
    name: "Enterprise",
    description: "For large-scale projects",
    price: "₹1000/month",
  },
];