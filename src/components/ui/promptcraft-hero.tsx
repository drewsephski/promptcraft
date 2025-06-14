"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, GraduationCap, Brain, Code, Lightbulb, Target, Users, Zap, FileText, Search, Globe, Calendar, Bell, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Utility function for className merging
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Aurora Background component implementation
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-[100vh] items-center justify-center bg-blue-950/60 dark:bg-zinc-900 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

// Floating Paths component
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.02,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.3 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Main Hero Section Component
interface PromptCraftHeroProps {
  title?: string;
  subtitle?: string;
}

export function PromptCraftHero({
  title = "Explore curated prompt engineering tutorials",
  subtitle = "Master the art of prompt engineering with our comprehensive library of tutorials, examples, and best practices. Learn from experts and improve your AI interactions.",
}: PromptCraftHeroProps) {
  const words = title.split(" ");

  return (
    <AuroraBackground className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-background dark:bg-neutral-950">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              ✨ PromptCraft Library
            </span>
          </motion.div>

          {/* Animated Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block mr-3 last:mr-0"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/80 dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
          >
            <div className="group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-base font-semibold backdrop-blur-md bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 text-black dark:text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10 hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <Link to="/tutorials">
                  <BookOpen className="mr-2 h-5 w-5" />
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                    Browse Tutorials
                  </span>
                </Link>
              </Button>
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-2xl border-border/50 hover:border-border bg-background/50 hover:bg-background/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/submit">
                <Plus className="mr-2 h-5 w-5" />
                Submit a Prompt
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-2xl hover:bg-accent/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Link to="/about">
                <GraduationCap className="mr-2 h-5 w-5" />
                Learn Prompting Basics
              </Link>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="pt-8 text-sm text-muted-foreground"
          >
            <p>Join thousands of developers mastering AI prompt engineering</p>
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}

// Features Section with Tabs
interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface FeaturesTabsProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const FeaturesTabs = ({
  badge = "PromptCraft Library",
  heading = "Master Prompt Engineering with Expert-Curated Content",
  description = "Explore comprehensive tutorials, examples, and best practices from industry experts.",
  tabs = [
    {
      value: "tab-1",
      icon: <Brain className="h-auto w-4 shrink-0" />,
      label: "AI Fundamentals",
      content: {
        badge: "Foundation",
        title: "Build your AI knowledge from the ground up.",
        description:
          "Start with the basics of AI and machine learning. Learn how language models work, understand token limits, and discover the principles behind effective prompt design.",
        buttonText: "Start Learning",
        imageSrc: "/api/placeholder/600/400",
        imageAlt: "AI Fundamentals illustration",
      },
    },
    {
      value: "tab-2",
      icon: <Code className="h-auto w-4 shrink-0" />,
      label: "Advanced Techniques",
      content: {
        badge: "Expert Level",
        title: "Master sophisticated prompting strategies.",
        description:
          "Dive deep into chain-of-thought prompting, few-shot learning, and prompt chaining. Learn to create complex workflows and optimize for specific use cases.",
        buttonText: "Explore Advanced",
        imageSrc: "/api/placeholder/600/400",
        imageAlt: "Advanced techniques illustration",
      },
    },
    {
      value: "tab-3",
      icon: <Target className="h-auto w-4 shrink-0" />,
      label: "Real-World Applications",
      content: {
        badge: "Practical",
        title: "Apply your skills to real projects.",
        description:
          "See how prompt engineering works in practice with case studies, industry examples, and hands-on projects that you can implement immediately.",
        buttonText: "View Examples",
        imageSrc: "/api/placeholder/600/400",
        imageAlt: "Real-world applications illustration",
      },
    },
  ],
}: FeaturesTabsProps) => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-2xl">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button asChild className="mt-2.5 w-fit gap-2" size="lg">
                    <Link to="/tutorials">
                      {tab.content.buttonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-border/50">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      {tab.icon}
                    </div>
                    <p className="text-sm text-muted-foreground">Interactive Content Preview</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

// Bento Grid Components
const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
        <Link to={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

// Features Grid Section
const FeaturesGrid = () => {
  const features = [
    {
      title: "Curated Content",
      description: "Hand-picked tutorials and examples from industry experts and practitioners.",
      icon: <BookOpen />,
    },
    {
      title: "Interactive Learning",
      description: "Practice with real examples and get instant feedback on your prompts.",
      icon: <Lightbulb />,
    },
    {
      title: "Community Driven",
      description: "Learn from and contribute to a growing community of prompt engineers.",
      icon: <Users />,
    },
    {
      title: "Regular Updates",
      description: "Stay current with the latest techniques and best practices in AI.",
      icon: <Zap />,
    },
  ];

  return (
    <section className="py-32 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">
            Everything you need to master prompt engineering
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need to become proficient in AI prompt engineering.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
              )}
            >
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
              <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {feature.icon}
              </div>
              <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                  {feature.title}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Bento Features Section
const BentoFeatures = () => {
  const features = [
    {
      Icon: FileText,
      name: "Comprehensive Tutorials",
      description: "Step-by-step guides covering everything from basics to advanced techniques.",
      href: "/tutorials",
      cta: "Browse Tutorials",
      background: <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: Search,
      name: "Smart Search",
      description: "Find exactly what you need with our intelligent search system.",
      href: "/tutorials",
      cta: "Try Search",
      background: <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Globe,
      name: "Multi-Domain",
      description: "Covers prompting for various AI models and use cases.",
      href: "/tutorials",
      cta: "Explore Domains",
      background: <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Calendar,
      name: "Learning Paths",
      description: "Structured learning journeys tailored to your skill level.",
      href: "/tutorials",
      cta: "Start Path",
      background: <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Bell,
      name: "Updates & News",
      description: "Stay informed about the latest developments in AI and prompt engineering.",
      href: "/about",
      cta: "Get Updates",
      background: <div className="absolute -right-20 -top-20 opacity-60 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Platform Features</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">
            Powerful tools for effective learning
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make PromptCraft Library the best place to learn prompt engineering.
          </p>
        </div>
        
        <BentoGrid className="lg:grid-rows-3 max-w-7xl mx-auto">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Engineer at TechCorp",
      content: "PromptCraft Library transformed how I approach prompt engineering. The tutorials are comprehensive and the examples are incredibly practical.",
      avatar: "/api/placeholder/64/64",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager at StartupXYZ",
      content: "The curated content here is top-notch. I've learned techniques that immediately improved our AI product's performance.",
      avatar: "/api/placeholder/64/64",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Data Scientist",
      content: "Finally, a resource that covers both theory and practice. The community contributions make this even more valuable.",
      avatar: "/api/placeholder/64/64",
      rating: 5,
    },
  ];

  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">
            Loved by developers worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our community has to say about their learning experience with PromptCraft Library.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{testimonial.content}</p>
              <div className="flex">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "10,000+", label: "Active Learners", icon: <Users className="h-8 w-8" /> },
    { number: "500+", label: "Tutorials", icon: <BookOpen className="h-8 w-8" /> },
    { number: "50+", label: "Expert Contributors", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "99%", label: "Satisfaction Rate", icon: <Zap className="h-8 w-8" /> },
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Impact</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">
            Trusted by the community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have already transformed their AI skills with our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="text-blue-600 dark:text-blue-400">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
          >
            <Badge variant="outline" className="mb-6">Stay Updated</Badge>
            <h2 className="text-3xl font-semibold md:text-4xl mb-4">
              Get the latest prompt engineering insights
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly tutorials, expert tips, and the latest developments in AI prompt engineering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>
              <Button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const FooterSection = () => {
  const footerLinks = [
    {
      label: 'Product',
      links: [
        { title: 'Tutorials', href: '/tutorials' },
        { title: 'Examples', href: '/tutorials' },
        { title: 'Community', href: '/about' },
        { title: 'API', href: '/about' },
      ],
    },
    {
      label: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/about' },
        { title: 'Careers', href: '/about' },
        { title: 'Contact', href: '/about' },
      ],
    },
    {
      label: 'Resources',
      links: [
        { title: 'Documentation', href: '/tutorials' },
        { title: 'Help Center', href: '/about' },
        { title: 'Privacy Policy', href: '/about' },
        { title: 'Terms of Service', href: '/about' },
      ],
    },
  ];

  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold">PromptCraft</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            Master the art of prompt engineering with our comprehensive library of tutorials and examples.
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PromptCraft Library. All rights reserved.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-10 md:mb-0"
            >
              <h3 className="text-sm font-semibold mb-4">{section.label}</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      to={link.href}
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

// Main Combined Component
export function PromptCraftHeroComplete({
  title = "Explore curated prompt engineering tutorials",
  subtitle = "Master the art of prompt engineering with our comprehensive library of tutorials, examples, and best practices. Learn from experts and improve your AI interactions.",
}: PromptCraftHeroProps) {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <PromptCraftHero title={title} subtitle={subtitle} />

      {/* Features Tabs Section */}
      <FeaturesTabs />

      {/* Features Grid Section */}
      <FeaturesGrid />

      {/* Bento Features Section */}
      <BentoFeatures />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}

// Usage example
export default function PromptCraftHeroDemo() {
  return <PromptCraftHeroComplete />;
}