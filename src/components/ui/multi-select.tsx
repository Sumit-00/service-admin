import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const multiSelectVariants = cva(
  'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110',
  {
    variants: {
      variant: {
        default: 'border-foreground/10 drop-shadow-md text-black bg-card hover:bg-card/80',
        secondary: 'border-foreground/10 bg-white text-blue hover:bg-white/80',
        destructive:
          'border-transparent bg-red-hover text-red-hover-foreground hover:bg-red-hover/80',
        inverted: 'inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// TODO: to fix typescript
export interface MultiSelectFormFieldProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options:
    | {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
      }[]
    | any;
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  animation?: number;
  onValueChange: (value: string[]) => void;
}

const MultiSelectFormField = React.forwardRef<HTMLButtonElement, MultiSelectFormFieldProps>(
  (
    { className, variant, options, defaultValue = [], onValueChange, placeholder, ...props },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      Array.isArray(defaultValue) ? defaultValue : [defaultValue],
    );
    const selectedValuesSet = React.useRef(new Set(defaultValue));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      setSelectedValues(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        selectedValuesSet.current.delete(selectedValues[selectedValues.length - 1]);
        onValueChange([...selectedValues]);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValuesSet.current.has(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      selectedValuesSet.current = new Set(newSelectedValues);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleBadgeRemoveClick = (event: React.MouseEvent<SVGElement>, value: string) => {
      event.stopPropagation();
      toggleOption(value);
    };

    // TODO: to fix type for options
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className={cn(
              'flex h-auto min-h-10 w-full items-center justify-between rounded border bg-white p-1 hover:bg-white',
              className,
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues.map((value) => {
                    // TODO: to fix type
                    const option = options.find((o: any) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(multiSelectVariants({ variant, className }))}
                      >
                        {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                        {option?.label}
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => handleBadgeRemoveClick(event, value)}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="mx-2 h-4 cursor-pointer text-black"
                    onClick={(event) => {
                      setSelectedValues([]);
                      selectedValuesSet.current.clear();
                      onValueChange([]);
                      event.stopPropagation();
                    }}
                  />
                  <Separator orientation="vertical" className="flex h-full min-h-6" />
                  <ChevronDown className="mx-2 h-4 cursor-pointer text-black" />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span className="mx-3 text-a14 text-black">{placeholder}</span>
                <ChevronDown className="mx-2 h-4 cursor-pointer text-black" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[200px] p-0 drop-shadow-sm"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option: any) => {
                  const isSelected = selectedValuesSet.current.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: 'auto',
                        opacity: 1,
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded border border-blue',
                          isSelected ? 'bg-blue text-white' : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {option.icon && <option.icon className="mr-2 h-4 w-4 text-black" />}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={() => {
                          setSelectedValues([]);
                          selectedValuesSet.current.clear();
                          onValueChange([]);
                        }}
                        style={{
                          pointerEvents: 'auto',
                          opacity: 1,
                        }}
                        className="flex-1 cursor-pointer justify-center"
                      >
                        Clear
                      </CommandItem>
                      <Separator orientation="vertical" className="flex h-full min-h-6" />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: 'auto',
                      opacity: 1,
                    }}
                    className="flex-1 cursor-pointer justify-center"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

MultiSelectFormField.displayName = 'MultiSelectFormField';

export default MultiSelectFormField;
