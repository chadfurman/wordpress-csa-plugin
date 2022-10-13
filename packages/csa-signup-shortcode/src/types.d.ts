export type RegionId = string
export type RegionLabel = string
export type Region = {
    id: RegionId,
    label: RegionLabel,
}
export type Regions = Record<RegionId, Region>;
export type SeasonId = string
export type SeasonLabel = string
export type Season = {
    id: SeasonId,
    label: SeasonLabel
}
export type Seasons = Record<SeasonId, Season>
export type ShareLabel = string
export type ShareDescription = string
export type ShareId = string
export type Price = number
export type Share = {
    label: ShareLabel,
    description: ShareDescription,
    id: ShareId
    price: Price
    regionId: RegionId,
    seasonId: SeasonId
}
export type Shares = Record<ShareId, Share>
export type SelectedShare = {
    shareId: ShareId
    quantity: number
}
export type SelectedBundle = {
    bundleId: BundleId
    bundleOptionId: BundleOptionId
}
export type SelectedShares = Record<ShareId, SelectedShare>
export type PickupLocationId = string
export type PickupLocationLabel = string
export type PickupLocationDescription = string
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
}
export type Bundles = Record<BundleId, Bundle>
export type BundleOptionId = string
export type BundleOptionLabel = string
export type BundleOptionDescription = string
export type BundleOptionPrice = number
export type BundleOption = {
    id: BundleOptionId
    bundle_id: BundleId
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