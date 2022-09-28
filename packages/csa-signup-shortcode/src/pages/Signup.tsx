import * as React from 'react'
import {useEffect, useState} from 'react'

function SignupWelcomeText() {
    return <>
        <h3>Welcome to our share sign up page! Hello!</h3>
        <h4>sign up for your vegetable share (and any additional shares) here!</h4>
        <p>
            Upon completion of this form, you will be prompted to pay with a check or redirected to paypal. please
            call or email the farm with any questions while doing the form.
        </p>
        <p>
            413-467-7645 | &nbsp;<a href="mailto:thefarmers@redfirefarm.com">thefarmers@redfirefarm.com</a>
            <br/>
        </p>
        <p>
            <strong>Be a part of building the local food system!</strong>
        </p>
    </>;
}

type RegionId = string
type RegionLabel = string
type Region = {
    id: RegionId,
    label: RegionLabel,
}
type Regions = Record<RegionId, Region>;
interface SignupRegionsProps {
    regions: Regions,
    selectedRegion?: Region
    handleChangeSelectedRegion: Function
}

const SignupRegions = ({regions, selectedRegion, handleChangeSelectedRegion}: SignupRegionsProps) => {
    const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeSelectedRegion(regions[e.target.value])
    }
    const selectedRegionId = selectedRegion ? selectedRegion.id : null
    const regionElements = Object.keys(regions).map(regionId => {
        return (
            <li key={regionId} >
                <label>
                    <input type="radio" value={regionId} checked={selectedRegionId === regionId} onChange={handleRegionChange}/>
                    {regions[regionId].label}
                </label>
            </li>
        )
    })
    return <>
        <h3>Start by choosing your farm share area:</h3>
        <p>Where you would like to get a share? [answer reveals pricing and pickup locations.]</p>
        <ul>
            {regionElements}
        </ul>
    </>;
}

type SeasonId = string
type SeasonLabel = string
type Season = {
    id: SeasonId,
    label: SeasonLabel
}
type Seasons = Record<SeasonId, Season>
interface SignupSeasonsProps {
    seasons: Seasons
    handleChangeSelectedSeasons: Function
}
const SignupSeasons = ({seasons, handleChangeSelectedSeasons}: SignupSeasonsProps) => {
    const handleSeasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const seasonId = e.target.value
        const isSelected = e.target.checked
        handleChangeSelectedSeasons((selectedSeasons: Seasons) => {
            if (!isSelected) {
                delete selectedSeasons[seasonId]
            } else if (isSelected) {
                selectedSeasons[seasonId] = seasons[seasonId]
            }
            return {
                ...selectedSeasons
            }
        })
    }

    return <>
        <h3>Which Seasons are you interested in?</h3>
        <ul>
            {Object.keys(seasons).map(seasonId => {
                const season = seasons[seasonId]
                return (
                    <li key={seasonId}>
                        <label>
                            <input type="checkbox" value={season.id} onChange={handleSeasonChange}/>
                            {season.label}
                        </label>
                    </li>
                )
            })}
        </ul>
    </>;
}

interface SignupSeasonProps {
    selectedSeason: Season
    selectedRegion: Region
    shares: CsaShares
    handleUpdateSelectedShares: (share: CsaShare, quantity: SelectedShare["quantity"]) => void
}
const SignupSeason = ({selectedSeason, selectedRegion, shares, handleUpdateSelectedShares}: SignupSeasonProps) => {
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shareId: CsaShareId = e.target.getAttribute('data-share-id') || "missing-share-id-from-quantity-input"
        const quantity: number = parseInt(e.target.value)
        handleUpdateSelectedShares(shares[shareId], quantity)
    }
    return <>
        <h3>{selectedSeason.label} Shares</h3>
        <ul>
            {Object.keys(shares).map(shareId => {
                const share = shares[shareId]
                if (share.regionId !== selectedRegion.id) {
                    return
                }
                return (
                    <li key={shareId}>
                        <label>
                            {share.label}
                            <div>{share.description}</div>
                            <div>
                                {/* TODO: share price per region */}
                                <span>Price:</span> <span>{Intl.NumberFormat('en-us', {style: "currency", currency:"USD"}).format(share.price)}</span>
                            </div>
                            <div>
                                <span>Quantity:</span> <input type="number" min={0} data-share-id={share.id} onChange={handleChangeQuantity}/>
                            </div>
                        </label>
                    </li>
                )
            })}
        </ul>
    </>
}

