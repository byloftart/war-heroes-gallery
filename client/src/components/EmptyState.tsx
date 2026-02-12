/**
 * EmptyState Component
 * Displayed when search returns no results
 * Living Memorial Theme - Respectful, helpful messaging
 */

import { translations } from '@/lib/translations';

interface EmptyStateProps {
  searchQuery: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 px-4 text-center">
      {/* Illustration */}
      <div className="h-32 w-32 rounded-full bg-amber-50 flex items-center justify-center">
        <img
          src="https://private-us-east-1.manuscdn.com/sessionFile/nRVQmU80SmnqDYPjtJEcyp/sandbox/1W5LoRDDuuKVM95GXKcytt-img-3_1770891158000_na1fn_ZW1wdHktc3RhdGUtaWxsdXN0cmF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80"
          alt="Nəticə yoxdur"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-amber-900">
          {translations.emptyState.title}
        </h3>
        <p className="text-amber-700">
          "{searchQuery}" axtarışına uyğun heç kim tapılmadı.
        </p>
      </div>

      {/* Action */}
      <button
        onClick={onClear}
        className="
          rounded-lg bg-amber-600 px-6 py-2 font-medium text-white
          transition-all duration-200
          hover:bg-amber-700 hover:shadow-md hover:shadow-amber-900/20
          active:scale-95
        "
      >
        {translations.emptyState.clearButton}
      </button>
    </div>
  );
}
