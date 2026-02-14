import { translations } from '@/lib/translations';

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-4 py-12 text-center">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-amber-900">
          {translations.emptyState.title}
        </h3>
        <p className="text-amber-700">"{searchQuery}" üçün nəticə yoxdur.</p>
      </div>

      <button
        onClick={onClear}
        className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:bg-amber-700"
      >
        {translations.emptyState.clearButton}
      </button>
    </div>
  );
}
