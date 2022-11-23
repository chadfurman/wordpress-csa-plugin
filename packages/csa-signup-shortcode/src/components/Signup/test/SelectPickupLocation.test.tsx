import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPickupLocation from "../SelectPickupLocation";
import {pickupLocations} from "../../../data/constants";
import userEvent from '@testing-library/user-event';

describe("SelectPickupLocation", () => {
    it("Allows us to specify a pickup location", () => {
        const mockHandler = jest.fn()
        const targetOption = pickupLocations["1"]
        render(<SelectPickupLocation pickupLocations={pickupLocations} handleSelect={mockHandler} />)
        const option = screen.getByLabelText(targetOption.label)
        userEvent.click(option)
        expect(mockHandler).toHaveBeenCalledWith(targetOption)
    })
    it("Allows us to un-specify pickup location", () => {
        const mockHandler = jest.fn()
        const targetOption = pickupLocations["1"]
        render(<SelectPickupLocation pickupLocations={pickupLocations} handleSelect={mockHandler} />)
        const option = screen.getByLabelText(targetOption.label)
        userEvent.click(option)
        userEvent.click(option)
        expect(mockHandler).toHaveBeenCalledWith(undefined)
    })
    it("Allows us to specify only one pickup location", () => {
        const mockHandler = jest.fn()
        const targetOption1 = pickupLocations["1"]
        const targetOption2 = pickupLocations["2"]
        render(<SelectPickupLocation pickupLocations={pickupLocations} handleSelect={mockHandler} />)
        const option1 = screen.getByLabelText(targetOption1.label)
        const option2 = screen.getByLabelText(targetOption2.label)
        userEvent.click(option1)
        userEvent.click(option2)
        expect(mockHandler).toHaveBeenLastCalledWith(targetOption2)
    })
})