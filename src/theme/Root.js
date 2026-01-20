import React from 'react';
import RedactionWrapper from './RedactionComponent';

export default function Root({ children }) {
  return <RedactionWrapper>{children}</RedactionWrapper>;
}
