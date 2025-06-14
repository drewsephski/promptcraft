import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tutorial } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, 
  Copy, 
  ExternalLink, 
  Clock, 
  User, 
  Check,
  Loader2,
  BookOpen
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function TutorialDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Mock tutorial data for development
  const mockTutorials: { [key: string]: Tutorial } = {
    '1': {
      id: '1',
      title: 'Chain-of-Thought Prompting for Complex Reasoning',
      description: 'Learn how to guide AI models through step-by-step reasoning processes to solve complex problems more effectively.',
      content: `# Chain-of-Thought Prompting for Complex Reasoning

Chain-of-thought (CoT) prompting is a powerful technique that encourages large language models to break down complex problems into intermediate reasoning steps, leading to more accurate and reliable outputs.

## What is Chain-of-Thought Prompting?

Chain-of-thought prompting involves explicitly asking the model to show its reasoning process step by step, rather than jumping directly to a conclusion. This approach mimics human problem-solving by breaking complex tasks into manageable parts.

## Basic Example

**Standard Prompt:**
\`\`\`
What is 15% of 240?
\`\`\`

**Chain-of-Thought Prompt:**
\`\`\`
What is 15% of 240? Let's think step by step.

Step 1: Convert 15% to decimal form: 15% = 0.15
Step 2: Multiply 240 by 0.15: 240 × 0.15 = 36
Therefore, 15% of 240 is 36.
\`\`\`

## Advanced Techniques

### 1. Multi-Step Problem Solving

For complex mathematical or logical problems:

\`\`\`
Solve this problem step by step:
If a train travels 120 miles in 2 hours, and then travels 180 miles in 3 hours, what is the average speed for the entire journey?

Step 1: Calculate total distance
Step 2: Calculate total time
Step 3: Apply average speed formula
Step 4: Provide final answer
\`\`\`

### 2. Reasoning with Context

\`\`\`
Given the following information, determine the best course of action:
- Budget: $5000
- Goal: Increase website traffic by 50%
- Timeline: 3 months
- Current traffic: 1000 visitors/month

Let me analyze this systematically:
1. First, I'll identify the target traffic increase
2. Then, I'll evaluate cost-effective strategies within budget
3. Finally, I'll create a timeline that fits the 3-month constraint
\`\`\`

## Best Practices

1. **Use explicit instructions**: Include phrases like "Let's think step by step" or "Break this down:"
2. **Structure the reasoning**: Use numbered steps or bullet points
3. **Show intermediate calculations**: Don't skip steps in mathematical problems
4. **Verify the logic**: Ask the model to double-check its reasoning
5. **Combine with examples**: Provide a worked example before the actual problem

## Common Pitfalls

- **Rushing to conclusions**: Always encourage step-by-step thinking
- **Skipping verification**: Include a final review step
- **Overcomplicating simple problems**: Use CoT for genuinely complex tasks

## Conclusion

Chain-of-thought prompting significantly improves the reliability and transparency of AI reasoning, making it an essential technique for complex problem-solving scenarios.`,
      category: 'Chain-of-Thought',
      difficulty: 'intermediate',
      github_url: 'https://github.com/example/cot-prompting',
      author_id: '1',
      author_name: 'Alex Johnson',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      is_approved: true,
      tags: ['reasoning', 'problem-solving', 'step-by-step']
    }
  };

  useEffect(() => {
    const loadTutorial = async () => {
      if (!id) return;
      
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundTutorial = mockTutorials[id];
      setTutorial(foundTutorial || null);
      setLoading(false);
    };

    loadTutorial();
  }, [id]);

  const copyContent = async () => {
    if (!tutorial) return;
    
    try {
      await navigator.clipboard.writeText(tutorial.content);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Tutorial content copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy content.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading tutorial...</p>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Tutorial Not Found</h1>
          <p className="text-slate-400 mb-6">The tutorial you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/tutorials">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tutorials
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6 text-slate-300 hover:text-white">
        <Link to="/tutorials">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tutorials
        </Link>
      </Button>

      {/* Tutorial Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline" className={difficultyColors[tutorial.difficulty]}>
            {tutorial.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            {tutorial.category}
          </Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {tutorial.title}
        </h1>
        
        <p className="text-xl text-slate-300 mb-6">
          {tutorial.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{tutorial.author_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(tutorial.created_at), { addSuffix: true })}</span>
          </div>
        </div>

        {/* Tags */}
        {tutorial.tags && tutorial.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tutorial.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-700/50 text-slate-300 hover:bg-slate-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={copyContent}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Content
              </>
            )}
          </Button>
          
          {tutorial.github_url && (
            <Button
              asChild
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <a href={tutorial.github_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Tutorial Content */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Tutorial Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert prose-blue max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({ node, inline, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <pre className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto border border-slate-600">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className="bg-slate-700/50 px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => children,
                h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-medium text-white mb-2 mt-4">{children}</h3>,
                p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="text-slate-300 mb-4 list-disc list-inside space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="text-slate-300 mb-4 list-decimal list-inside space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-slate-300">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-400 my-4">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              }}
            >
              {tutorial.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Related Tutorials Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Related Tutorials</h2>
        <div className="text-center py-8 text-slate-400">
          <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Related tutorials will be shown here based on category and tags.</p>
        </div>
      </div>
    </div>
  );
}