import React, { useState, useRef, useEffect } from 'react';
import { FieldProps } from 'formik'
import { ChevronDownIcon, MagnifyingGlassIcon, Pencil2Icon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Button, IconButton, Spinner, TextField } from '@radix-ui/themes';

import { SkeletonLoaders } from '@components/SearchableSelect/SkeletonLoaders'
import { LoadingMessage } from '@components/SearchableSelect/LoadingMessage'
import { NoResults } from '@components/SearchableSelect/NoResults'
import OptionsList from '@components/SearchableSelect/OptionsList'
import { BaseOption } from '@components/SearchableSelect/types'
import { ModalUpdate } from '@components/SearchableSelect/ModalUpdate'
import { FormFieldFeedback } from '@components/FormFieldFeedback/FormFieldFeedback'
import { QueryFn, QueryFnArgs } from '@/types/QueryFn'

interface SearchableSelectProps<T> extends FieldProps {
  label: string;
  options: T[];
  setFieldValue: (value: T) => void;
  disabled?: boolean;
  isLoading?: boolean;
  onValueChange?: (value: BaseOption | null) => void; // Custom callback for value changes
  onReload?: () => void;
  isReloading?: boolean;
  createQueryFn: QueryFnArgs;
  updateQueryFn: QueryFnArgs;
  deleteQueryFn: QueryFn;
}

export function SearchableSelect<T extends BaseOption>({ field, form, label, options, disabled = false, isLoading = false, onValueChange, onReload, isReloading, createQueryFn, updateQueryFn, deleteQueryFn }: SearchableSelectProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const createFn = createQueryFn ? 'fn' in createQueryFn ? createQueryFn.fn : createQueryFn : undefined;
  const updateFn = updateQueryFn ? 'fn' in updateQueryFn ? updateQueryFn.fn : updateQueryFn : undefined;

  const isError = form.touched[field.name] && form.errors[field.name];
  /**
   * Filter options based on search term
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const filteredOptions = options?.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handle option selection
   * @param value
   */
  const handleSelect = async (value: BaseOption) => {
    await form.setFieldValue(field.name, value); // Update Formik field value
    await form.setFieldTouched(field.name, true);
    setHighlightedIndex(options.findIndex((option) => option.id === value.id));
    setIsDropdownOpen(false);
    setSearchTerm('');
    if (onValueChange) onValueChange(value); // Trigger additional onValueChange callback
  };

  /**
   * Toggle dropdown visibility
   */
  const toggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  /**
   * Focus search input when dropdown is opened
   */
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  /**
   * Close dropdown when clicked outside
   */
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isDropdownOpen) {
          setIsDropdownOpen(false); // Close dropdown if clicked outside
          form.setFieldTouched(field.name, true);
          field.onBlur({ target: { name: field.name, value: field.value } });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, field, isDropdownOpen]);

  /**
   * Keyboard navigation
   */
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isDropdownOpen) return;

      switch (event.key) {
        case "ArrowDown":
          setHighlightedIndex((prevIndex) =>
            prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
          );
          event.preventDefault();
          break;
        case "ArrowUp":
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
          );
          event.preventDefault();
          break;
        case "Enter":
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          event.preventDefault();
          break;
        case "Escape":
          setIsDropdownOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDropdownOpen, highlightedIndex, filteredOptions]);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    if (field.value && options?.length > 0) {
      setHighlightedIndex(options.findIndex((option) => option.id === field.value.id));
    } else {
      setHighlightedIndex(-1);
    }
  }, [field.value?.id, options?.length]);

  const openModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
    setInputValue(field.value?.name || '');
  };

  const closeModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputValue.length > 0) {
      if (searchTerm && createFn) {
        const args = (searchTerm && 'args' in createQueryFn) ? createQueryFn.args : {};
        createFn.mutateAsync({ id: String(field.value.id), name: inputValue, ...args }).then(async (data) => {
          await form.setFieldValue(field.name, { ...field.value, name: inputValue });
          setIsModalOpen(false);
        });
      }
    }
  };

  const handleModalDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    deleteQueryFn
      .mutateAsync({ id: String(field.value.id) })
      .then(async () => {
        setIsModalOpen(false);

        await form.setFieldValue(field.name, null); // Update Formik field value
        await form.setFieldTouched(field.name, true);
        setHighlightedIndex(-1);
        setIsDropdownOpen(false);
        setSearchTerm('');
        if (onValueChange) onValueChange(null); // Trigger additional onValueChange callback
      });
  }

  return (
    <div ref={dropdownRef}>
      <label htmlFor={field.name} className="block mb-1 text-[var(--gray-7)]">{label}</label>
      <div className="relative flex items-center gap-2">
        <div
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-controls={`${field.name}-listbox`}
          className={`flex items-center justify-between px-4 py-2 bg-white dark:bg-[var(--gray-1)] border rounded-lg border-[var(--gray-7)]
          ${disabled || isLoading ? 'cursor-not-allowed' : 'hover:bg-[var(--gray-2)] cursor-pointer'}
          ${disabled || isLoading ? 'opacity-50' : ''} focus:outline-none w-full`}
        >
          {isLoading && <span>Loading...</span>}
          {!isLoading && <span>{field.value?.name || 'Select an option'}</span>}
          {isLoading ? (<Spinner />) : <ChevronDownIcon className="ml-2 text-gray-500" />}
        </div>

        {!disabled && field.value?.name && (updateFn || deleteQueryFn) && (
          <IconButton size='3' variant="soft" onClick={openModal}>
            <Pencil2Icon />
          </IconButton>
        )}

        {isDropdownOpen && (
          <div
            id={`${field.name}-listbox`}
            role="listbox"
            className="absolute bg-[var(--gray-1)] rounded-lg shadow-lg w-full border border-[var(--gray-7)] z-10 top-0 left-0 right-0"
          >
            <div className="p-2">
              <TextField.Root
                size='2'
                value={searchTerm}
                ref={searchInputRef}
                placeholder={isReloading ? 'Reloading...' : 'Search...'}
                disabled={isReloading}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-md focus:ring"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
                {onReload && (
                  <TextField.Slot>
                      <Button
                        variant='ghost'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onReload()
                        }}>
                        <ReloadIcon height="16" width="16" />
                      </Button>
                  </TextField.Slot>
                )}
              </TextField.Root>
            </div>

            <div className="max-h-48 overflow-y-auto">
              {isReloading ? (
                <SkeletonLoaders />
              ) : isLoading ? (
                <LoadingMessage />
              ) : filteredOptions?.length > 0 ? (
                <OptionsList
                  filteredOptions={filteredOptions}
                  ref={optionRefs}
                  highlightedIndex={highlightedIndex}
                  handleSelect={handleSelect}
                />
              ) : (
                <NoResults
                  visible={searchTerm.length > 0 && !!createFn}
                  isLoading={createFn?.isPending}
                  onCreateClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    if (searchTerm && createFn) {
                      const args = (searchTerm && 'args' in createQueryFn) ? createQueryFn.args : {};
                      createFn.mutate({ name: searchTerm, ...args });
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {isError && <FormFieldFeedback>{String(isError)}</FormFieldFeedback>}

      {isModalOpen && updateFn &&(
        <ModalUpdate
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleModalSubmit}
          onDelete={handleModalDelete}
          onClose={closeModal}
          isSubmitting={updateFn.isPending}
          isDeleting={deleteQueryFn.isPending}
        />
      )}
    </div>
  )
}

export default SearchableSelect;
