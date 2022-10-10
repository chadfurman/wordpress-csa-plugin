import {
    BundleOptions,
    Bundles, HearAboutUsQuestions,
    PaymentMethods,
    PaymentOptions,
    PickupLocations,
    Regions,
    Seasons,
    Shares
} from "../types";

export const regions: Regions = {
    "1": {
        id: "1",
        label: "Western Massachusetts"
    },
    "2": {
        id: "2",
        label: "Boston Area & Worcester"
    },
}

export const seasons: Seasons = {
    "1": {
        id: "1",
        label: "Summer"
    },
    "2": {
        id: "2",
        label: "Fall"
    }

}
export const addonShares: Shares = {
    "1": {
        id: "1",
        label: "Summer Cheese Share (Western MA)",
        description: "A weekly 6-8 oz package of fresh, locally sourced cheese sourced from local creameries that are committed to happy, healthy animals and practices that support our environment.",
        price: 65.00,
        regionId: "1",
        seasonId: "1"
    },
    "2": {
        id: "2",
        label: "Summer Cheese Share (Boston &amp; Worcester)",
        description: "A weekly 6-8 oz package of fresh, locally sourced cheese sourced from local creameries that are committed to happy, healthy animals and practices that support our environment.",
        price: 67.00,
        regionId: "2",
        seasonId: "1"
    },
}

export const shares: Shares = {
    "1": {
        id: "1",
        label: "Regular Summer CSA Share (Western MA)",
        description: "Great for 2-4 people who cook 3 times per week. Enjoy all the crops and varieties RFF has to offer. Weekly shares through mid-October. Comes with full PYO privileges.",
        price: 247.00,
        regionId: "1",
        seasonId: "1"
    },
    "2": {
        id: "2",
        label: "Regular Summer CSA Share (Boston & Worcester)",
        description: "Great for 2-4 people who cook 3 times per week. Enjoy all the crops and varieties RFF has to offer. Weekly shares through mid-October. Comes with full PYO privileges.",
        price: 278.00,
        regionId: "2",
        seasonId: "1"
    },
    "3": {
        id: "3",
        label: "Small Summer CSA Share (Western MA)",
        description: "Great for 1-2 people who cook 3 times per week. Not all items or varieties may be available with the small share. PYO availability is half of the regular share.",
        price: 192.00,
        regionId: "1",
        seasonId: "1"
    },
    "4": {
        id: "4",
        label: "Small Summer CSA Share (Boston & Worcester)",
        description: "Great for 1-2 people who cook 3 times per week. Not all items or varieties may be available with the small share. PYO availability is half of the regular share.",
        price: 219.00,
        regionId: "2",
        seasonId: "1"
    },
}
export const bundles: Bundles = {
    "1": {
        id: "1",
        label: "Summer and Fall Vegetable Bundle (Western MA)",
        description: "Delicious organic Summer &amp; fall produce bundled into one signup option to save you money! Summer Shares run for 20 weeks (June-October) with Fall Shares beginning after (November-December). much you can afford to pay. Payments over the Regular Price help offset households needing lower priced shares.",
        seasons: ["1","2"],
        region: "1",
        options: ["1","2","3","4","5"]
    }
}
export const bundleOptions: BundleOptions = {
    "1": {
        id: "1",
        label: "Helping Hands Bundle x 7",
        description: "Help offset signup costs for up to 7 households needing lower priced shares",
        price: 1180.00
    },
    "2": {
        id: "2",
        label: "Helping Hands Bundle",
        description: "Help offset signup costs for an additional household needing lower priced shares",
        price: 925.00
    },
    "3": {
        id: "3",
        label: "Regular Bundle",
        description: "",
        price: 885.00
    },
    "4": {
        id: "4",
        label: "Bundle",
        description: "",
        price: 847.00
    },
    "5": {
        id: "5",
        label: "Bundle",
        description: "",
        price: 842.00
    }
}
export const pickupLocations: PickupLocations = {
    "1": {
        id: "1",
        label: "GRANBY - Wednesdays 2-6:30 p.m. at the farm store (7 Carver Street)",
        description: undefined,
        boxingFee: 0.00,
        deliveryFee: 0.00,
        seasonId: "1",
        regionId: "1"
    },
    "2": {
        id: "2",
        label: "HOME DELIVERY - Fridays 10-8 p.m. (NOTE: Flower Shares are NOT ELIGIBLE for home delivery)",
        description: undefined,
        boxingFee: 0.00,
        deliveryFee: 10.00,
        seasonId: "1",
        regionId: "1"
    },
    "3": {
        id: "3",
        label: "WORCESTER - Wednesdays 3-7 p.m. at the First Unitarian Church (90 Main Street)",
        description: undefined,
        boxingFee: 10.00,
        deliveryFee: 0.00,
        seasonId: "1",
        regionId: "2"
    },
    "4": {
        id: "4",
        label: "CAMBRIDGE - Wednesdays 4-7 p.m. at the East Cambridge Savings Bank in Inman Square (1310 Cambridge Street)",
        description: undefined,
        boxingFee: 10.00,
        deliveryFee: 0.00,
        seasonId: "1",
        regionId: "2"
    },
    "5": {
        id: "5",
        label: "HOME DELIVERY via Mass Food Delivery - Wednesdays 10-8 p.m.",
        description: "(Areas NOT ELIGIBLE for delivery: Cape &amp; Islands, North Shore, South Shore below Rte. 44, Dudley, Webster, Douglas, Uxbridge, Millville, Mendon, Hopedale &amp; Blackstone)",
        boxingFee: 10.00,
        deliveryFee: 13.00,
        seasonId: "1",
        regionId: "2"
    },
}
export const paymentOptions: PaymentOptions = {
    "1": {
        id: "1",
        label: "Full Payment"
    },
    "2": {
        id: "2",
        label: "$100 deposit, with full balance paid by June 1st"
    },
    "3": {
        id: "3",
        label: "$100 deposit, with three payment installments on July 1st, August 1st, and September 1st"
    },
}
export const paymentMethods: PaymentMethods = {
    "1": {
        id: "1",
        label: "Mail us a check- we love this option!"
    },
    "2": {
        id: "2",
        label: "PayPal"
    }
}
export const hearAboutUsQuestions : HearAboutUsQuestions = {
    "1": {
        id: "1",
        label: "I was a member in a previous season"
    },
    "2": {
        id: "2",
        label: "A friend"
    },
    "3": {
        id: "3",
        label: "Flyer or brochure"
    },
    "4": {
        id: "4",
        label: "Online"
    },
    "5": {
        id: "5",
        label: "Other"
    },
}
