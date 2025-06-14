import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Users, 
  Target, 
  Lightbulb, 
  ExternalLink, 
  Github, 
  Heart,
  BookOpen,
  Code,
  Sparkles,
  Plus
} from 'lucide-react';

export function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Curated Tutorials',
      description: 'Hand-picked, high-quality prompt engineering tutorials from experts in the field.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by and for the prompt engineering community. Share knowledge and learn together.',
    },
    {
      icon: Code,
      title: 'Practical Examples',
      description: 'Real-world examples and code snippets you can immediately apply to your projects.',
    },
    {
      icon: Target,
      title: 'Skill Progression',
      description: 'Tutorials organized by difficulty level to support your learning journey from beginner to expert.',
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Research Lead',
      bio: 'PhD in Machine Learning, specialized in natural language processing and prompt optimization.',
    },
    {
      name: 'Alex Rodriguez',
      role: 'Developer Advocate',
      bio: 'Full-stack developer with expertise in AI integration and developer education.',
    },
    {
      name: 'Emily Park',
      role: 'Content Curator',
      bio: 'Technical writer and prompt engineer with 5+ years of experience in AI content creation.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
          <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">About Our Mission</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Democratizing <span className="text-blue-400">Prompt Engineering</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          PromptCraft Library exists to make advanced prompt engineering techniques accessible to everyone. 
          We believe that effective AI communication is a skill that can be learned, shared, and improved through community collaboration.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-blue-400" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            To create the most comprehensive, accessible, and practical resource for learning prompt engineering. 
            We bridge the gap between theoretical AI research and practical application, empowering developers, 
            researchers, and enthusiasts to harness the full potential of large language models.
          </p>
          <p className="text-slate-400">
            Whether you're building the next breakthrough AI application or simply trying to get better results 
            from ChatGPT, our curated tutorials and community-driven content will help you master the art of AI communication.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Inspiration */}
      <Card className="mb-16 bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Heart className="h-6 w-6 mr-3 text-red-400" />
            Inspired by Excellence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300 leading-relaxed">
            This project draws inspiration from the outstanding work of{' '}
            <a 
              href="https://github.com/NirDiamant/Prompt_Engineering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              NirDiamant's Prompt Engineering repository
            </a>
            , which has become an invaluable resource for the AI community. Our platform aims to make this wealth of knowledge 
            even more accessible through better organization, search capabilities, and community features.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Community Driven
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              Open Source Inspired
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              Quality Focused
            </Badge>
          </div>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
            <a href="https://github.com/NirDiamant/Prompt_Engineering" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View Original Repository
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle className="text-white">{member.name}</CardTitle>
                <CardDescription className="text-blue-400 font-medium">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contributing */}
      <Card className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-cyan-600/20 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Users className="h-6 w-6 mr-3 text-blue-400" />
            Join Our Community
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">
            Help us build the most comprehensive prompt engineering resource
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-300">
            We welcome contributions from prompt engineers, AI researchers, developers, and enthusiasts. 
            Whether you want to submit tutorials, improve existing content, or help with platform development, 
            there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Submit a Tutorial
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              <ExternalLink className="mr-2 h-4 w-4" />
              Join Our Discord
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
        <p className="text-slate-400 mb-6">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
            <ExternalLink className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}