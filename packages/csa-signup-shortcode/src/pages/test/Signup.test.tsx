import {render, screen} from '@testing-library/react';
import React from 'react';
import Signup from "../Signup"
import {
    addonShares,
    bundleOptions,
    bundles,
    paymentMethods,
    pickupLocations,
    regions,
    seasons,
    shares
} from "../../data/constants";
import userEvent from '@testing-library/user-event';
import {escapeRegex} from "../../testUtils";

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
    return render(
        <Signup welcomeText={mockWelcomeText}
                addonShares={mockAddonShares} bundleOptions={mockBundleOptions} bundles={mockBundles}
                paymentMethods={mockPaymentMethods} pickupLocations={mockPickupLocations} regions={mockRegions}
                seasons={mockSeasons} shares={mockShares}/>);
}

function selectRegion(id: string = "1") {
    const regionElement = screen.getByLabelText(new RegExp(escapeRegex(regions[id].label)))
    userEvent.click(regionElement)
}

function selectSeason(id: string = "1") {
    const seasonElement = screen.getByLabelText(new RegExp(escapeRegex(seasons[id].label)))
    userEvent.click(seasonElement)
}

function enterShareQuantity(quantity: string = "1") {
    const shareElement = screen.getByLabelText(new RegExp(escapeRegex(shares["1"].label)))
    userEvent.type(shareElement, quantity)
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
        expect(false).toBeTruthy();
    })
    it('should display the total price, including boxing and delivery fees', () => {
        expect(false).toBeTruthy();
    })
    it('should display the total price, including boxing and delivery fees', () => {
        expect(false).toBeTruthy();
    })
    it('should display the payment options', () => {
        expect(false).toBeTruthy();
    })
    it('should display the payment methods', () => {
        expect(false).toBeTruthy();
    })
    it('should display the comments area', () => {
        expect(false).toBeTruthy();
    })
    it('should display the contact info area', () => {
        expect(false).toBeTruthy();
    })
    it('should allow us to submit the form', () => {
        expect(false).toBeTruthy();
    })
})