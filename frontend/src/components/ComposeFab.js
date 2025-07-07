import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function ComposeFab({ onClick }) {
  return (
    <Fab
      color="primary"
      aria-label="compose"
      onClick={onClick}
      sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}
    >
      <AddIcon />
    </Fab>
  );
} 