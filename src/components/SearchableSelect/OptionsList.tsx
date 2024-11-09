import { forwardRef, MutableRefObject, ForwardedRef } from 'react';
import { BaseOption } from '@components/SearchableSelect/types'

interface OptionsListProps<T> {
  filteredOptions: T[];
  highlightedIndex: number;
  handleSelect: (value: T) => Promise<void>;
}

function OptionsList<T extends BaseOption>(
  { filteredOptions, highlightedIndex, handleSelect }: OptionsListProps<T>,
  ref: ForwardedRef<(HTMLDivElement | null)[]>
) {
  const optionRefs = Array(filteredOptions.length).fill(null) as (HTMLDivElement | null)[];

  return filteredOptions.map((option, index) => (
    <div
      key={option.id}
      id={`option-${option.id}`}
      ref={(el) => {
        optionRefs[index] = el;
        if (typeof ref === 'function') {
          // Pass the updated refs array to the function ref
          ref(optionRefs);
        } else if (ref && 'current' in ref) {
          // Update the ref's current property for MutableRefObject
          ref.current = optionRefs;
        }
      }}
      role="option"
      aria-selected={highlightedIndex === index}
      onClick={() => handleSelect(option)}
      className={`flex items-center px-3 py-2 cursor-pointer ${
        index === highlightedIndex
          ? 'bg-[var(--accent-9)] text-[var(--accent-contrast)]'
          : 'text-[var(--gray-12)] hover:bg-[var(--accent-9)] hover:text-[var(--accent-contrast)]'
      }`}
    >
      {option.name}
    </div>
  ));
}

export default forwardRef(OptionsList);
