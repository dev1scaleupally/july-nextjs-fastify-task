import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function EmailDetail({ email }) {
  if (!email) {
    return <Typography sx={{ p: 2 }}>Select an email to view details</Typography>;
  }

  return (
    <Box sx={{ p: 2, overflowY: 'auto', height: '100%' }}>
      <Typography variant="h6" gutterBottom>{email.subject}</Typography>
      <Typography variant="subtitle2" gutterBottom>To: {email.to}</Typography>
      {email.cc && <Typography variant="subtitle2" gutterBottom>CC: {email.cc}</Typography>}
      {email.bcc && <Typography variant="subtitle2" gutterBottom>BCC: {email.bcc}</Typography>}
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>{email.body}</Typography>
    </Box>
  );
} 