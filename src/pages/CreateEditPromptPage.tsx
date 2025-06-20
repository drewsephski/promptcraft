import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';

export function CreateEditPromptPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-white"
        >
          <Link to="/prompts">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Prompts
          </Link>
        </Button>
      </div>

      <div className="text-center py-20">
        <Construction className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-4">
          {isEditMode ? 'Edit Prompt Page' : 'Create Prompt Page'} Coming Soon
        </h1>
        <p className="text-slate-400 mb-6">
          This page will provide a comprehensive form for creating and editing prompts with templates, 
          variable management, and parameter configuration.
        </p>
        {isEditMode && (
          <p className="text-slate-500 text-sm">
            Edit mode for prompt ID: {id}
          </p>
        )}
      </div>
    </div>
  );
}
