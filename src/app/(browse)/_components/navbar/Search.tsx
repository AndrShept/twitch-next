'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { ElementRef, useRef, useState } from 'react';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const ref = useRef<ElementRef<'input'>>(null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      { skipEmptyString: true },
    );
    router.push(url);
  };
  const onClear = () => {
    setValue('');
    ref.current?.focus();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center  relative lg:w-[400px] max-w-[450px]  w-full "
    >
      <Input
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value.trimStart())}
        className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none "
        placeholder="search..."
      />
      {value && (
        <Button
          onClick={onClear}
          className="absolute right-12 size-6 p-[2px] text-muted-foreground"
          variant={'ghost'}
          size={'icon'}
        >
          <X className="   " />
        </Button>
      )}
      <Button
        className="rounded-l-none  text-muted-foreground"
        type="submit"
        variant={'ghost'}
        size={'icon'}
      >
        <SearchIcon className="size-5" />
      </Button>
    </form>
  );
};