type BundleId = string
type BundleLabel = string
type BundleDescription = string
type Bundle = {
    id: BundleId
    label: BundleLabel
    description: BundleDescription
    seasons: SeasonId[],
    region: RegionId,
    options: BundleOptionId[]
}
type Bundles = Record<BundleId, Bundle>
type BundleOptionId = string
type BundleOptionLabel = string
type BundleOptionDescription = string
type BundleOptionPrice = number
type BundleOption = {
    id: BundleOptionId
    label: BundleOptionLabel
    description: BundleOptionDescription
    price: BundleOptionPrice
}
type BundleOptions = Record<BundleOptionId, BundleOption>
interface SignupBundlesProps {
    selectedSeasons: Seasons
    selectedRegion: Region
    selectedBundle?: SelectedBundle
    bundles: Bundles
    bundleOptions: BundleOptions,
    handleUpdateSelectedBundle: (bundle: Bundle, bundleOption: BundleOption) => void
    unsetSelectedBundle: () => void
}
function SignupBundles({selectedSeasons, selectedRegion, bundles, bundleOptions, selectedBundle, handleUpdateSelectedBundle, unsetSelectedBundle}: SignupBundlesProps) {
    const handleChangeBundleOption = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const bundleId: BundleOptionId = e.currentTarget.getAttribute('data-bundle-id') || "missing-bundle-option-id-from-bundle-radio"
        const bundleOptionId: BundleOptionId = e.currentTarget.getAttribute('data-bundle-option-id') || "missing-bundle-option-id-from-bundle-radio"
        const bundleOption: BundleOption = bundleOptions[bundleOptionId]
        if (selectedBundle && selectedBundle.bundleId === bundleId && selectedBundle.bundleOptionId === bundleOptionId) {
            unsetSelectedBundle();
        } else {
            handleUpdateSelectedBundle(bundles[bundleId], bundleOption)
        }
    }
    return <>
        <h3>Bundles</h3>
        {Object.keys(bundles).map((bundleId: BundleId) => {
            const bundle = bundles[bundleId]
            return <div key={bundleId}>
                <h4>{bundle.label}</h4>
                <div>{bundle.description}</div>
                <ul>
                    {bundle.options.map(optionId => {
                        const bundleOption = bundleOptions[optionId]
                        return <li key={optionId}>
                            <label>
                                <>
                                    <input type="radio" data-bundle-id={bundle.id} data-bundle-option-id={bundleOption.id} checked={selectedBundle && selectedBundle.bundleId === bundle.id && selectedBundle.bundleOptionId === bundleOption.id} onChange={handleChangeBundleOption} onClick={handleChangeBundleOption} /> {Intl.NumberFormat('en-us',{style:"currency", currency:"USD"}).format(bundleOption.price)} {bundleOption.label}
                                    <p>{bundleOption.description}</p>
                                </>
                            </label>
                        </li>
                    })}
                </ul>
            </div>
        })}
    </>;
}

interface SignupAddonsProps {
    selectedSeason: Season
    selectedRegion: Region
    addonShares: CsaShares
    handleUpdateSelectedAddonShares: (share: CsaShare, quantity: SelectedShare["quantity"]) => void
}
const SignupAddons = ({selectedSeason, selectedRegion, addonShares, handleUpdateSelectedAddonShares}: SignupAddonsProps) => {
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shareId: CsaShareId = e.target.getAttribute('data-share-id') || "missing-share-id-from-quantity-input"
        const quantity: number = parseInt(e.target.value)
        handleUpdateSelectedAddonShares(addonShares[shareId], quantity)
    }
    return <>
        <h3>Available Add-On Shares For {selectedSeason.label}</h3>
        <ul>
            {Object.keys(addonShares).map(shareId => {
                const share = addonShares[shareId]
                if (share.regionId !== selectedRegion.id) {
                    return
                }
                return (
                    <li key={shareId}>
                        <label>
                            {share.label}
                            <div>{share.description}</div>
                            <div>
                                {/* TODO: share price per region */}
                                <span>Price:</span> <span>{Intl.NumberFormat('en-us', {style: "currency", currency:"USD"}).format(share.price)}</span>
                            </div>
                            <div>
                                <span>Quantity:</span> <input type="number" min={0} data-share-id={share.id} onChange={handleChangeQuantity}/>
                            </div>
                        </label>
                    </li>
                )
            })}
        </ul>
    </>;
}

