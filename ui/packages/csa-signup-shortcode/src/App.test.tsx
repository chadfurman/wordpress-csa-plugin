import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

describe("App", () => {
  it('renders signup page', () => {
    render(<App/>);
    const welcomeText = screen.getByText(/welcome/i);
    expect(welcomeText).toBeInTheDocument();
  })
})
