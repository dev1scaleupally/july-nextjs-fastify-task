import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@/hooks/useDebounce';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = React.useState('');
  const debounced = useDebounce(input, 500);

  React.useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <TextField
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search"
      size="small"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
      sx={{ m: 1 }}
    />
  );
} 