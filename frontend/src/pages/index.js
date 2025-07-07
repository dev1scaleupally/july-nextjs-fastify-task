import React from 'react';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import EmailList from '@/components/EmailList';
import EmailDetail from '@/components/EmailDetail';
import ComposeFab from '@/components/ComposeFab';
import ComposeEmail from '@/components/ComposeEmail';

export default function Home() {
  const [query, setQuery] = React.useState('');
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [refreshToken, setRefreshToken] = React.useState(0);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 300, borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
        <SearchBar onSearch={setQuery} />
        <EmailList searchQuery={query} refreshToken={refreshToken} onSelect={setSelectedEmail} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <EmailDetail email={selectedEmail} />
      </Box>
      <ComposeFab onClick={() => setComposeOpen(true)} />
      <ComposeEmail open={composeOpen} onClose={() => setComposeOpen(false)} onSent={() => setRefreshToken((t) => t + 1)} />
    </Box>
  );
}
