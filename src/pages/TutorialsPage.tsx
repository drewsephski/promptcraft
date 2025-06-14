import React, { useState, useEffect } from 'react';
import { TutorialCard } from '@/components/tutorials/TutorialCard';
import { TutorialFilters } from '@/components/tutorials/TutorialFilters';
import { Tutorial, supabase } from '@/lib/supabase';
import { Loader2, BookOpen } from 'lucide-react';

export function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data for development
  const mockTutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Chain-of-Thought Prompting for Complex Reasoning',
      description: 'Learn how to guide AI models through step-by-step reasoning processes to solve complex problems more effectively.',
      content: '# Chain-of-Thought Prompting\n\nThis tutorial covers...',
      category: 'Chain-of-Thought',
      difficulty: 'intermediate',
      github_url: 'https://github.com/example/cot-prompting',
      author_id: '1',
      author_name: 'Alex Johnson',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      is_approved: true,
      tags: ['reasoning', 'problem-solving', 'step-by-step']
    },
    {
      id: '2',
      title: 'Few-Shot Learning with Examples',
      description: 'Master the technique of providing a few examples to teach AI models new patterns and behaviors.',
      content: '# Few-Shot Learning\n\nThis approach involves...',
      category: 'Few-Shot Learning',
      difficulty: 'beginner',
      github_url: 'https://github.com/example/few-shot',
      author_id: '2',
      author_name: 'Sarah Chen',
      created_at: '2024-01-14T15:30:00Z',
      updated_at: '2024-01-14T15:30:00Z',
      is_approved: true,
      tags: ['examples', 'learning', 'patterns']
    },
    {
      id: '3',
      title: 'Advanced Code Generation Techniques',
      description: 'Explore sophisticated prompting strategies for generating high-quality code with detailed specifications.',
      content: '# Code Generation\n\nAdvanced techniques for...',
      category: 'Code Generation',
      difficulty: 'advanced',
      github_url: 'https://github.com/example/code-gen',
      author_id: '3',
      author_name: 'Mike Rodriguez',
      created_at: '2024-01-13T09:15:00Z',
      updated_at: '2024-01-13T09:15:00Z',
      is_approved: true,
      tags: ['coding', 'programming', 'automation']
    },
    {
      id: '4',
      title: 'Creative Writing Prompts for Storytelling',
      description: 'Unlock AI creativity with prompting techniques designed for narrative generation and creative content.',
      content: '# Creative Writing\n\nTechniques for creative...',
      category: 'Creative Writing',
      difficulty: 'beginner',
      author_id: '4',
      author_name: 'Emma Davis',
      created_at: '2024-01-12T14:20:00Z',
      updated_at: '2024-01-12T14:20:00Z',
      is_approved: true,
      tags: ['creativity', 'storytelling', 'content']
    },
    {
      id: '5',
      title: 'Role-Playing and Persona Prompts',
      description: 'Learn how to create convincing AI personas and role-playing scenarios for specialized tasks.',
      content: '# Role-Playing Prompts\n\nCreating personas...',
      category: 'Role-Playing',
      difficulty: 'intermediate',
      github_url: 'https://github.com/example/role-playing',
      author_id: '5',
      author_name: 'David Kim',
      created_at: '2024-01-11T11:45:00Z',
      updated_at: '2024-01-11T11:45:00Z',
      is_approved: true,
      tags: ['persona', 'character', 'specialized']
    },
    {
      id: '6',
      title: 'Zero-Shot Classification Mastery',
      description: 'Master zero-shot classification techniques for categorizing content without prior training examples.',
      content: '# Zero-Shot Classification\n\nClassification without...',
      category: 'Classification',
      difficulty: 'advanced',
      author_id: '6',
      author_name: 'Lisa Park',
      created_at: '2024-01-10T16:00:00Z',
      updated_at: '2024-01-10T16:00:00Z',
      is_approved: true,
      tags: ['classification', 'zero-shot', 'categories']
    }
  ];

  useEffect(() => {
    // Simulate loading with mock data
    const loadTutorials = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTutorials(mockTutorials);
      setLoading(false);
    };

    loadTutorials();
  }, []);

  // Filter tutorials based on search and filters
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.author_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => tutorial.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesDifficulty && matchesTags;
  });

  // Get unique values for filters
  const availableCategories = [...new Set(tutorials.map(t => t.category))];
  const availableTags = [...new Set(tutorials.flatMap(t => t.tags))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading tutorials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
          <BookOpen className="h-4 w-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-400">Tutorial Library</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Explore <span className="text-blue-400">Prompt Engineering</span> Tutorials
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Discover curated tutorials, techniques, and best practices from the prompt engineering community.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <TutorialFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          availableCategories={availableCategories}
          availableTags={availableTags}
        />
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-slate-400">
          Showing {filteredTutorials.length} of {tutorials.length} tutorials
        </p>
      </div>

      {/* Tutorial Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map(tutorial => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No tutorials found</h3>
          <p className="text-slate-500">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}