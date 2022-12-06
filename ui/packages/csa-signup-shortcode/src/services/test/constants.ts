import {SignupFormData} from "../../types";
import {
    addonShares,
    bundles,
    hearAboutUsQuestions,
    paymentMethods,
    paymentOptions,
    pickupLocations,
    regions,
    seasons,
    shares
} from "../../data/constants";

export const signupData: SignupFormData = {
    address1: "Some Address 1",
    address2: "Some Address 2",
    amountToPay: 100,
    boxingFee: 10,
    city: "Salem",
    comments: "Some text about comments for the farm",
    deliveryFee: 20,
    email: "test@example.com",
    firstName: "Thomas",
    lastName: "Engine",
    phone: "5551212",
    referral: "Timothy Smith",
    selectedAddonShares: {
        "1": {
            shareId: addonShares["1"].id,
            amount: 1
        },
    },
    selectedBundle: {
        bundleId: bundles["1"].id,
        bundleOptionId: bundles["1"].bundle_option_ids[0]
    },
    selectedHearAboutUsQuestion: hearAboutUsQuestions["1"],
    selectedPaymentMethod: paymentMethods["1"],
    selectedPaymentOption: paymentOptions["1"],
    selectedPickupLocation: pickupLocations["1"],
    selectedRegion: regions["1"],
    selectedSeasons: {
        "1": seasons["1"]
    },
    selectedShares: {
        "1": {
            shareId: shares["1"].id,
            quantity: 1
        },
        "2": {
            shareId: shares["2"].id,
            quantity: 1
        }
    },
    state: "Massachusetts",
    subtotal: 900.0,
    total: 1000.0,
    zip: "11111"
}