interface SignupPickupLocationProps {
    season: Season
    pickupLocations: PickupLocations
    selectedPickupLocation?: SelectedPickupLocation
    handleUpdateSelectedPickupLocation: (pickupLocation: PickupLocation) => void
    unsetSelectedPickupLocation: () => void
}
function SignupPickupLocation({season, pickupLocations, selectedPickupLocation, handleUpdateSelectedPickupLocation, unsetSelectedPickupLocation}: SignupPickupLocationProps) {
    const handleChangePickupLocation = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const pickupLocationId: PickupLocationId = e.currentTarget.getAttribute('data-pickup-location-id') || "missing-pickup-location-id-from-radio"
        const pickupLocation: PickupLocation = pickupLocations[pickupLocationId]
        console.log("change location", selectedPickupLocation, pickupLocation)
        if (selectedPickupLocation && selectedPickupLocation.id === pickupLocationId) {
            unsetSelectedPickupLocation();
        } else {
            handleUpdateSelectedPickupLocation(pickupLocation)
        }
    }
    console.log("regen location", selectedPickupLocation)
    return <>
        <h3>Choose Your {season.label} Pick Up Spot:</h3>
        <div>
            This will be your pickup location for the duration of the season.
            NOTE: Locations and times are subject to change, so please watch your email.
        </div>
        <ul>
            {Object.keys(pickupLocations).map(pickupLocationKey => {
                const pickupLocation = pickupLocations[pickupLocationKey]
                return <li key={pickupLocationKey}>
                    <label>
                        <input type="radio" data-pickup-location-id={pickupLocation.id} checked={selectedPickupLocation && selectedPickupLocation.id === pickupLocation.id} onClick={handleChangePickupLocation} onChange={handleChangePickupLocation}/> {pickupLocation.label}
                        {pickupLocation.description ?
                            <div>
                                {pickupLocation.description}
                            </div>
                        : "" }
                    </label>
                </li>
            })}
        </ul>
    </>
}

interface SignupTotalProps {
    subtotal: number
    boxingFee: number
    deliveryFee: number
    total: number
}
function SignupTotal({subtotal, boxingFee, deliveryFee, total}: SignupTotalProps) {
    return (
        <>
            <h3>Cost</h3>
            {boxingFee || deliveryFee ?
                <div>Subtotal: {Intl.NumberFormat('en-us', {style: "currency", currency: "USD"}).format(subtotal)}</div>
            : "" }
            {boxingFee ?
                <div>Boxing Fee: {Intl.NumberFormat('en-us', {style: "currency", currency: "USD"}).format(boxingFee)}</div>
            : ""}
            {deliveryFee ?
                <div>Delivery Fee: {Intl.NumberFormat('en-us', {style: "currency", currency: "USD"}).format(deliveryFee)}</div>
            : "" }
            <div>Total: {Intl.NumberFormat('en-us', {style: "currency", currency: "USD"}).format(total)}</div>
        </>
    )
}

