import React from 'react';
import { render, screen } from '@testing-library/react';
import Total, {CURRENCY_FORMATTER} from "../Total";

const SUBTOTAL =  10.1
const BOXING_FEE =  11.2
const DELIVERY_FEE = 12.3
const TOTAL = 33.6

describe("Total", () => {
    it("Displays the subtotal", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} deliveryFee={DELIVERY_FEE} total={TOTAL}/>)
        const subtotal = screen.getByText(/\$10.10/)
        expect(subtotal).toBeInTheDocument()
    })
    it("Displays the delivery fee, if present", () => {
        expect(true).toBe(false)
    })
    it("Does not display the delivery fee, if not present", () => {
        expect(true).toBe(false)
    })
    it("Displays the boxing fee, if present", () => {
        expect(true).toBe(false)
    })
    it("Does not display the boxing fee, if not present", () => {
        expect(true).toBe(false)
    })
    it("Displays the total without boxing or delivery fee", () => {
        expect(true).toBe(false)
    })
    it("Displays the total with boxing fee", () => {
        expect(true).toBe(false)
    })
    it("Displays the total with delivery fee", () => {
        expect(true).toBe(false)
    })
    it("Displays the total with boxing and delivery fee", () => {
        expect(true).toBe(false)
    })
})