import React from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeText from '../WelcomeText'

describe("WelcomeText component", () => {
    it("should accept the welcome text as a parameter and display the text", () => {
        const welcomeText = "Some welcome text"
        const welcomeTextWithHTML = "<h1>Some welcome text</h1>"
        render(<WelcomeText welcomeTextWithHtml={welcomeTextWithHTML}></WelcomeText>)
        const welcomeTextElement = screen.getByText(welcomeText)
        expect(welcomeTextElement).toBeInTheDocument()
        const welcomeTextWithHTMLElement = screen.queryByText(welcomeTextWithHTML)
        expect(welcomeTextWithHTMLElement).toBeNull()
    })
})