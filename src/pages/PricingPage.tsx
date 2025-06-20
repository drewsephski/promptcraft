import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, ArrowLeft, CreditCard, Sparkles } from 'lucide-react';

export function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
          <CreditCard className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">Pricing Plans</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Choose Your <span className="text-blue-400">Plan</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Unlock the full potential of PromptCraft with our flexible subscription options.
        </p>
      </div>

      {/* Coming Soon Content */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 max-w-3xl mx-auto">
        <CardContent className="pt-12 pb-12 px-6 text-center">
          <Construction className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Pricing Plans Coming Soon
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
            We're finalizing our subscription tiers to provide you with the best value.
            Check back soon for our Free, Pro, and Teams plans.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
              <p className="text-slate-400 text-sm">
                Perfect for getting started with prompt engineering
              </p>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-4 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs py-1 px-2 rounded-full">
                  Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
              <p className="text-slate-400 text-sm">
                For individuals who need more power and privacy
              </p>
            </div>
            
            <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Teams</h3>
              <p className="text-slate-400 text-sm">
                For teams that need to collaborate on prompts
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link to="/prompts">
                <Sparkles className="h-4 w-4 mr-2" />
                Explore Prompts
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Newsletter Signup */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Get Notified When Pricing Launches
        </h3>
        <p className="text-slate-400 mb-6">
          Be the first to know when our subscription plans are available
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Join Waitlist
        </Button>
      </div>
    </div>
  );
}
