import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPaymentOption from "../SelectPaymentOption";
import {paymentOptions} from "../../../data/constants";
import userEvent from '@testing-library/user-event';
import {escapeRegex} from "../../../testUtils";

describe("SelectPaymentOption", () => {
    it("Allows us to specify a payment option", () => {
        const fakeHandleChangePaymentOption = jest.fn()
        const fakeHandleChangeAmountToPay = jest.fn()
        render(<SelectPaymentOption paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={fakeHandleChangePaymentOption} handleUpdateAmountToPay={fakeHandleChangeAmountToPay}/>)
        const targetOption = paymentOptions["1"]
        const element = screen.getByLabelText(new RegExp(escapeRegex(targetOption.label)))
        userEvent.click(element)
        expect(fakeHandleChangePaymentOption).toBeCalledWith(targetOption)
    })
    it("Allows us to un-specify payment option", () => {
        const fakeHandleChangePaymentOption = jest.fn()
        const fakeHandleChangeAmountToPay = jest.fn()
        render(<SelectPaymentOption paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={fakeHandleChangePaymentOption} handleUpdateAmountToPay={fakeHandleChangeAmountToPay}/>)
        const targetOption = paymentOptions["1"]
        const element = screen.getByLabelText(new RegExp(escapeRegex(targetOption.label)))
        userEvent.click(element)
        userEvent.click(element)
        expect(fakeHandleChangePaymentOption).toHaveBeenLastCalledWith(undefined)
    })
    it("Allows us to specify only one payment option", () => {
        const fakeHandleChangePaymentOption = jest.fn()
        const fakeHandleChangeAmountToPay = jest.fn()
        render(<SelectPaymentOption paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={fakeHandleChangePaymentOption} handleUpdateAmountToPay={fakeHandleChangeAmountToPay}/>)
        const targetOption = paymentOptions["1"]
        const element = screen.getByLabelText(new RegExp(escapeRegex(targetOption.label)))
        const targetOption2 = paymentOptions["2"]
        const element2 = screen.getByLabelText(new RegExp(escapeRegex(targetOption2.label)))
        userEvent.click(element)
        userEvent.click(element2)
        expect(fakeHandleChangePaymentOption).toBeCalledWith(targetOption2)
    })
    it("Allows us to specify the amount we commit to paying today", () => {
        const fakeHandleChangePaymentOption = jest.fn()
        const fakeHandleChangeAmountToPay = jest.fn()
        const payment = "1000"
        render(<SelectPaymentOption paymentOptions={paymentOptions} handleUpdateSelectedPaymentOption={fakeHandleChangePaymentOption} handleUpdateAmountToPay={fakeHandleChangeAmountToPay}/>)
        const element = screen.getByLabelText(new RegExp("commit to pay"))
        userEvent.type(element, payment)
        expect(fakeHandleChangeAmountToPay).toBeCalledWith(parseInt(payment))
    })
})