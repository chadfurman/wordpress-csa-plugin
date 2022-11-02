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
        const subtotalText = screen.getByText(/Subtotal/i)
        expect(subtotalText).toBeInTheDocument()
        const subtotal = screen.getByText(/\$10.10/)
        expect(subtotal).toBeInTheDocument()
    })
    it("Displays the delivery fee, if present", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} deliveryFee={DELIVERY_FEE} total={TOTAL}/>)
        const deliveryFeeText = screen.getByText(/Delivery Fee/i)
        expect(deliveryFeeText).toBeInTheDocument()
        const fee = screen.getByText(/\$12.30/)
        expect(fee).toBeInTheDocument()
    })
    it("Does not display the delivery fee, if not present", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} total={TOTAL}/>)
        const deliveryFeeText = screen.queryByText(/Delivery Fee/i)
        expect(deliveryFeeText).toBeNull()
        const fee = screen.queryByText(/\$12.30/)
        expect(deliveryFeeText).toBeNull()
    })
    it("Displays the boxing fee, if present", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} deliveryFee={DELIVERY_FEE} total={TOTAL}/>)
        const boxingFeeText = screen.getByText(/Boxing Fee/i)
        expect(boxingFeeText).toBeInTheDocument()
        const fee = screen.getByText(/\$12.30/)
        expect(fee).toBeInTheDocument()
    })
    it("Does not display the boxing fee, if not present", () => {
        render(<Total subtotal={SUBTOTAL} deliveryFee={DELIVERY_FEE} total={TOTAL}/>)
        const boxingFeeText = screen.queryByText(/Boxing Fee/i)
        expect(boxingFeeText).toBeNull()
        const fee = screen.queryByText(/\$12.30/)
        expect(boxingFeeText).toBeNull()
    })
    it("Displays the total without boxing or delivery fee", () => {
        render(<Total subtotal={SUBTOTAL} total={TOTAL - BOXING_FEE - DELIVERY_FEE}/>)
        const totalText = screen.getByText(/Total/i)
        expect(totalText).toBeInTheDocument()
        const total = screen.getByText(/\$10.10/)
        expect(total).toBeInTheDocument()
    })
    it("Displays the total with boxing fee", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} total={TOTAL - DELIVERY_FEE}/>)
        const totalText = screen.getByText(/Total/)
        expect(totalText).toBeInTheDocument()
        const total = screen.getByText(/\$21.30/)
        expect(total).toBeInTheDocument()
    })
    it("Displays the total with delivery fee", () => {
        render(<Total subtotal={SUBTOTAL} deliveryFee={DELIVERY_FEE} total={TOTAL - BOXING_FEE}/>)
        const totalText = screen.getByText(/Total/)
        expect(totalText).toBeInTheDocument()
        const total = screen.getByText(/\$22.40/)
        expect(total).toBeInTheDocument()
    })
    it("Displays the total with boxing and delivery fee", () => {
        render(<Total subtotal={SUBTOTAL} boxingFee={BOXING_FEE} deliveryFee={DELIVERY_FEE} total={TOTAL}/>)
        const totalText = screen.getByText(/Total/)
        expect(totalText).toBeInTheDocument()
        const total = screen.getByText(/\$33.60/)
        expect(total).toBeInTheDocument()
    })
})