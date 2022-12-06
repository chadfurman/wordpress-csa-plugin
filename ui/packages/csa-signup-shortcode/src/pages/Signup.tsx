import * as React from 'react'
import {useEffect, useState} from 'react'
import WelcomeText from "../components/Signup/WelcomeText";
import {
    Bundle,
    BundleOption,
    BundleOptions,
    Bundles,
    City,
    Comments as CommentsType,
    Email,
    FirstName,
    HearAboutUsQuestions,
    LastName,
    PaymentMethods,
    PaymentOptions,
    Phone,
    PickupLocations,
    Price,
    Referral,
    Region,
    Regions,
    Seasons,
    SelectedAddonShares,
    SelectedBundle,
    SelectedHearAboutUsQuestion,
    SelectedPaymentMethod,
    SelectedPaymentOption,
    SelectedPickupLocation,
    SelectedSeasons,
    SelectedShares,
    Share,
    Shares,
    SignupFormData,
    State,
    StreetAddress,
    Zip
} from "../types";
import SelectShares from "../components/Signup/SelectShares";
import SelectRegion from "../components/Signup/SelectRegion";
import SelectPickupLocation from "../components/Signup/SelectPickupLocation";
import SelectSeasons from "../components/Signup/SelectSeasons";
import SelectBundle from "../components/Signup/SelectBundle";
import SelectAddons from "../components/Signup/SelectAddons";
import Total from "../components/Signup/Total";
import SelectPaymentOption from "../components/Signup/SelectPaymentOption";
import SelectPaymentMethod from "../components/Signup/SelectPaymentMethod";
import Comments from "../components/Signup/Comments";
import ContactInfo from "../components/Signup/ContactInfo";
import {SignupService} from "../services/SignupService";

export interface SignupProperties {
    welcomeText?: string,
    addonShares: Shares,
    bundleOptions: BundleOptions,
    bundles: Bundles,
    pickupLocations: PickupLocations,
    regions: Regions,
    shares: Shares,
    seasons: Seasons,
    paymentMethods: PaymentMethods,
    paymentOptions: PaymentOptions,
    hearAboutUsQuestions: HearAboutUsQuestions
}

