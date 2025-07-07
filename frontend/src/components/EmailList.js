import React from 'react';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import EmailItem from './EmailItem';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function EmailList({ searchQuery, refreshToken = 0, onSelect }) {
  const [emails, setEmails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState(null);

  React.useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const endpoint = searchQuery ? `${API_URL}/api/emails/search?q=${encodeURIComponent(searchQuery)}` : `${API_URL}/api/emails`;
        const res = await fetch(endpoint);
        const json = await res.json();
        setEmails(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchQuery, refreshToken]);

  const handleSelect = (email) => {
    setSelectedId(email.id);
    onSelect(email);
  };

  if (loading) return <CircularProgress sx={{ m: 2 }} />;
  if (error) return <Typography color="error" sx={{ m: 2 }}>{error}</Typography>;
  if (!emails.length) return <Typography sx={{ m: 2 }}>No emails</Typography>;

  return (
    <List dense sx={{ overflowY: 'auto', flex: 1 }}>
      {emails.map((e) => (
        <EmailItem key={e.id} email={e} selected={e.id === selectedId} onClick={() => handleSelect(e)} />
      ))}
    </List>
  );
} 