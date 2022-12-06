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
        const firstNameText = screen.getByLabelText(/First Name/)
        userEvent.type(firstNameText, fakeFirstname)
        expect(mockSetFirstName).toHaveBeenCalledWith(fakeFirstname)
    })
    it("lets us enter our last name", () => {
        const fakeLastname = "Benjamin"
        const {mockSetLastName} = renderContactInfoComponent()
        const lastNameText = screen.getByLabelText(/Last Name/)
        userEvent.type(lastNameText, fakeLastname)
        expect(mockSetLastName).toHaveBeenCalledWith(fakeLastname)
    })
    it("lets us enter our city", () => {
        const fakeCity = "New York"
        const {mockSetCity} = renderContactInfoComponent()
        const cityText = screen.getByLabelText(/City/)
        userEvent.type(cityText, fakeCity)
        expect(mockSetCity).toHaveBeenCalledWith(fakeCity)
    })
    it("lets us enter our state", () => {
        const fake = "New York"
        const {mockSetState} = renderContactInfoComponent()
        const select = screen.getByLabelText(/State/)
        userEvent.selectOptions(select, fake)
        expect((screen.getByText(fake) as HTMLOptionElement).selected).toBeTruthy()
        expect((screen.getByText("Massachusetts") as HTMLOptionElement).selected).toBeFalsy()
    })
    it("lets us enter our zipcode", () => {
        const fake = "12345"
        const {mockSetZip} = renderContactInfoComponent()
        const text = screen.getByLabelText(/Zip/)
        userEvent.type(text, fake)
        expect(mockSetZip).toHaveBeenCalledWith(fake)
    })
    it("lets us enter our street address", () => {
        const fake = "New York Street1"
        const {mockSetAddress1} = renderContactInfoComponent()
        const text = screen.getByLabelText(/Street Address/)
        userEvent.type(text, fake)
        expect(mockSetAddress1).toHaveBeenCalledWith(fake)
    })
    it("lets us enter a second street address", () => {
        const fake = "New York Street2"
        const {mockSetAddress2} = renderContactInfoComponent()
        const text = screen.getByLabelText(/Address Line 2/)
        userEvent.type(text, fake)
        expect(mockSetAddress2).toHaveBeenCalledWith(fake)
    })
    it("lets us enter an email", () => {
        const fake = "me@example.com"
        const {mockSetEmail} = renderContactInfoComponent()
        const text = screen.getByLabelText(/Email/)
        userEvent.type(text, fake)
        expect(mockSetEmail).toHaveBeenCalledWith(fake)
    })
    it("lets us enter a phone number", () => {
        const fake = "555-555-1212"
        const {mockSetPhone} = renderContactInfoComponent()
        const text = screen.getByLabelText(/Phone/)
        userEvent.type(text, fake)
        expect(mockSetPhone).toHaveBeenCalledWith(fake)
    })
})