import { Box, Container } from '@mui/material';
import React from 'react';

type Props = { children: React.ReactNode };

const BodyWrapper = (props: Props) => {
  return (
    <Container maxWidth='md'>
      {props.children}
    </Container>
  );
};

export default BodyWrapper;
