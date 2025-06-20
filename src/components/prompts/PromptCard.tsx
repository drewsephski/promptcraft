import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Prompt } from '@/lib/supabase';
import { Copy, Check, ExternalLink, Clock, User, Edit, Eye, Lock, Globe } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PromptCardProps {
  prompt: Prompt;
  variant?: 'default' | 'compact';
}

export function PromptCard({ prompt, variant = 'default' }: PromptCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const isOwner = user?.id === prompt.author_id;
  
  const providerColors = {
    openai: 'bg-green-500/10 text-green-400 border-green-500/20',
    gemini: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    anthropic: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    local: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  };

  const structureTypeColors = {
    'free-form': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    'role-based': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'chain-of-thought': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'few-shot': 'bg-green-500/10 text-green-400 border-green-500/20',
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    toast({
      title: 'Prompt copied to clipboard',
      description: 'You can now paste it into your favorite AI tool.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {prompt.category}
              </Badge>
              <Badge variant="outline" className={prompt.provider ? providerColors[prompt.provider as keyof typeof providerColors] : ''}>
                {prompt.provider}
              </Badge>
            </div>
            {prompt.visibility === 'private' ? (
              <Lock className="h-4 w-4 text-purple-400" />
            ) : (
              <Globe className="h-4 w-4 text-green-400" />
            )}
          </div>
          <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors mb-1">
            {prompt.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-1 mb-2">
            {prompt.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">{prompt.model}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleCopyPrompt}
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {prompt.category}
              </Badge>
              {prompt.visibility === 'private' ? (
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  Private
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                  Public
                </Badge>
              )}
              {prompt.structure_type && (
                <Badge 
                  variant="outline" 
                  className={structureTypeColors[prompt.structure_type as keyof typeof structureTypeColors]}
                >
                  {prompt.structure_type.replace(/-/g, ' ')}
                </Badge>
              )}
            </div>
            <CardTitle className="text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {prompt.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-slate-400 line-clamp-3">
          {prompt.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Model info */}
          <div className="flex items-center gap-2 text-xs">
            <Badge 
              variant="secondary" 
              className={`${providerColors[prompt.provider as keyof typeof providerColors]} bg-opacity-20`}
            >
              {prompt.provider.charAt(0).toUpperCase() + prompt.provider.slice(1)}
            </Badge>
            <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
              {prompt.model}
            </Badge>
            <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
              v{prompt.version}
            </Badge>
          </div>
          
          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                >
                  {tag}
                </Badge>
              ))}
              {prompt.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300">
                  +{prompt.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Variables preview */}
          {prompt.content.includes('{{') && (
            <div className="bg-slate-900/50 border border-slate-700 rounded-md p-2">
              <p className="text-xs text-slate-400 mb-1">Variables:</p>
              <div className="flex flex-wrap gap-1">
                {Array.from(prompt.content.matchAll(/\{\{([^}]+)\}\}/g)).map((match, index) => (
                  <Badge key={index} className="bg-blue-900/30 text-blue-300 border-blue-700/30 text-xs">
                    {match[1]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate">{prompt.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Link to={`/prompt/${prompt.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
            
            {isOwner && (
              <Button asChild variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                <Link to={`/prompt/${prompt.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              onClick={handleCopyPrompt}
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
