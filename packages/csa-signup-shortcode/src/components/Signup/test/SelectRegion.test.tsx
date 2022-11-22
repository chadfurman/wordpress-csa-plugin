import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectRegion from '../SelectRegion'
import {regions} from "../../../data/constants";

describe('SelectRegion', () => {
    it("Allows you to select a region", () => {
        const fakeSelectRegion = jest.fn()
        render(<SelectRegion regions={regions} handleSelect={fakeSelectRegion}></SelectRegion>)
        const firstRegionId = Object.keys(regions)[0]
        const firstRegion = regions[firstRegionId]
        const firstRegionElement = screen.getByText(firstRegion.label)
        firstRegionElement.click()
        expect(fakeSelectRegion).toBeCalledWith(firstRegion)
    })
    it("Does not allow you to select two regions",  () => {
        const fakeSelectRegion = jest.fn()
        render(<SelectRegion regions={regions} handleSelect={fakeSelectRegion}></SelectRegion>)
        const firstRegionId = Object.keys(regions)[0]
        const firstRegion = regions[firstRegionId]
        const firstRegionElement = screen.getByText(firstRegion.label)
        firstRegionElement.click()
        const secondRegionId = Object.keys(regions)[0]
        const secondRegion = regions[secondRegionId]
        const secondRegionElement = screen.getByText(secondRegion.label)
        secondRegionElement.click()
        expect(fakeSelectRegion).toHaveBeenLastCalledWith(secondRegion)
    })
    it("Allows you to unselect your region", () => {
        const fakeSelectRegion = jest.fn()
        render(<SelectRegion regions={regions} handleSelect={fakeSelectRegion}></SelectRegion>)
        const firstRegionId = Object.keys(regions)[0]
        const firstRegion = regions[firstRegionId]
        const firstRegionElement = screen.getByText(firstRegion.label)
        firstRegionElement.click()
        firstRegionElement.click()
        expect(fakeSelectRegion).toHaveBeenLastCalledWith(undefined)
    })
})