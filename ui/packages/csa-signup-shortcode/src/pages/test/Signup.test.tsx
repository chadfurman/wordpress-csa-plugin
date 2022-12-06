import {render, screen} from '@testing-library/react';
import React from 'react';
import Signup from "../Signup"
import {
    addonShares,
    bundleOptions,
    bundles,
    hearAboutUsQuestions,
    paymentMethods,
    paymentOptions,
    pickupLocations,
    regions,
    seasons,
    shares
} from "../../data/constants";
import userEvent from '@testing-library/user-event';
import {escapeRegex} from "../../testUtils";
import {SignupService} from "../../services/SignupService"

jest.mock('../../services/SignupService')

function renderSignupComponent() {
    return render(
        <Signup welcomeText={`Welcome to`}
                addonShares={addonShares} bundleOptions={bundleOptions} bundles={bundles}
                paymentMethods={paymentMethods} pickupLocations={pickupLocations} regions={regions}
                seasons={seasons} shares={shares} paymentOptions={paymentOptions}
                hearAboutUsQuestions={hearAboutUsQuestions}/>);
}

function selectRegion(id: string = "1") {
    const regionElement = screen.getByLabelText(new RegExp(escapeRegex(regions[id].label)))
    userEvent.click(regionElement)
}

function selectSeason(id: string = "1") {
    const seasonElement = screen.getByLabelText(new RegExp(escapeRegex(seasons[id].label)))
    userEvent.click(seasonElement)
}

function enterShareQuantity(shareId: string = "1", quantity: string = "1") {
    const shareElement = screen.getByLabelText(new RegExp(escapeRegex(shares[shareId].label)))
    userEvent.type(shareElement, quantity)
}

function enterAddonShareQuantity(shareId: string = "1", quantity: string = "1") {
    const shareElement = screen.getByLabelText(new RegExp(escapeRegex(addonShares[shareId].label)))
    userEvent.type(shareElement, quantity)
}

function selectBundle(id: string = "1", option: string = "1") {
    const bundleElement = screen.getByTestId(`bundle-${id}+option-${option}`)
    userEvent.click(bundleElement)
}

function selectPickupLocation(id: string = "1") {
    const pickupLocation = screen.getByText(new RegExp(escapeRegex(pickupLocations[id].label)))
    userEvent.click(pickupLocation)
}

function selectPaymentOption(id: string = "1") {
    const element = screen.getByText(new RegExp(escapeRegex(paymentOptions[id].label)))
    userEvent.click(element)
}

function selectPaymentMethod(id: string = "1") {
    const element = screen.getByText(new RegExp(escapeRegex(paymentMethods[id].label)))
    userEvent.click(element)
}

function enterAmountToPay(amountToPay: string = "100") {
    const amountElement = screen.getByLabelText(new RegExp("amount.*you.*pay"))
    userEvent.type(amountElement, amountToPay)
}

function enterComments() {
    const element = screen.getByText(new RegExp(escapeRegex("Additional Thoughts")))
    userEvent.type(element, "Some comments")
}

function selectHearAboutUsQuestion(id: string = "1") {
    const element = screen.getByText(new RegExp(escapeRegex(hearAboutUsQuestions[id].label)))
    userEvent.click(element)
}

function enterReferral() {
    const element = screen.getByText(new RegExp(escapeRegex("Did a friend refer")))
    userEvent.type(element, "Some referral")
}

function enterFirstName() {
    const element = screen.getByText(new RegExp(escapeRegex("First Name")))
    userEvent.type(element, "First name")
}

function enterLastName() {
    const element = screen.getByText(new RegExp(escapeRegex("Last Name")))
    userEvent.type(element, "Last name")
}

function enterEmail() {
    const element = screen.getByText(new RegExp(escapeRegex("Email:")))
    userEvent.type(element, "test@example.com")
}

function enterPhone() {
    const element = screen.getByText(new RegExp(escapeRegex("Phone:")))
    userEvent.type(element, "Phone")
}

