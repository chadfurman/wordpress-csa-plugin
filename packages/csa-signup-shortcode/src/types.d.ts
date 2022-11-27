export type RegionId = string
export type RegionLabel = string
export type Region = {
    id: RegionId,
    label: RegionLabel,
}
export type SelectedRegion = Region
export type Regions = Record<RegionId, Region>;
export type SeasonId = string
export type SeasonLabel = string
export type Season = {
    id: SeasonId,
    label: SeasonLabel
}
export type Seasons = Record<SeasonId, Season>
export type SelectedSeasons = Seasons
export type ShareLabel = string
export type ShareDescription = string
export type ShareId = string
export type AddonShareId = ShareId
export type Price = number
export type Share = {
    label: ShareLabel,
    description: ShareDescription,
    id: ShareId
    price: Price
    regionId: RegionId,
    seasonId: SeasonId
}
export type AddonShare = {
    label: ShareLabel,
    description: ShareDescription,
    id: AddonShareId
    price: Price
    regionId: RegionId,
    seasonId: SeasonId
}
export type Shares = Record<ShareId, Share>
export type SelectedShare = {
    shareId: ShareId
    quantity: number
}
export type AddonShares = Record<AddonShareId, AddonShare>
export type SelectedAddonShare = {
    shareId: AddonShareId
    quantity: number
}
export type SelectedBundle = {
    bundleId: BundleId
    bundleOptionId: BundleOptionId
}
export type SelectedShares = Record<ShareId, SelectedShare>
export type SelectedAddonShares = Record<AddonShareId, AddonSelectedShare>
export type PickupLocationId = string
export type PickupLocationLabel = string
export type PickupLocationDescription = string
export type AmountToPay = Price
export type Total = Price
export type Subtotal = Price
export type BoxingFee = Price
export type DeliveryFee = Price
export type PickupLocation = {
    id: PickupLocationId
    label: PickupLocationLabel
    description?: PickupLocationDescription
    boxingFee: BoxingFee
    deliveryFee: DeliveryFee
    regionId: RegionId
    seasonId: SeasonId
}
export type SelectedPickupLocation = PickupLocation
export type PickupLocations = Record<PickupLocationId, PickupLocation>
export type BundleId = string
export type BundleLabel = string
export type BundleDescription = string
export type Bundle = {
    id: BundleId
    label: BundleLabel
    description: BundleDescription
    season_ids: SeasonId[],
    region_id: RegionId,
    bundle_option_ids: BundleOptionId[]
}
export type Bundles = Record<BundleId, Bundle>
export type BundleOptionId = string
export type BundleOptionLabel = string
export type BundleOptionDescription = string
export type BundleOptionPrice = number
export type BundleOption = {
    id: BundleOptionId
    label: BundleOptionLabel
    description: BundleOptionDescription
    price: BundleOptionPrice
}
export type BundleOptions = Record<BundleOptionId, BundleOption>
export type PaymentOptionId = string
export type PaymentOptionLabel = string
export type PaymentOption = {
    id: PaymentOptionId,
    label: PaymentOptionLabel
}
export type PaymentOptions = Record<PaymentOptionId, PaymentOption>
export type SelectedPaymentOption = PaymentOption
export type FirstName = string
export type LastName = string
export type Phone = string
export type Email = string
export type StreetAddress = string
export type Address1 = StreetAddress
export type Address2 = StreetAddress
export type City = string
export type State = string
export type Zip = string
export type Comments = string;
export type HearAboutUsQuestionId = string;
export type HearAboutUsQuestionLabel = string;
export type HearAboutUsQuestion = {
    id: HearAboutUsQuestionId
    label: HearAboutUsQuestionLabel
};
export type SelectedHearAboutUsQuestion = HearAboutUsQuestion
export type HearAboutUsQuestions = Record<HearAboutUsQuestionId, HearAboutUsQuestion>;
export type Referral = string
export type PaymentMethodId = string
export type PaymentMethodLabel = string
export type PaymentMethod = {
    id: PaymentMethodId,
    label: PaymentMethodLabel,
}
export type PaymentMethods = Record<PaymentMethodId, PaymentMethod>
export type SelectedPaymentMethod = PaymentMethod
export type SignupFormData = {
    firstName?: FirstName
    lastName?: LastName
    phone?: Phone
    selectedRegion?: SelectedRegion,
    selectedSeasons?: SelectedSeasons,
    selectedShares?: SelectedShares,
    selectedAddonShares?: SelectedAddonShares,
    selectedBundle?: SelectedBundle,
    selectedPickupLocation?: SelectedPickupLocation,
    selectedPaymentOption?: SelectedPaymentOption,
    selectedPaymentMethod?: SelectedPaymentMethod,
    amountToPay?: AmountToPay,
    subtotal?: Subtotal,
    total?: Total,
    boxingFee?: BoxingFee,
    deliveryFee?: DeliveryFee,
    comments?: Comments,
    selectedHearAboutUsQuestion?: SelectedHearAboutUsQuestion,
    referral?: Referral,
    firstName?: FirstName,
    lastName?: LastName,
    phone?: Phone,
    email?: Email,
    address1?: Address1,
    address2?: Address2,
    city?: City,
    state?: State,
    zip?: Zip,
}
