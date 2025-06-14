import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tutorial } from '@/lib/supabase';
import { ExternalLink, Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={difficultyColors[tutorial.difficulty]}>
                {tutorial.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                {tutorial.category}
              </Badge>
            </div>
            <CardTitle className="text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {tutorial.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-slate-400 line-clamp-3">
          {tutorial.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Tags */}
          {tutorial.tags && tutorial.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tutorial.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                >
                  {tag}
                </Badge>
              ))}
              {tutorial.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300">
                  +{tutorial.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span className="truncate">{tutorial.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(tutorial.created_at), { addSuffix: true })}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Link to={`/tutorial/${tutorial.id}`}>
                View Tutorial
              </Link>
            </Button>
            {tutorial.github_url && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <a href={tutorial.github_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}