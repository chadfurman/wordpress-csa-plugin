import {PaymentMethod, PaymentMethodId, PaymentMethods, SelectedPaymentMethod} from "../../types";

interface SelectPaymentMethodProps {
    paymentMethods: PaymentMethods,
    handleUpdateSelectedPaymentMethod: (selectedPaymentMethood: SelectedPaymentMethod) => void,
}
function SelectPaymentMethod({paymentMethods, selectedPaymentMethod, handleUpdateSelectedPaymentMethod, unsetSelectedPaymentMethod}: SelectPaymentMethodProps) {
    const handleChangeSelectedPaymentMethod = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const paymentMethodId: PaymentMethodId = e.currentTarget.getAttribute('data-payment-method-id') || "missing-payment-method-id-from-radio"
        const paymentMethod: PaymentMethod = paymentMethods[paymentMethodId]
        console.log("change method")
        if (selectedPaymentMethod && selectedPaymentMethod.id === paymentMethodId) {
            unsetSelectedPaymentMethod();
        } else {
            handleUpdateSelectedPaymentMethod(paymentMethod)
        }
    }
    return <>
        <h3>Payment Method</h3>
        <div>Please choose your payment method. SNAP/EBT available with sign up- please email thefarmers@redfirefarm.com to request SNAP/EBT CSA signup forms</div>
        <ul>
            {Object.keys(paymentMethods).map(paymentMethodId => {
                const paymentMethod = paymentMethods[paymentMethodId]
                return <li key={paymentMethodId}>
                    <label>
                        <input type="radio" data-payment-method-id={paymentMethodId} checked={(selectedPaymentMethod && selectedPaymentMethod.id == paymentMethodId) || false} onClick={handleChangeSelectedPaymentMethod} onChange={handleChangeSelectedPaymentMethod} />
                        {paymentMethod.label}
                    </label>
                </li>
            })}
        </ul>
    </>
}

export default SelectPaymentMethod