function enterAddress1() {
    const element = screen.getByText(new RegExp(escapeRegex("Street Address")))
    userEvent.type(element, "Address 1")
}

function enterAddress2() {
    const element = screen.getByText(new RegExp(escapeRegex("Address Line 2")))
    userEvent.type(element, "Address 2")
}

function enterCity() {
    const element = screen.getByText(new RegExp(escapeRegex("City")))
    userEvent.type(element, "City")
}

function selectState() {
    const element = screen.getByTestId("state-select")
    userEvent.selectOptions(element, ["New York"])
}

function enterZipCode() {
    const element = screen.getByText(new RegExp(escapeRegex("Zip")))
    userEvent.type(element, "12345")
}

function enterContactInfo() {
    enterFirstName()
    enterLastName()
    enterEmail()
    enterPhone()
    enterAddress1()
    enterAddress2()
    enterCity()
    selectState()
    enterZipCode()
}

describe('Signup', () => {
    it('should render without error', () => {
        renderSignupComponent();
    })
    it('should show welcome text', () => {
        renderSignupComponent();
        const welcomeText = screen.getByText(/Welcome/i)
        expect(welcomeText).toBeTruthy()
    })
    it('should show seasons only after region is selected', () => {
        renderSignupComponent();
        const seasonsElement = screen.queryByText(new RegExp(escapeRegex(seasons["1"].label)))
        expect(seasonsElement).toBeNull()
        selectRegion()
        const seasonsText = screen.getByText(new RegExp(escapeRegex(seasons["1"].label)))
        expect(seasonsText).toBeTruthy();
    })
    it('should show shares for the selected regions and seasons after season is selected', () => {
        renderSignupComponent();
        const shareElement = screen.queryByText(new RegExp(escapeRegex(shares["1"].label)))
        expect(shareElement).toBeNull()
        selectRegion()
        selectSeason()
        const shareText = screen.getByText(new RegExp(escapeRegex(shares["1"].label)))
        expect(shareText).toBeTruthy()
    })
    it('should show bundle shares when all seasons are selected', () => {
        renderSignupComponent();
        const bundleShareElement = screen.queryByText(new RegExp(escapeRegex(bundles["1"].label)))
        expect(bundleShareElement).toBeNull()
        selectRegion()
        for (const seasonId in seasons) {
            selectSeason(seasonId)
        }
        const bundleText = screen.getByText(new RegExp(escapeRegex(bundles["1"].label)))
        expect(bundleText).toBeTruthy()
    })
    it('should show pickup locations when share quantity is updated', () => {
        renderSignupComponent();
        const pickupLocationElement = screen.queryByText(new RegExp(escapeRegex(pickupLocations["1"].label)))
        expect(pickupLocationElement).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        const pickupLocation = screen.getByText(new RegExp(escapeRegex(pickupLocations["1"].label)))
        expect(pickupLocation).toBeTruthy()
    })
    it('should show pickup location options for each selected region and season', () => {
        renderSignupComponent();
        selectRegion()
        selectSeason("1")
        selectSeason("2")
        enterShareQuantity("1", "1")
        enterShareQuantity("5", "1")
        const pickupLocation1 = screen.getByText(new RegExp(escapeRegex(pickupLocations["1"].label)))
        const pickupLocation6 = screen.getByText(new RegExp(escapeRegex(pickupLocations["6"].label)))
        expect(pickupLocation1).toBeTruthy()
        expect(pickupLocation6).toBeTruthy()
    })
    it('should display the total price, including boxing and delivery fees', () => {
        renderSignupComponent();
        let totalPriceElement = screen.queryByText(new RegExp(escapeRegex("Total")))
        expect(totalPriceElement).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation("2")
        // 1 of Share[1] + boxing and delivery fee == 247 + 20 + 10 = 277
        totalPriceElement = screen.getByText(new RegExp(escapeRegex("Total: $277.00")))
        expect(totalPriceElement).toBeTruthy()
    })
    it('should display the total price, without boxing or delivery fees', () => {
        renderSignupComponent();
        let totalPriceElement = screen.queryByText(new RegExp(escapeRegex("Total")))
        expect(totalPriceElement).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        // 1 of Share[1], no other fee == 247
        totalPriceElement = screen.getByText(new RegExp(escapeRegex("Total: $247.00")))
        expect(totalPriceElement).toBeTruthy()
    })
    it('should display the payment options', () => {
        renderSignupComponent();
        let paymentOptionsElement = screen.queryByText(new RegExp(escapeRegex("Payment Options")))
        expect(paymentOptionsElement).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        paymentOptionsElement = screen.getByText(new RegExp(escapeRegex("Payment Options")))
        expect(paymentOptionsElement).toBeTruthy()
    })
    it('should display the payment methods', () => {
        renderSignupComponent();
        let paymentMethodElement = screen.queryByText(new RegExp(escapeRegex("Payment Method")))
        expect(paymentMethodElement).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        paymentMethodElement = screen.getByText(new RegExp(escapeRegex("Payment Method")))
        expect(paymentMethodElement).toBeTruthy()
    })
    it('should display the comments area', () => {
        renderSignupComponent();
        let element = screen.queryByText(new RegExp(escapeRegex("Comments")))
        expect(element).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        selectPaymentOption()
        selectPaymentMethod()
        element = screen.getByText(new RegExp(escapeRegex("Comments")))
        expect(element).toBeTruthy()
    })
    it('should display the contact info area', () => {
        renderSignupComponent();
        let element = screen.queryByText(new RegExp(escapeRegex("Contact Info")))
        expect(element).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        selectPaymentOption()
        selectPaymentMethod()
        element = screen.getByText(new RegExp(escapeRegex("Contact Info")))
        expect(element).toBeTruthy()
    })
    it('should allow us to submit the form', () => {
        renderSignupComponent();
        let element = screen.queryByText(new RegExp(escapeRegex("Submit")))
        expect(element).toBeNull()
        selectRegion()
        for (const seasonId in seasons) {
            selectSeason(seasonId)
        }
        enterShareQuantity()
        enterAddonShareQuantity()
        selectBundle()
        selectPickupLocation("2")
        enterAmountToPay()
        selectPaymentOption()
        selectPaymentMethod()
        enterComments()
        enterReferral()
        selectHearAboutUsQuestion()
        enterContactInfo()
        element = screen.getByText(new RegExp(escapeRegex("Submit")))
        userEvent.click(element)
        expect(SignupService.prototype.signup).toHaveBeenCalledWith({
            selectedRegion: {id: '1', label: 'Western Massachusetts'},
            selectedSeasons: {
                '1': {id: '1', label: 'Summer'},
                '2': {id: '2', label: 'Fall'}
            },
            selectedShares: {'1': {shareId: '1', quantity: 1}},
            selectedPickupLocation: {
                id: '2',
                label: 'HOME DELIVERY - Fridays 10-8 p.m. (NOTE: Flower Shares are NOT ELIGIBLE for home delivery)',
                description: undefined,
                boxingFee: 20,
                deliveryFee: 10,
                seasonId: '1',
                regionId: '1'
            },
            selectedPaymentOption: {id: '1', label: 'Full Payment'},
            selectedPaymentMethod: {id: '1', label: 'Mail us a check- we love this option!'},
            amountToPay: 100,
            subtotal: 1492,
            total: 1522,
            boxingFee: 20,
            deliveryFee: 10,
            comments: 'Some comments',
            selectedHearAboutUsQuestion: {id: '1', label: 'I was a member in a previous season'},
            referral: 'Some referral',
            selectedAddonShares: {
                "1": {
                    "quantity": 1,
                    "shareId": "1",
                },
            },
            selectedBundle: {
                "bundleId": "1",
                "bundleOptionId": "1",
            },
            firstName: 'First name',
            lastName: 'Last name',
            phone: 'Phone',
            email: 'test@example.com',
            address1: 'Address 1',
            address2: 'Address 2',
            city: 'City',
            state: 'New York',
            zip: '12345'
        })
    })
})