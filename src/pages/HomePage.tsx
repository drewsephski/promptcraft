import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection02 from '@/components/ui/ruixen-hero-section-02';
import { 
  Brain, 
  BookOpen, 
  Plus, 
  Zap, 
  Target, 
  Users,
  ArrowRight,
  Sparkles,
  Code,
  Lightbulb
} from 'lucide-react';

export function HomePage() {
  const featuredCategories = [
    {
      title: 'Few-Shot Learning',
      description: 'Master the art of teaching AI with minimal examples',
      icon: Target,
      count: '12 tutorials',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Chain-of-Thought',
      description: 'Guide AI through complex reasoning processes',
      icon: Brain,
      count: '8 tutorials',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Code Generation',
      description: 'Generate and optimize code with advanced prompts',
      icon: Code,
      count: '15 tutorials',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Creative Writing',
      description: 'Unlock AI creativity for content generation',
      icon: Lightbulb,
      count: '10 tutorials',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Total Tutorials', value: '45+', icon: BookOpen },
    { label: 'Contributors', value: '12', icon: Users },
    { label: 'Categories', value: '8', icon: Zap },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection02 />

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Categories
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Dive into specialized prompt engineering techniques across different domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} p-3 mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                        {category.count}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master Prompt Engineering?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our community of AI enthusiasts, developers, and researchers. 
            Learn cutting-edge techniques, share your discoveries, and help shape the future of AI communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              <Link to="/tutorials">
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}