import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../src/App';

describe('App Component', () => {
  it('mounts without crashing', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});
