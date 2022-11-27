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
import {createSignupServiceMock, escapeRegex} from "../../testUtils";

jest.mock('../../services/SignupService', createSignupServiceMock())


// @ts-ignore
global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        json: () => {
            return Promise.resolve({})
        }
    })
})

function renderSignupComponent() {
    const mockWelcomeText = `Welcome to`
    const mockAddonShares = addonShares
    const mockBundleOptions = bundleOptions
    const mockBundles = bundles
    const mockPickupLocations = pickupLocations
    const mockRegions = regions
    const mockSeasons = seasons
    const mockShares = shares
    const mockPaymentMethods = paymentMethods;
    const mockPaymentOptions = paymentOptions;
    return render(
        <Signup welcomeText={mockWelcomeText}
                addonShares={mockAddonShares} bundleOptions={mockBundleOptions} bundles={mockBundles}
                paymentMethods={mockPaymentMethods} pickupLocations={mockPickupLocations} regions={mockRegions}
                seasons={mockSeasons} shares={mockShares} paymentOptions={mockPaymentOptions}
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

function enterComments() {

}

function enterContactInfo() {

}

describe('Signup', () => {
    beforeEach(() => {
        fetch.clearMock()
    })
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
        fetch.mockImplementationOnce(() => {

        })
        const mockSubmitHandler = jest.fn()
        jest.mock()
        renderSignupComponent();
        let element = screen.queryByText(new RegExp(escapeRegex("Submit")))
        expect(element).toBeNull()
        selectRegion()
        selectSeason()
        enterShareQuantity()
        selectPickupLocation()
        selectPaymentOption()
        selectPaymentMethod()
        enterComments()
        enterContactInfo()
        element = screen.getByText(new RegExp(escapeRegex("Submit")))
        userEvent.click(element)
        expect(mockSubmitHandler).toHaveBeenCalledWith({
            address: "test-address",
            city: "test city",
            state: "SUBMITTED",
        })
    })
})