import React from 'react';
import { toast } from 'react-hot-toast';

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const onSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    const query = input.value.trim();
    
    form.reset();

    if (query === "") {
      toast.error('Please enter a search query');
      return;
    }
    
    onSubmit(query);
  };

  return (
    <header>
      <form onSubmit={onSearchForm}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
