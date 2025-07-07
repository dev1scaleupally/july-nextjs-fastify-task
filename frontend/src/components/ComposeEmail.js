import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function ComposeEmail({ open, onClose, onSent }) {
  const [form, setForm] = React.useState({ to: '', cc: '', bcc: '', subject: '', body: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (!form.to || !form.subject) {
      setError('`To` and `Subject` are required');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_URL}/api/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error || 'Failed to send');
      }
      const data = await res.json();
      onSent(data.data);
      onClose();
      setForm({ to: '', cc: '', bcc: '', subject: '', body: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Compose Email</DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="To" name="to" value={form.to} onChange={handleChange} required />
        <TextField label="CC" name="cc" value={form.cc} onChange={handleChange} />
        <TextField label="BCC" name="bcc" value={form.bcc} onChange={handleChange} />
        <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
        <TextField
          label="Body"
          name="body"
          value={form.body}
          onChange={handleChange}
          multiline
          minRows={4}
        />
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button onClick={handleSend} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Send'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 