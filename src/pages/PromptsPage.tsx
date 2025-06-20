import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Prompt, ModelProvider, PromptVisibility, PromptStructureType, supabase } from '@/lib/supabase';
import { Loader2, Sparkles, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export function PromptsPage() {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedVisibility, setSelectedVisibility] = useState<string>('all');
  const [selectedStructureType, setSelectedStructureType] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data for development
  const mockPrompts: Prompt[] = [
    {
      id: '1',
      title: 'Professional Email Writer',
      description: 'Generates professional business emails with customizable tone and length',
      content: 'You are a professional email writer. Write an email to {{recipient}} about {{subject}} with a {{tone}} tone. The email should be {{length}} in length.',
      category: 'Business',
      tags: ['email', 'professional', 'communication'],
      author_id: '1',
      author_name: 'Alex Johnson',
      created_at: '2024-05-15T10:00:00Z',
      updated_at: '2024-05-15T10:00:00Z',
      provider: 'openai',
      model: 'gpt-4o',
      parameters: {
        temperature: 0.7,
        max_tokens: 500
      },
      version: 1,
      visibility: 'public',
      structure_type: 'role-based'
    },
    {
      id: '2',
      title: 'Code Explainer',
      description: 'Explains complex code snippets step by step with examples',
      content: 'You are a coding tutor. Explain the following code snippet in simple terms:\n\n```{{language}}\n{{code}}\n```\n\nBreak down your explanation into these sections:\n1. Overview of what the code does\n2. Step-by-step explanation\n3. Key concepts used\n4. A simpler example if possible',
      category: 'Programming',
      tags: ['code', 'explanation', 'tutorial'],
      author_id: '2',
      author_name: 'Sarah Chen',
      created_at: '2024-05-14T15:30:00Z',
      updated_at: '2024-05-14T15:30:00Z',
      provider: 'gemini',
      model: 'gemini-pro-2.5',
      parameters: {
        temperature: 0.3,
        max_tokens: 1000
      },
      version: 2,
      visibility: 'public',
      structure_type: 'chain-of-thought'
    },
    {
      id: '3',
      title: 'Creative Story Generator',
      description: 'Creates imaginative stories based on provided elements and genre',
      content: 'Write a {{genre}} story that includes the following elements: {{elements}}. The story should be {{length}} words long and have a {{mood}} mood.',
      category: 'Creative',
      tags: ['story', 'creative', 'writing'],
      author_id: '3',
      author_name: 'Mike Rodriguez',
      created_at: '2024-05-13T09:15:00Z',
      updated_at: '2024-05-13T09:15:00Z',
      provider: 'anthropic',
      model: 'claude-3',
      parameters: {
        temperature: 0.9,
        max_tokens: 2000
      },
      version: 1,
      visibility: 'public',
      structure_type: 'free-form'
    },
    {
      id: '4',
      title: 'Market Research Analysis',
      description: 'Analyzes market trends and provides strategic recommendations',
      content: 'You are a market research analyst. Analyze the current trends in the {{industry}} industry, focusing on {{specific_area}}. Provide:\n\n1. An overview of key market trends\n2. Analysis of major competitors\n3. Identification of market gaps\n4. Strategic recommendations for entering or expanding in this market',
      category: 'Business',
      tags: ['market', 'analysis', 'strategy'],
      author_id: '1',
      author_name: 'Alex Johnson',
      created_at: '2024-05-12T14:20:00Z',
      updated_at: '2024-05-12T14:20:00Z',
      provider: 'openai',
      model: 'gpt-4',
      parameters: {
        temperature: 0.4,
        max_tokens: 1500
      },
      version: 3,
      visibility: 'private',
      structure_type: 'role-based'
    },
    {
      id: '5',
      title: 'Recipe Generator',
      description: 'Creates detailed recipes based on available ingredients and dietary restrictions',
      content: 'You are a professional chef. Create a recipe using the following ingredients: {{ingredients}}. The recipe should be suitable for someone with {{dietary_restrictions}} dietary restrictions. Include preparation time, cooking time, serving size, ingredients list, step-by-step instructions, and nutritional information.',
      category: 'Food',
      tags: ['recipe', 'cooking', 'food'],
      author_id: '4',
      author_name: 'Emma Davis',
      created_at: '2024-05-11T11:45:00Z',
      updated_at: '2024-05-11T11:45:00Z',
      provider: 'local',
      model: 'ollama',
      parameters: {
        temperature: 0.6,
        max_tokens: 800
      },
      version: 1,
      visibility: 'public',
      structure_type: 'role-based'
    },
    {
      id: '6',
      title: 'Learning Concepts with Examples',
      description: 'Explains complex concepts with multiple examples using few-shot learning',
      content: 'I want you to explain {{concept}} using the few-shot learning approach.\n\nExample 1: {{example1}}\nExplanation 1: {{explanation1}}\n\nExample 2: {{example2}}\nExplanation 2: {{explanation2}}\n\nNow explain {{target_concept}} following the same pattern.',
      category: 'Education',
      tags: ['learning', 'examples', 'education'],
      author_id: '2',
      author_name: 'Sarah Chen',
      created_at: '2024-05-10T16:00:00Z',
      updated_at: '2024-05-10T16:00:00Z',
      provider: 'gemini',
      model: 'gemini-flash-2.5',
      parameters: {
        temperature: 0.5,
        max_tokens: 1200
      },
      version: 1,
      visibility: 'public',
      structure_type: 'few-shot'
    }
  ];

  useEffect(() => {
    // Simulate loading with mock data
    const loadPrompts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrompts(mockPrompts);
      setLoading(false);
    };

    loadPrompts();
  }, []);

  // Filter prompts based on search and filters
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.author_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesProvider = selectedProvider === 'all' || prompt.provider === selectedProvider;
    const matchesVisibility = selectedVisibility === 'all' || prompt.visibility === selectedVisibility;
    const matchesStructureType = selectedStructureType === 'all' || prompt.structure_type === selectedStructureType;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags.includes(tag));

    // For private prompts, only show if they belong to the current user or if the user has premium access
    const canViewPrivate = prompt.visibility === 'public' || 
                          (prompt.visibility === 'private' && prompt.author_id === user?.id);

    return matchesSearch && matchesCategory && matchesProvider && 
           matchesVisibility && matchesStructureType && matchesTags && canViewPrivate;
  });

  // Get unique values for filters
  const availableCategories = [...new Set(prompts.map(p => p.category))];
  const availableTags = [...new Set(prompts.flatMap(p => p.tags))];
  const availableProviders = [...new Set(prompts.map(p => p.provider))];
  const availableStructureTypes = [...new Set(prompts.map(p => p.structure_type).filter(Boolean))];

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading prompts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
          <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">Prompt Library</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Discover <span className="text-blue-400">AI Prompts</span> That Work
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Browse, create, and share powerful prompts for your favorite AI models. Use templates or create your own.
        </p>
      </div>

      {/* Quick explanation */}
      <div className="mb-10 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-3">What are AI Prompts?</h2>
        <p className="text-slate-300 mb-4">
          Prompts are instructions given to AI models that guide their responses. A well-crafted prompt can dramatically improve the quality and relevance of AI-generated content.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-blue-400 mb-2">Role-Based Prompts</h3>
            <p className="text-slate-400 text-sm">Define a specific role for the AI to adopt, like "You are a professional copywriter..."</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-blue-400 mb-2">Chain-of-Thought</h3>
            <p className="text-slate-400 text-sm">Guide the AI through a step-by-step reasoning process to solve complex problems.</p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold text-blue-400 mb-2">Few-Shot Learning</h3>
            <p className="text-slate-400 text-sm">Provide examples of desired inputs and outputs to help the AI understand patterns.</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-slate-300">
            <strong>Pro Tip:</strong> Look for prompts with <span className="text-blue-400">{{variables}}</span> that you can customize for your specific needs.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="w-full sm:w-auto">
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
          <Link to="/prompts/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Prompt
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-slate-400" />
          <h3 className="font-medium text-white">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category filter */}
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white">All Categories</SelectItem>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Provider filter */}
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Provider</label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white">All Providers</SelectItem>
                {availableProviders.map((provider) => (
                  <SelectItem key={provider} value={provider} className="text-white">
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Visibility filter */}
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Visibility</label>
            <Select value={selectedVisibility} onValueChange={setSelectedVisibility}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white">All</SelectItem>
                <SelectItem value="public" className="text-white">Public</SelectItem>
                {user && <SelectItem value="private" className="text-white">Private</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          {/* Structure type filter */}
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Structure</label>
            <Select value={selectedStructureType} onValueChange={setSelectedStructureType}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="Select structure" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all" className="text-white">All Structures</SelectItem>
                <SelectItem value="free-form" className="text-white">Free-form</SelectItem>
                <SelectItem value="role-based" className="text-white">Role-based</SelectItem>
                <SelectItem value="chain-of-thought" className="text-white">Chain-of-thought</SelectItem>
                <SelectItem value="few-shot" className="text-white">Few-shot</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4">
          <label className="text-sm text-slate-400 mb-1 block">Popular Tags</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {availableTags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                }`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-slate-400">
          Showing {filteredPrompts.length} of {prompts.length} prompts
        </p>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="mb-6">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        {/* Grid View */}
        <TabsContent value="grid">
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map(prompt => (
                <Card key={prompt.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {prompt.category}
                          </Badge>
                          <Badge variant="outline" className={prompt.visibility === 'private' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}>
                            {prompt.visibility}
                          </Badge>
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
                        <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                          {prompt.provider.charAt(0).toUpperCase() + prompt.provider.slice(1)}
                        </Badge>
                        <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                          {prompt.model}
                        </Badge>
                        {prompt.structure_type && (
                          <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                            {prompt.structure_type.replace(/-/g, ' ')}
                          </Badge>
                        )}
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

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="text-xs">
                          By {prompt.author_name}
                        </div>
                        <div className="text-xs">
                          {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <Link to={`/prompt/${prompt.id}`}>
                            View Prompt
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No prompts found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </TabsContent>
        
        {/* List View */}
        <TabsContent value="list">
          {filteredPrompts.length > 0 ? (
            <div className="space-y-4">
              {filteredPrompts.map(prompt => (
                <Card key={prompt.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/80 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {prompt.category}
                        </Badge>
                        <Badge variant="outline" className={prompt.visibility === 'private' ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}>
                          {prompt.visibility}
                        </Badge>
                        {prompt.structure_type && (
                          <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                            {prompt.structure_type.replace(/-/g, ' ')}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                        {prompt.title}
                      </h3>
                      <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                        {prompt.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {prompt.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-slate-700/50 text-slate-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-xs text-slate-500">
                        <span>{prompt.provider.charAt(0).toUpperCase() + prompt.provider.slice(1)} • {prompt.model}</span>
                        <span className="mx-2">•</span>
                        <span>By {prompt.author_name}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                    <div className="p-4 md:border-l border-slate-700 flex items-center">
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Link to={`/prompt/${prompt.id}`}>
                          View Prompt
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">No prompts found</h3>
              <p className="text-slate-500">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
