import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isBlue?: boolean;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = '選択してください',
  className = '',
  isBlue = true,
  disabled = false,
}: SearchableSelectProps) {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const selectedOption = options.find(option => option.value === value);

  const baseInputClass = "w-full border-2 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none transition duration-150 ease-in-out";
  const colorClass = isBlue 
    ? "border-blue-100 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-200"
    : "border-green-100 focus:ring-green-500 focus:border-green-500 hover:border-green-200";
  const disabledClass = disabled ? "bg-gray-50 border-gray-200 text-gray-500" : "bg-white";

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled}>
      <div className={`relative ${className}`}>
        <div className="relative">
          <Combobox.Input
            className={`${baseInputClass} ${colorClass} ${disabledClass}`}
            displayValue={(value: string) => 
              selectedOption ? selectedOption.label : ''
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown
              className={`h-4 w-4 ${
                disabled ? 'text-gray-400' : isBlue ? 'text-blue-400' : 'text-green-400'
              }`}
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        {!disabled && (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredOptions.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  該当する項目がありません
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active 
                          ? isBlue ? 'bg-blue-50 text-blue-900' : 'bg-green-50 text-green-900'
                          : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active 
                                ? isBlue ? 'text-blue-600' : 'text-green-600'
                                : isBlue ? 'text-blue-500' : 'text-green-500'
                            }`}
                          >
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        )}
      </div>
    </Combobox>
  );
}