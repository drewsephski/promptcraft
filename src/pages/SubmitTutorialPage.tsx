import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Plus, X, Send, AlertCircle } from 'lucide-react';

export function SubmitTutorialPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    difficulty: '',
    githubUrl: '',
    tags: [] as string[],
  });
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'Chain-of-Thought',
    'Few-Shot Learning',
    'Code Generation',
    'Creative Writing',
    'Role-Playing',
    'Classification',
    'Summarization',
    'Translation',
  ];

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.difficulty) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would submit to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: 'Tutorial Submitted!',
        description: 'Your tutorial has been submitted for review. It will be published once approved.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        difficulty: '',
        githubUrl: '',
        tags: [],
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit tutorial. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
          <Plus className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">Contribute</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Submit a <span className="text-blue-400">Tutorial</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Share your prompt engineering knowledge with the community. Help others learn and grow.
        </p>
      </div>

      {!user && (
        <Card className="mb-8 bg-amber-500/10 border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-400">
              <AlertCircle className="h-5 w-5 mr-2" />
              Authentication Required
            </CardTitle>
            <CardDescription className="text-amber-300/80">
              You need to be signed in to submit tutorials. This helps us maintain quality and prevent spam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-slate-800/30 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Tutorial Details</CardTitle>
          <CardDescription className="text-slate-400">
            Provide detailed information about your prompt engineering tutorial.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">
                Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Advanced Chain-of-Thought Prompting Techniques"
                className="bg-slate-800 border-slate-600 text-white"
                disabled={!user}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">
                Description <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide a compelling summary of what your tutorial covers..."
                className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
                disabled={!user}
                required
              />
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">
                  Category <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  disabled={!user}
                  required
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-slate-300">
                  Difficulty <span className="text-red-400">*</span>
                </Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  disabled={!user}
                  required
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="beginner" className="text-white">Beginner</SelectItem>
                    <SelectItem value="intermediate" className="text-white">Intermediate</SelectItem>
                    <SelectItem value="advanced" className="text-white">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-slate-300">
                GitHub URL (Optional)
              </Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repository"
                className="bg-slate-800 border-slate-600 text-white"
                disabled={!user}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-slate-300">
                Tags
              </Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="bg-slate-800 border-slate-600 text-white"
                  disabled={!user}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  disabled={!user}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-blue-600 text-white pr-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                        disabled={!user}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-300">
                Tutorial Content <span className="text-red-400">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your tutorial content in Markdown format..."
                className="bg-slate-800 border-slate-600 text-white min-h-[300px] font-mono text-sm"
                disabled={!user}
                required
              />
              <p className="text-sm text-slate-400">
                You can use Markdown formatting. Include code examples, step-by-step instructions, and practical examples.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !user}
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Tutorial
                </>
              )}
            </Button>

            {user && (
              <p className="text-sm text-slate-400 text-center">
                Your tutorial will be reviewed before publication to ensure quality and relevance.
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}