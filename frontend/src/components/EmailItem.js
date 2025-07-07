import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function EmailItem({ email, selected, onClick }) {
  return (
    <ListItemButton selected={selected} onClick={onClick} sx={{ alignItems: 'flex-start' }}>
      <ListItemText
        primary={<Typography variant="subtitle1" noWrap>{email.subject || '(no subject)'}</Typography>}
        secondary={<Typography variant="body2" color="text.secondary" noWrap>{email.body}</Typography>}
      />
    </ListItemButton>
  );
} 