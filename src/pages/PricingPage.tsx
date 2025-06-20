import React from react;
import { Button } from @/components/ui/button;
import { Construction, ArrowLeft } from lucide-react;
import { Link } from react-router-dom;

export function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center py-20">
        <Construction className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Pricing Page Coming Soon
        </h1>
        <p className="text-slate-400 mb-6">
          This page will showcase our subscription tiers: Free, Pro, and Teams with detailed feature comparisons.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
