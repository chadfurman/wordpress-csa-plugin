import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInfo from '../ContactInfo';
import userEvent from '@testing-library/user-event';


const renderContactInfoComponent = () => {
    const mockSetFirstName = jest.fn()
    const mockSetLastName = jest.fn()
    const mockSetPhone = jest.fn()
    const mockSetEmail = jest.fn()
    const mockSetAddress1 = jest.fn()
    const mockSetAddress2 = jest.fn()
    const mockSetCity = jest.fn()
    const mockSetState = jest.fn()
    const mockSetZip = jest.fn()

    render(<ContactInfo setFirstName={mockSetFirstName} setLastName={mockSetLastName} setPhone={mockSetPhone} setEmail={mockSetEmail} setAddress1={mockSetAddress1} setAddress2={mockSetAddress2} setCity={mockSetCity} setState={mockSetState} setZip={mockSetZip} />)

    return {
        mockSetFirstName,
        mockSetLastName,
        mockSetPhone,
        mockSetEmail,
        mockSetAddress1,
        mockSetAddress2,
        mockSetCity,
        mockSetState,
        mockSetZip,
    }
}


describe("ContactInfo", () => {
    it("lets us enter our first name", () => {
        const fakeFirstname = "Thomas"
        const {mockSetFirstName} = renderContactInfoComponent()
        const firstNameText = screen.getByPlaceholderText(/First Name/)
        userEvent.type(firstNameText, fakeFirstname)
        expect(mockSetFirstName).toHaveBeenCalledWith(fakeFirstname)
    })
    it("lets us enter our last name", () => {
        const fakeLastname = "Benjamin"
        const {mockSetLastName} = renderContactInfoComponent()
        const lastNameText = screen.getByPlaceholderText(/Last Name/)
        userEvent.type(lastNameText, fakeLastname)
        expect(mockSetLastName).toHaveBeenCalledWith(fakeLastname)
    })
    it("lets us enter our city", () => {
        expect(true).toBe(false)
    })
    it("lets us enter our state", () => {
        expect(true).toBe(false)
    })
    it("lets us enter our zipcode", () => {
        expect(true).toBe(false)
    })
    it("lets us enter our street address", () => {
        expect(true).toBe(false)
    })
    it("lets us enter a second street address", () => {
        expect(true).toBe(false)
    })
    it("lets us enter an email", () => {
        expect(true).toBe(false)
    })
    it("lets us enter a phone number", () => {
        expect(true).toBe(false)
    })
})