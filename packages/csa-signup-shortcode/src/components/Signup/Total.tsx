import {Price} from "../../types";

export const CURRENCY_FORMATTER = Intl.NumberFormat('en-us', {style: "currency", currency: "USD"})

interface TotalProps {
    subtotal: Price
    boxingFee: Price
    deliveryFee: Price
    total: Price
}
function Total({subtotal, boxingFee, deliveryFee, total}: TotalProps) {
    return (
        <>
            <h3>Cost</h3>
            {boxingFee || deliveryFee ?
                <div>Subtotal: {CURRENCY_FORMATTER.format(subtotal)}</div>
                : "" }
            {boxingFee ?
                <div>Boxing Fee: {CURRENCY_FORMATTER.format(boxingFee)}</div>
                : ""}
            {deliveryFee ?
                <div>Delivery Fee: {CURRENCY_FORMATTER.format(deliveryFee)}</div>
                : "" }
            <div>Total: {CURRENCY_FORMATTER.format(total)}</div>
        </>
    )
}

export default Total