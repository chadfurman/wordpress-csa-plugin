import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectPickupLocation from "../SelectPIckupLocation";
import {pickupLocations} from "../../../data/constants";

describe("SelectPickupLocation", () => {
    it("Allows us to specify a pickup location", () => {
        render(<SelectPickupLocation pickupLocations={pickupLocations} handleSelect={})
        expect(true).toBe(false)
    })
    it("Allows us to un-specify pickup location", () => {
        expect(true).toBe(false)
    })
    it("Allows us to specify only one pickup location", () => {
        expect(true).toBe(false)
    })
})