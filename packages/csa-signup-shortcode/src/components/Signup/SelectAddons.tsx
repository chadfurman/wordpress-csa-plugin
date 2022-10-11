import {Region, Season, SelectedShare, Share, ShareId, Shares} from "../../types";

interface SelectAddonsProps {
    addonShares: Shares
    handleSelect: (share: Share, quantity: SelectedShare["quantity"]) => void
}
const SelectAddons = ({addonShares, handleSelect}: SelectAddonsProps) => {
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shareId: ShareId = e.target.getAttribute('data-share-id') || "missing-share-id-from-quantity-input"
        const quantity: number = parseInt(e.target.value)
        handleSelect(addonShares[shareId], quantity)
    }
    return <>
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

export default SelectAddons