import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("signup page", () => {
  it('has welcome text', () => {
    render(<App />);
    const welcomeText = screen.getByText(/welcome/i);
    expect(welcomeText).toBeInTheDocument();
  })
})
