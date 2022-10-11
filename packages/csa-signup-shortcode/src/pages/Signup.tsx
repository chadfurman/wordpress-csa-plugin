import * as React from 'react'
import {useEffect, useState} from 'react'
import WelcomeText from "../components/Signup/WelcomeText";
import {
    Bundle,
    BundleOption, City,
    Email,
    FirstName, LastName, PaymentMethod,
    PaymentOption,
    Phone, PickupLocation, Price, Referral, Region,
    Seasons,
    Shares,
    SelectedBundle, SelectedHearAboutUsQuestion, SelectedPaymentMethod,
    SelectedPaymentOption, SelectedPickupLocation, SelectedShares, Share, State, StreetAddress,
    Zip
} from "../types";
import {
    addonShares, bundleOptions,
    bundles,
    hearAboutUsQuestions,
    paymentMethods,
    paymentOptions,
    pickupLocations,
    regions, seasons,
    shares
} from "../data/constants";
import SelectShares from "../components/Signup/SelectShares";
import SelectRegion from "../components/Signup/SelectRegion";
import SelectPickupLocation from "../components/Signup/SelectPIckupLocation";
import SelectAddons from "../components/Signup/SelectAddons";
import selectRegion from "../components/Signup/SelectRegion";

function Signup() {
    const welcomeText = `
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
    const [selectedSeasons, handleChangeSelectedSeasons] = useState<Seasons>({})
    const [selectedShares, handleChangeSelectedShares] = useState<SelectedShares>({})
    const [selectedAddonShares, handleChangeSelectedAddonShares] = useState<SelectedShares>({})
    const [selectedBundle, handleChangeSelectedBundle] = useState<SelectedBundle>()
    const [selectedPickupLocation, handleChangeSelectedPickupLocation] = useState<SelectedPickupLocation>()
    const [selectedPaymentOption, handleChangeSelectedPaymentOption] = useState<SelectedPaymentOption>()
    const [selectedPaymentMethod, handleChangeSelectedPaymentMethod] = useState<SelectedPaymentMethod>()
    const [amountToPay, handleChangeAmountToPay] = useState<Price>(0.0)
    const [subtotal, handleChangeSubtotal] = useState<Price>(0.0)
    const [total, handleChangeTotal] = useState<Price>(0.0)
    const [boxingFee, handleChangeBoxingFee] = useState<Price>(0.0)
    const [deliveryFee, handleChangeDeliveryFee] = useState<Price>(0.0)
    const [comments, handleChangeComments] = useState<Comments>('')
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
        handleChangeSelectedShares(selectedShares => ({
            ...selectedShares,
            [share.id]: {
                shareId: share.id,
                quantity: quantity
            }
        }))
    }
    const handleUpdateSelectedAddonShares = (share: Share, quantity: number) => {
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
    const unsetSelectedPaymentMethod = () => {
        handleChangeSelectedPaymentMethod(undefined)
    }
    const handleUpdateSelectedPaymentMethod = (paymentMethod: PaymentMethod) => {
        handleChangeSelectedPaymentMethod(paymentMethod)
    }
    const handleUpdateAmountToPay = (amountToPay: Price) => {
        handleChangeAmountToPay(amountToPay)
    }
    const handleUpdateComments = (comments: Comments) => {
        handleChangeComments(comments)
    }
    const handleUpdateSelectedHearAboutUsQuestion = (selectedHearAboutUsQuestion: SelectedHearAboutUsQuestion) => {
        handleChangeSelectedHearAboutUsQuestion(selectedHearAboutUsQuestion)
    }
    const unsetSelectedHearAboutUsQuestion = () => {
        handleChangeSelectedHearAboutUsQuestion(undefined)
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

    const handleSubmission = () => {
        const formData = {
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
        console.log("Submission Data:", formData)
    }

    return (
        <>
            <WelcomeText welcomeTextWithHtml={welcomeText}/>
            <SelectRegion regions={regions} handleSelect={handleChangeSelectedRegion}/>
            { selectedRegion ? <SignupSeasons seasons={seasons} handleSelect={handleChangeSelectedSeasons} /> : '' }
            { selectedRegion ? Object.keys(selectedSeasons).map(selectedSeasonId => {
                const selectedSeason = seasons[selectedSeasonId]
                const filteredShares = Object.keys(shares).reduce<Shares>((filtered, shareId) => {
                    const share: Share = shares[shareId]
                    if (share.regionId == selectedRegion.id && share.seasonId == selectedSeason.id) {
                        filtered[shareId] = share
                    }
                    return filtered
                }, {})
                const filteredAddons = Object.keys(addonShares).reduce<Shares>((filtered, shareId) => {
                    const share: Share = shares[shareId]
                    if (share.regionId == selectedRegion.id && share.seasonId == selectedSeason.id) {
                        filtered[shareId] = share
                    }
                    return filtered
                }, {})
                return <div key={selectedSeasonId}>
                    <h3>{selectedSeason.label} Shares</h3>
                    <SelectShares shares={filteredShares} handleSelect={handleUpdateSelectedShares} />
                    <SelectAddons addonShares={filteredAddons} handleSelect={handleUpdateSelectedAddonShares} />
                </div>
            }) : ""}
            { selectedRegion && Object.keys(selectedSeasons).length === Object.keys(seasons).length ?
                <SignupBundles bundles={bundles} bundleOptions={bundleOptions} selectedRegion={selectedRegion} selectedSeasons={selectedSeasons} selectedBundle={selectedBundle} handleUpdateSelectedBundle={handleUpdateSelectedBundle} unsetSelectedBundle={unsetSelectedBundle} />
            : '' }
            {Object.keys(selectedShares).length && Object.keys(selectedSeasons).length ?
                Object.keys(selectedSeasons).map(selectedSeasonId => {
                    const selectedSeason = seasons[selectedSeasonId]
                    return <div key={selectedSeasonId}>
                        <h3>Choose Your {selectedSeason.label} Pick Up Spot:</h3>
                        <div>
                            This will be your pickup location for the duration of the season.
                            NOTE: Locations and times are subject to change, so please watch your email.
                        </div>
                        <SelectPickupLocation pickupLocations={pickupLocations} handleSelect={handleUpdateSelectedPickupLocation} />
                    </div>
                })
            : ""}
            { total ?
                <>
                    <Total subtotal={subtotal} deliveryFee={deliveryFee} boxingFee={boxingFee} total={total} />
                    <SignupPaymentOptions paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={handleUpdateSelectedPaymentOption} selectedPaymentOption={selectedPaymentOption} unsetSelectedPaymentOption={unsetSelectedPaymentOption} handleUpdateAmountToPay={handleUpdateAmountToPay}/>
                    <SignupPaymentMethods paymentMethods={paymentMethods} handleUpdateSelectedPaymentMethod={handleUpdateSelectedPaymentMethod} selectedPaymentMethod={selectedPaymentMethod} unsetSelectedPaymentMethod={unsetSelectedPaymentMethod}/>
                </>
            : ''}
            { selectedPaymentOption ?
                <>
                    <Comments hearAboutUsQuestions={hearAboutUsQuestions} selectedHearAboutUsQuestion={selectedHearAboutUsQuestion} handleUpdateComments={handleUpdateComments} handleUpdateSelectedHearAboutUsQuestion={handleUpdateSelectedHearAboutUsQuestion} unsetSelectedHearAboutUsQuestion={unsetSelectedHearAboutUsQuestion} handleUpdateReferral={handleChangeReferral}/>
                    <ContactInfo setAddress1={setAddress1} setAddress2={setAddress2} setFirstName={setFirstName} setLastName={setLastName} setCity={setCity} setEmail={setEmail} setZip={setZip} setPhone={setPhone} setState={setState}/>
                </>
            : ""}
            { (address1 || city || state || zip || firstName || lastName) ?
                <input type={"submit"} onClick={handleSubmission}/>
            : ""}
        </>
    )
}

export default Signup;
