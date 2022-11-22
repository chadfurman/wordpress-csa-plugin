import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPaymentMethod from "../SelectPaymentMethod";
import {paymentMethods, paymentOptions} from "../../../data/constants";

describe("SelectPaymentMethod", () => {
    it("Allows us to specify a payment method", () => {
        const fakeHandle = jest.fn()
        render(<SelectPaymentMethod paymentMethods={paymentMethods} handleUpdateSelectedPaymentMethod={fakeHandle}/>)
        const optionId = Object.keys(paymentMethods)[0]
        const option = paymentMethods[optionId]
        const optionElement = screen.getByLabelText(option.label)
        optionElement.click()
        expect(fakeHandle).toBeCalledWith(option)
    })
    it("Allows us to un-specify payment method", () => {
        const fakeHandle = jest.fn()
        render(<SelectPaymentMethod paymentMethods={paymentMethods} handleUpdateSelectedPaymentMethod={fakeHandle}/>)
        const optionId = Object.keys(paymentMethods)[0]
        const option = paymentMethods[optionId]
        const optionElement = screen.getByLabelText(option.label)
        optionElement.click()
        optionElement.click()
        expect(fakeHandle).toHaveBeenLastCalledWith(undefined)
    })
    it("Allows us to specify only one payment method", () => {
        const fakeHandle = jest.fn()
        render(<SelectPaymentMethod paymentMethods={paymentMethods} handleUpdateSelectedPaymentMethod={fakeHandle}/>)
        const optionId = Object.keys(paymentMethods)[0]
        const option = paymentMethods[optionId]
        const optionElement = screen.getByLabelText(option.label)
        optionElement.click()
        const option2Id = Object.keys(paymentMethods)[1]
        const option2 = paymentMethods[option2Id]
        const option2Element = screen.getByLabelText(option2.label)
        option2Element.click()
        expect(fakeHandle).toHaveBeenLastCalledWith(option2)
    })
})