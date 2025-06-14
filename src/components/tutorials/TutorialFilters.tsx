import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface TutorialFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableCategories: string[];
  availableTags: string[];
}

export function TutorialFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTags,
  setSelectedTags,
  availableCategories,
  availableTags,
}: TutorialFiltersProps) {
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedDifficulty !== 'all' || 
    selectedTags.length > 0;

  return (
    <div className="space-y-6 bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Difficulty</label>
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all" className="text-white">All Levels</SelectItem>
              <SelectItem value="beginner" className="text-white">Beginner</SelectItem>
              <SelectItem value="intermediate" className="text-white">Intermediate</SelectItem>
              <SelectItem value="advanced" className="text-white">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300">Tags</label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Selected Tags</label>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                className="bg-blue-600 text-white pr-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          onClick={clearFilters}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}