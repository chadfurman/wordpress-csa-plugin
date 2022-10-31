import {Season, SelectedShare, Share, ShareId, Shares} from "../../types";

interface SelectSharesProps {
    shares: Shares
    handleSelect: (share: Share, quantity: SelectedShare["quantity"]) => void
}
const SelectShares = ({shares, handleSelect}: SelectSharesProps) => {
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const shareId: ShareId = e.target.getAttribute('data-share-id') || "missing-share-id-from-quantity-input"
        const quantity: number = parseInt(e.target.value)
        handleSelect(shares[shareId], quantity)
    }
    return <>
        <ul>
            {Object.keys(shares).map(shareId => {
                const share = shares[shareId]
                return (
                    <li key={shareId}>
                        <label>
                            {share.label}
                            <div>{share.description}</div>
                            <div>
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

export default SelectShares