function Signup({
                    welcomeText,
                    addonShares,
                    bundleOptions,
                    bundles,
                    pickupLocations,
                    regions,
                    shares,
                    seasons,
                    paymentMethods,
                    paymentOptions,
                    hearAboutUsQuestions,
                }: SignupProperties) {
    welcomeText = welcomeText || `
        <h3>Welcome to our share sign up page! Hello!</h3>
    <h4>sign up for your vegetable share (and any additional shares) here!</h4>
    <p>
        Upon completion of this form, you will be prompted to pay with a check or redirected to PayPal. please
        call or email the farm with any questions while doing the form.
    </p>
    <p>
        413-467-7645 | &nbsp;<a href="mailto:thefarmers@redfirefarm.com">thefarmers@redfirefarm.com</a>
        <br/>
    </p>
    <p>
        <strong>Be a part of building the local food system!</strong>
    </p>`

    const [selectedRegion, handleChangeSelectedRegion] = useState<Region>()
    const [selectedSeasons, handleChangeSelectedSeasons] = useState<SelectedSeasons>({})
    const [selectedShares, handleChangeSelectedShares] = useState<SelectedShares>({})
    const [selectedAddonShares, handleChangeSelectedAddonShares] = useState<SelectedAddonShares>({})
    const [selectedBundle, handleChangeSelectedBundle] = useState<SelectedBundle>()
    const [selectedPickupLocation, handleChangeSelectedPickupLocation] = useState<SelectedPickupLocation>()
    const [selectedPaymentOption, handleChangeSelectedPaymentOption] = useState<SelectedPaymentOption>()
    const [selectedPaymentMethod, handleChangeSelectedPaymentMethod] = useState<SelectedPaymentMethod>()
    const [amountToPay, handleChangeAmountToPay] = useState<Price>(0.0)
    const [subtotal, handleChangeSubtotal] = useState<Price>(0.0)
    const [total, handleChangeTotal] = useState<Price>(0.0)
    const [boxingFee, handleChangeBoxingFee] = useState<Price>(0.0)
    const [deliveryFee, handleChangeDeliveryFee] = useState<Price>(0.0)
    const [comments, handleChangeComments] = useState<CommentsType>('')
    const [selectedHearAboutUsQuestion, handleChangeSelectedHearAboutUsQuestion] = useState<SelectedHearAboutUsQuestion>()
    const [referral, handleChangeReferral] = useState<Referral>('')
    const [firstName, setFirstName] = useState<FirstName>()
    const [lastName, setLastName] = useState<LastName>()
    const [phone, setPhone] = useState<Phone>()
    const [email, setEmail] = useState<Email>()
    const [address1, setAddress1] = useState<StreetAddress>()
    const [address2, setAddress2] = useState<StreetAddress>()
    const [city, setCity] = useState<City>()
    const [state, setState] = useState<State>("Massachusetts")
    const [zip, setZip] = useState<Zip>()
    const handleUpdateSelectedShares = (share: Share, quantity: number) => {
        handleChangeSelectedShares(selectedShares => {
            return {
                [share.id]: {
                    shareId: share.id,
                    quantity: quantity
                },
                ...selectedShares
            }
        })
    }
    const handleUpdateSelectedAddonShares = (share: Share, quantity: number) => {
        handleChangeSelectedAddonShares(selectedAddonShares => ({
            [share.id]: {
                shareId: share.id,
                quantity: quantity
            },
            ...selectedAddonShares
        }))
    }
    const handleUpdateSelectedBundle = (bundle?: Bundle, bundleOption?: BundleOption) => {
        if (bundle !== undefined && bundleOption !== undefined) {
            handleChangeSelectedBundle({
                bundleId: bundle.id,
                bundleOptionId: bundleOption.id
            })
        } else {
            handleChangeSelectedBundle(undefined)
        }
    }
    const unsetBoxingFee = () => {
        handleChangeBoxingFee(0)
    }
    const unsetDeliveryFee = () => {
        handleChangeDeliveryFee(0)
    }
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
    }, [selectedShares, selectedAddonShares, selectedBundle, selectedPickupLocation])

    const handleSubmission = async () => {
        const formData: SignupFormData = {
            selectedRegion,
            selectedSeasons,
            selectedShares,
            selectedAddonShares,
            selectedBundle,
            selectedPickupLocation,
            selectedPaymentOption,
            selectedPaymentMethod,
            amountToPay,
            subtotal,
            total,
            boxingFee,
            deliveryFee,
            comments,
            selectedHearAboutUsQuestion,
            referral,
            firstName,
            lastName,
            phone,
            email,
            address1,
            address2,
            city,
            state,
            zip,
        }
        const service = new SignupService()
        await service.signup(formData)
    }

    return (
        <>
            {/* Welcome */}
            <WelcomeText welcomeTextWithHtml={welcomeText}/>

            {/* Regions */}
            <SelectRegion regions={regions} handleSelect={handleChangeSelectedRegion}/>

            {/* Seasons */}
            {selectedRegion ? <SelectSeasons seasons={seasons} handleSelect={handleChangeSelectedSeasons}/> : ''}

            {/* Shares and Addons */}
            {selectedRegion ? Object.keys(selectedSeasons).map(selectedSeasonId => {
                const selectedSeason = seasons[selectedSeasonId]

                const filteredShares = Object.keys(shares).reduce<Shares>((filtered, shareId) => {
                    const share: Share = shares[shareId]
                    if (share.regionId == selectedRegion.id && share.seasonId == selectedSeason.id) {
                        filtered[shareId] = share
                    }
                    return filtered
                }, {})

                const filteredAddons = Object.keys(addonShares).reduce<Shares>((filtered, addonShareId) => {
                    const addonShare: Share = addonShares[addonShareId]
                    if (addonShare.regionId == selectedRegion.id && addonShare.seasonId == selectedSeason.id) {
                        filtered[addonShareId] = addonShare
                    }
                    return filtered
                }, {})

                return <div key={selectedSeasonId}>
                    <h3>{selectedSeason.label} Shares</h3>
                    <SelectShares shares={filteredShares} handleSelect={handleUpdateSelectedShares}/>
                    <SelectAddons addonShares={filteredAddons} handleSelect={handleUpdateSelectedAddonShares}/>
                </div>
            }) : ""}

            {/* Bundles */}
            {selectedRegion && Object.keys(selectedSeasons).length === Object.keys(seasons).length ?
                <SelectBundle bundles={bundles} bundleOptions={bundleOptions}
                              handleSelect={handleUpdateSelectedBundle}/>
                : ''}

            {/* Pickup Locations */}
            {selectedRegion && Object.keys(selectedShares).length && Object.keys(selectedSeasons).length ?
                Object.keys(selectedSeasons).map(selectedSeasonId => {
                    const selectedSeason = seasons[selectedSeasonId]
                    const locations = Object.keys(pickupLocations).reduce<PickupLocations>((filtered, locationId) => {
                        const location = pickupLocations[locationId]
                        if (location.seasonId === selectedSeason.id && location.regionId === selectedRegion.id) {
                            filtered[locationId] = pickupLocations[locationId]
                        }
                        return filtered
                    }, {});
                    return <div key={selectedSeasonId}>
                        <h3>Choose Your {selectedSeason.label} Pick Up Spot:</h3>
                        <div>
                            This will be your pickup location for the duration of the season.
                            NOTE: Locations and times are subject to change, so please watch your email.
                        </div>

                        <SelectPickupLocation pickupLocations={locations}
                                              handleSelect={handleChangeSelectedPickupLocation}/>
                    </div>
                })
                : ""}

            {/* Payment */}
            {total ?
                <>
                    <Total subtotal={subtotal} deliveryFee={deliveryFee} boxingFee={boxingFee} total={total}/>
                    <SelectPaymentOption paymentOptions={paymentOptions}
                                         handleUpdateSelectedPaymentOption={handleChangeSelectedPaymentOption}
                                         handleUpdateAmountToPay={handleChangeAmountToPay}
                    />
                    <SelectPaymentMethod paymentMethods={paymentMethods}
                                         handleUpdateSelectedPaymentMethod={handleChangeSelectedPaymentMethod}
                    />
                </>
                : ''}

            {/* Comments */}
            {selectedPaymentOption ?
                <>
                    <Comments hearAboutUsQuestions={hearAboutUsQuestions}
                              handleUpdateComments={handleChangeComments}
                              handleUpdateReferral={handleChangeReferral}
                              handleUpdateSelectedHearAboutUsQuestion={handleChangeSelectedHearAboutUsQuestion}
                    />
                    <ContactInfo setAddress1={setAddress1} setAddress2={setAddress2} setFirstName={setFirstName}
                                 setLastName={setLastName} setCity={setCity} setEmail={setEmail} setZip={setZip}
                                 setPhone={setPhone} setState={setState}/>
                </>
                : ""}

            {/* Submit */}
            {(email || phone) ?
                <input type={"submit"} onClick={handleSubmission} value={"Submit"}/>
                : ""}
        </>
    )
}

export default Signup;
