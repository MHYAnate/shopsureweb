'use client';

import React from 'react';
import { NIGERIA_STATES } from '@/lib/utils/constants';
import { MapPin } from 'lucide-react';

interface StateSelectorProps {
  selectedState?: string;
  onStateSelect: (state: string) => void;
}

export function StateSelector({ selectedState, onStateSelect }: StateSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      <button
        onClick={() => onStateSelect('')}
        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
          !selectedState
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All States
      </button>
      {NIGERIA_STATES.map((state) => (
        <button
          key={state}
          onClick={() => onStateSelect(state)}
          className={`p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
            selectedState === state
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <MapPin className="h-3 w-3" />
          {state}
        </button>
      ))}
    </div>
  );
}