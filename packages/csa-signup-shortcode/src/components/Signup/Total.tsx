import {Price} from "../../types";

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

export default Total