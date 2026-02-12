/**
 * SearchBar Component
 * Search functionality for hero names and metadata
 * Living Memorial Theme - Clean, accessible search
 */

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by name, rank, or unit...',
  totalResults,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <div
        className={`
          relative flex items-center gap-3 rounded-lg border-2 transition-all duration-200
          ${
            isFocused
              ? 'border-amber-600 bg-white shadow-md shadow-amber-900/10'
              : 'border-amber-100 bg-white'
          }
        `}
      >
        <Search
          size={20}
          className={`ml-3 transition-colors ${
            isFocused ? 'text-amber-600' : 'text-amber-700'
          }`}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 text-amber-900 placeholder-amber-400 outline-none"
          aria-label="Search photos"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="mr-2 rounded p-1 text-amber-600 transition-colors hover:bg-amber-50"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results counter */}
      {value && totalResults !== undefined && (
        <p className="mt-2 text-sm text-amber-700">
          {totalResults === 0
            ? 'No results found'
            : `Found ${totalResults} ${totalResults === 1 ? 'person' : 'people'}`}
        </p>
      )}
    </div>
  );
}