type PaymentOptionId = string
type PaymentOptionLabel = string
type PaymentOption = {
    id: PaymentOptionId,
    label: PaymentOptionLabel
}
type PaymentOptions = Record<PaymentOptionId, PaymentOption>
interface SignupPaymentOptionsProps {
    paymentOptions: PaymentOptions
    selectedPaymentOption: PaymentOption
    handleUpdateSelectedPaymentOption: (paymentOption: PaymentOption) => void,
    unsetSelectedPaymentOption: () => void,
}
function SignupPaymentOptions({paymentOptions, selectedPaymentOption, handleUpdateSelectedPaymentOption, unsetSelectedPaymentOption}: SignupPaymentOptionsProps) {
    const handleChangePaymentOption = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const paymentOptionId: PaymentOptionId = e.currentTarget.getAttribute('data-payment-option-id') || "missing-payment-option-id-from-radio"
        const paymentOption: PaymentOption = paymentOptions[paymentOptionId]
        console.log("change location", selectedPaymentOption, paymentOption)
        if (selectedPaymentOption && selectedPaymentOption.id === paymentOptionId) {
            unsetSelectedPaymentOption();
        } else {
            handleUpdateSelectedPaymentOption(paymentOption)
        }
    }
    return <>
        <h3>Payment Options</h3>
        <div>Deposits are non-refundable. We work with people all the time to make payment plans that are viable. Please contact thefarmers@redfirefarm.com to discuss further details!</div>
            <div>
                <ul>
                    {Object.keys(paymentOptions).map(paymentOptionId => {
                        const paymentOption = paymentOptions[paymentOptionId]
                        return (
                            <li key={paymentOption.id}>
                                <label>
                                    <input data-payment-option-id={paymentOption.id} checked={selectedPaymentOption && selectedPaymentOption.id == paymentOption.id} onChange={handleChangePaymentOption} onClick={handleChangePaymentOption} type="radio"/>
                                    {paymentOption.label}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
        <div>
            <label>
                Please enter the amount you commit to paying today.
                <input type="text" />
            </label>
        </div>
    </>;
}

function SignupPaymentMethods() {
    return <>
        <h3>Payment Method</h3>
        <div>Please choose your payment method. SNAP/EBT available with sign up- please email thefarmers@redfirefarm.com to request SNAP/EBT CSA signup forms</div>
        <ul>
            <li>
                <label>
                    <input type="radio" />
                    Mail us a check- we love this option!
                </label>
            </li>
            <li>
                <label>
                    <input type="radio"/>
                    PayPal
                </label>
            </li>
        </ul>
    </>
}

function SignupComments() {
    return <>
        <h3>Comments</h3>
        <textarea rows={10} cols={50}></textarea>
        <ul>
            <li>
                <label>How did you hear about Red Fire Farm?</label>
                <div>
                    <ul>
                        <li>
                            <label><input type="radio" />I was a member in a previous season</label>
                        </li>
                        <li>
                            <label><input type="radio" />A friend</label>
                        </li>
                        <li>
                            <label><input type="radio" />Flyer or brochure</label>
                        </li>
                        <li>
                            <label><input type="radio" />Online</label>
                        </li>
                        <li>
                            <label><input type="radio" />Other</label>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <label>Did a friend refer you? If so, please enter their name.<input/></label>
            </li>
        </ul>;
    </>
}

function SignupContactInfo() {
    return <>
        <h3>Contact Info</h3>
        <div>
            <label>First Name: <input type="text" /></label>
            <label>Last Name: <input type="text" /></label>
        </div>
        <div><label>Phone: <input /></label></div>
        <div><label>Email: <input /></label></div>

        <h4>Address</h4>
        <div><label>Street Address<input /></label></div>
        <div><label>Address Line 2<input /></label></div>
        <div>
            <label>
                City
                <select defaultValue={"Massachusetts"}>
                    <option value=""></option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District of Columbia">District of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                    <option value="Armed Forces Americas">Armed Forces Americas</option>
                    <option value="Armed Forces Europe">Armed Forces Europe</option>
                    <option value="Armed Forces Pacific">Armed Forces Pacific</option>
                </select>
            </label>
        </div>
        <div><label>City<input /></label></div>
        <div><label>State<input /></label></div>
        <div><label>Zip<input /></label></div>
    </>
}

type CsaShareLabel = string
type CsaShareDescription = string
type CsaShareId = string
type Price = number
type CsaShare = {
    label: CsaShareLabel,
    description: CsaShareDescription,
    id: CsaShareId
    price: Price
    regionId: RegionId,
    seasonId: SeasonId
}
type CsaShares = Record<CsaShareId, CsaShare>
type SelectedShare = {
    shareId: CsaShareId
    quantity: number
}
type SelectedBundle = {
    bundleId: BundleId
    bundleOptionId: BundleOptionId
}
type SelectedShares = Record<CsaShareId, SelectedShare>
type PickupLocationId = string
type PickupLocationLabel = string
type PickupLocationDescription = string
type PickupLocationBoxingFee = Price
type PickupLocationDeliveryFee = Price
type PickupLocationRegionId = RegionId
type PickupLocationSeasonId = SeasonId
type PickupLocation = {
    id: PickupLocationId
    label: PickupLocationLabel
    description?: PickupLocationDescription
    boxingFee: PickupLocationBoxingFee
    deliveryFee: PickupLocationDeliveryFee
    regionId: PickupLocationRegionId
    seasonId: PickupLocationSeasonId
}
type SelectedPickupLocation = PickupLocation
type PickupLocations = Record<PickupLocationId, PickupLocation>
function Signup() {
    const seasons: Seasons = {
        "1": {
            id: "1",
            label: "Summer"
        },
        "2": {
            id: "2",
            label: "Fall"
        }

    }
    const regions: Regions = {
        "1": {
            id: "1",
            label: "Western Massachusetts"
        },
        "2": {
            id: "2",
            label: "Boston Area & Worcester"
        },
    }
    const addonShares: CsaShares = {
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

    const shares: CsaShares = {
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
    const bundles: Bundles = {
        "1": {
            id: "1",
            label: "Summer and Fall Vegetable Bundle (Western MA)",
            description: "Delicious organic Summer &amp; fall produce bundled into one signup option to save you money! Summer Shares run for 20 weeks (June-October) with Fall Shares beginning after (November-December). much you can afford to pay. Payments over the Regular Price help offset households needing lower priced shares.",
            seasons: ["1","2"],
            region: "1",
            options: ["1","2","3","4","5"]
        }
    }
    const bundleOptions: BundleOptions = {
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
    const pickupLocations: PickupLocations = {
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
    const paymentOptions: PaymentOptions = {
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
    const [selectedRegion, handleChangeSelectedRegion] = useState<Region>()
    const [selectedSeasons, handleChangeSelectedSeasons] = useState<Seasons>({})
    const [selectedShares, handleChangeSelectedShares] = useState<SelectedShares>({})
    const [selectedAddonShares, handleChangeSelectedAddonShares] = useState<SelectedShares>({})
    const [selectedBundle, handleChangeSelectedBundle] = useState<SelectedBundle>()
    const [selectedPickupLocation, handleChangeSelectedPickupLocation] = useState<SelectedPickupLocation>()
    const [selectedPaymentOption, handleChangeSelectedPaymentOption] = useState<any>() // TODO
    const [contactInfo, handleChangeContactInfo] = useState<any>() // TODO
    const [subtotal, handleChangeSubtotal] = useState<number>(0.0) // TODO
    const [total, handleChangeTotal] = useState<number>(0.0) // TODO
    const [boxingFee, handleChangeBoxingFee] = useState<number>(0.0) // TODO
    const [deliveryFee, handleChangeDeliveryFee] = useState<number>(0.0) // TODO
    const handleUpdateSelectedShares = (share: CsaShare, quantity: number) => {
        handleChangeSelectedShares(selectedShares => ({
            ...selectedShares,
            [share.id]: {
                shareId: share.id,
                quantity: quantity
            }
        }))
    }
    const handleUpdateSelectedAddonShares = (share: CsaShare, quantity: number) => {
        handleChangeSelectedAddonShares(selectedShares => ({
            ...selectedAddonShares,
            [share.id]: {
                shareId: share.id,
                quantity: quantity
            }
        }))
    }
    const unsetSelectedBundle = () => {
        handleChangeSelectedBundle(undefined)
    }
    const handleUpdateSelectedBundle = (bundle: Bundle, bundleOption: BundleOption) => {
        handleChangeSelectedBundle({
            bundleId: bundle.id,
            bundleOptionId: bundleOption.id
        })
    }
    const unsetBoxingFee = () => {
        handleChangeBoxingFee(0)
    }
    const unsetDeliveryFee = () => {
        handleChangeDeliveryFee(0)
    }
    const unsetSelectedPickupLocation = () => {
        handleChangeSelectedPickupLocation(undefined)
    }
    const handleUpdateSelectedPickupLocation = (pickupLocation: PickupLocation) => {
        handleChangeSelectedPickupLocation(pickupLocation)
    }
    const unsetSelectedPaymentOption = () => {
        handleChangeSelectedPaymentOption(undefined)
    }
    const handleUpdateSelectedPaymentOption = (paymentOption: PaymentOption) => {
        handleChangeSelectedPaymentOption(paymentOption)
    }
    useEffect(() => {
    }, [selectedRegion])
    useEffect(() => {
    }, [selectedSeasons])
    useEffect(() => {
        let subtotal = Object.keys(selectedShares).reduce((previousTotal, _, currentShareKeyIndex, selectedSharesKeys) => {
            const shareId = selectedSharesKeys[currentShareKeyIndex]
            const quantity = isNaN(selectedShares[shareId].quantity) ? 0 : selectedShares[shareId].quantity;
            return previousTotal + (shares[shareId].price * quantity)
        }, 0.0)
        subtotal += Object.keys(selectedAddonShares).reduce((previousTotal, _, currentShareKeyIndex, selectedSharesKeys) => {
            const shareId = selectedSharesKeys[currentShareKeyIndex]
            const quantity = isNaN(selectedAddonShares[shareId].quantity) ? 0 : selectedAddonShares[shareId].quantity;
            return previousTotal + (addonShares[shareId].price * quantity)
        }, 0.0)
        if (selectedBundle) {
            subtotal += bundleOptions[selectedBundle.bundleOptionId].price
        }
        handleChangeSubtotal(subtotal)
        if (selectedPickupLocation) {
            handleChangeBoxingFee(selectedPickupLocation.boxingFee)
            handleChangeDeliveryFee(selectedPickupLocation.deliveryFee)
            handleChangeTotal(subtotal + selectedPickupLocation.boxingFee + selectedPickupLocation.deliveryFee)
        } else {
            unsetDeliveryFee()
            unsetBoxingFee()
            handleChangeTotal(subtotal)
        }
    }, [selectedShares, selectedAddonShares,  selectedBundle, selectedPickupLocation])
    return (
        <>
            <SignupWelcomeText/>
            <SignupRegions regions={regions} selectedRegion={selectedRegion} handleChangeSelectedRegion={handleChangeSelectedRegion}/>
            { selectedRegion ? <SignupSeasons seasons={seasons} handleChangeSelectedSeasons={handleChangeSelectedSeasons} /> : '' }
            { selectedRegion ? Object.keys(selectedSeasons).map(selectedSeasonId => {
                const selectedSeason = seasons[selectedSeasonId]
                return <div key={selectedSeasonId}>
                    <SignupSeason shares={shares} selectedRegion={selectedRegion} selectedSeason={selectedSeason} handleUpdateSelectedShares={handleUpdateSelectedShares} />
                    <SignupAddons addonShares={addonShares} selectedRegion={selectedRegion} selectedSeason={selectedSeason} handleUpdateSelectedAddonShares={handleUpdateSelectedAddonShares} />
                </div>
            }) : ""}
            { selectedRegion && Object.keys(selectedSeasons).length === Object.keys(seasons).length ?
                <SignupBundles bundles={bundles} bundleOptions={bundleOptions} selectedRegion={selectedRegion} selectedSeasons={selectedSeasons} selectedBundle={selectedBundle} handleUpdateSelectedBundle={handleUpdateSelectedBundle} unsetSelectedBundle={unsetSelectedBundle} />
            : '' }
            {Object.keys(selectedShares).length && Object.keys(selectedSeasons).length ?
                Object.keys(selectedSeasons).map(selectedSeasonId => {
                    const selectedSeason = seasons[selectedSeasonId]
                    return <div key={selectedSeasonId}>
                        <SignupPickupLocation season={selectedSeason} pickupLocations={pickupLocations} selectedPickupLocation={selectedPickupLocation} handleUpdateSelectedPickupLocation={handleUpdateSelectedPickupLocation} unsetSelectedPickupLocation={unsetSelectedPickupLocation}/>
                    </div>
                })
            : ""}
            { total ?
                <>
                    <SignupTotal subtotal={subtotal} deliveryFee={deliveryFee} boxingFee={boxingFee} total={total} />
                    <SignupPaymentOptions paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={handleUpdateSelectedPaymentOption} selectedPaymentOption={selectedPaymentOption} unsetSelectedPaymentOption={unsetSelectedPaymentOption}/>
                    <SignupPaymentMethods />
                </>
            : ''}
            { selectedPaymentOption ?
                <>
                    <SignupContactInfo/>
                    <SignupComments />
                </>
            : ""}
            { contactInfo ?
                <input type={"submit"} />
            : ""}
        </>
    )
}

export default Signup;
