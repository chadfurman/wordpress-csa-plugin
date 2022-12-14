import {useState} from "react";
import {PaymentOption, PaymentOptionId, PaymentOptions, Price} from "../../types";

interface SelectPaymentOptionProps {
    paymentOptions: PaymentOptions
    handleUpdateSelectedPaymentOption: (paymentOption?: PaymentOption) => void,
    handleUpdateAmountToPay: (amountToPay: Price) => void,
}
function SelectPaymentOption({paymentOptions, handleUpdateSelectedPaymentOption, handleUpdateAmountToPay}: SelectPaymentOptionProps) {
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption>()
    const handleChangePaymentOption = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const paymentOptionId: PaymentOptionId = e.currentTarget.getAttribute('data-payment-option-id') || "missing-payment-option-id-from-radio"
        const paymentOption: PaymentOption = paymentOptions[paymentOptionId]
        if (selectedPaymentOption && selectedPaymentOption.id === paymentOptionId) {
            setSelectedPaymentOption(undefined)
            handleUpdateSelectedPaymentOption(undefined)
        } else {
            setSelectedPaymentOption(paymentOption)
            handleUpdateSelectedPaymentOption(paymentOption)
        }
    }
    const handleChangeAmountToPay = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const amountToPay = parseInt(e.currentTarget.value)
        handleUpdateAmountToPay(amountToPay)
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
                                <input data-payment-option-id={paymentOption.id} defaultChecked={(selectedPaymentOption && selectedPaymentOption.id == paymentOption.id) || false} onClick={handleChangePaymentOption} type="radio"/>
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
                <input type="number" min={0} onChange={handleChangeAmountToPay}/>
            </label>
        </div>
    </>;
}

export default SelectPaymentOption