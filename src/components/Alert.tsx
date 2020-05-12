import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';

export default function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
