import React from 'react';
import { PromptCraftHeroComplete } from '@/components/ui/promptcraft-hero';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  FolderOpen, 
  FlaskConical, 
  Share2, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Code, 
  Lightbulb, 
  GraduationCap 
} from 'lucide-react';

export function HomePage() {
  return (
    <>
      {/* Hero  */}
      <PromptCraftHeroComplete
        title="Master Prompt Engineering with Expert Tutorials & Prompts"
        subtitle="Discover curated tutorials and powerful ready-to-use prompts. Learn best practices, create your own, and level-up every AI interaction."
      />

      {/* Prompt management highlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            All-in-one <span className="text-blue-400">Prompt Management</span> Toolkit
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Create, organize, test, and share prompts—without leaving PromptCraft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-start">
            <div className="p-3 bg-blue-500/20 rounded-lg mb-4">
              <Plus className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Create</h3>
            <p className="text-slate-400 text-sm mb-4">
              Craft free-form prompts or start from best-practice templates.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 mt-auto mb-4">
              <li>• Role-based prompts</li>
              <li>• Chain-of-thought templates</li>
              <li>• Few-shot learning examples</li>
            </ul>
          </div>

          {/* Organize */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-start">
            <div className="p-3 bg-green-500/20 rounded-lg mb-4">
              <FolderOpen className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Organize</h3>
            <p className="text-slate-400 text-sm mb-4">
              Tag, filter, and keep your prompt library tidy and searchable.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 mt-auto mb-4">
              <li>• Custom categories</li>
              <li>• Smart tagging system</li>
              <li>• Version tracking</li>
            </ul>
          </div>

          {/* Test */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-start">
            <div className="p-3 bg-yellow-500/20 rounded-lg mb-4">
              <FlaskConical className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Test</h3>
            <p className="text-slate-400 text-sm mb-4">
              Preview and run prompts with your own API keys—iterate instantly.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 mt-auto mb-4">
              <li>• Multiple AI providers</li>
              <li>• Custom parameters</li>
              <li>• Variable substitution</li>
            </ul>
          </div>

          {/* Share */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col items-start">
            <div className="p-3 bg-purple-500/20 rounded-lg mb-4">
              <Share2 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Share</h3>
            <p className="text-slate-400 text-sm mb-4">
              Publish publicly or keep private—collaborate when you're ready.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 mt-auto mb-4">
              <li>• Public/private visibility</li>
              <li>• Team libraries</li>
              <li>• One-click sharing</li>
            </ul>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
            <Link to="/prompts" className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Explore Prompts
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-6 text-lg">
            <Link to="/tutorials" className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Browse Tutorials
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Tutorial section */}
      <section className="bg-slate-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn <span className="text-blue-400">Prompt Engineering</span> Techniques
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Master the art of crafting effective prompts with our curated tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Tutorial type 1 */}
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="p-3 bg-blue-500/20 rounded-lg inline-block mb-4">
                  <Code className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Chain-of-Thought</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Guide AI through step-by-step reasoning to solve complex problems with better accuracy.
                </p>
                <Button asChild variant="link" className="text-blue-400 p-0">
                  <Link to="/tutorials" className="flex items-center">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tutorial type 2 */}
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="p-3 bg-green-500/20 rounded-lg inline-block mb-4">
                  <Lightbulb className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Few-Shot Learning</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Provide examples to help AI understand patterns and produce consistent outputs.
                </p>
                <Button asChild variant="link" className="text-blue-400 p-0">
                  <Link to="/tutorials" className="flex items-center">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tutorial type 3 */}
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="p-3 bg-purple-500/20 rounded-lg inline-block mb-4">
                  <GraduationCap className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Role-Based Prompting</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Define specific roles for AI to adopt, leading to more focused and relevant responses.
                </p>
                <Button asChild variant="link" className="text-blue-400 p-0">
                  <Link to="/tutorials" className="flex items-center">
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/tutorials">
                View All Tutorials
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
