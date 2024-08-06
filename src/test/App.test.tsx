import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '@/App';

describe('App component', () => {
  it('renders Vite and React logos', () => {
    render(<App />);
  });
});
