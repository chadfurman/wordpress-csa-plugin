import React from 'react';
import {render, screen} from '@testing-library/react';
import {addonShares} from '../../../data/constants';
import SelectAddons from '../SelectAddons';
import userEvent from '@testing-library/user-event';
import {escapeRegex} from "../../../testUtils";

describe("SelectAddons", () => {
    it("Allows us to specify a quantity of an addon share", () => {
        const mockHandleSelect = jest.fn()
        const share = addonShares["1"]
        const quantity = "2"
        render(<SelectAddons addonShares={addonShares} handleSelect={mockHandleSelect} />)
        const shareOption = screen.getByLabelText(new RegExp(escapeRegex(share.label)))
        userEvent.type(shareOption, quantity)
        expect(mockHandleSelect).toHaveBeenCalledWith(share, parseInt(quantity))
    })
    it("Allows us to un-specify a quantity of an addon share", () => {
        const mockHandleSelect = jest.fn()
        const share = addonShares["1"]
        const quantity = "2"
        render(<SelectAddons addonShares={addonShares} handleSelect={mockHandleSelect} />)
        const shareOption = screen.getByLabelText(new RegExp(escapeRegex(share.label)))
        userEvent.type(shareOption, quantity)
        userEvent.clear(shareOption)
        expect(mockHandleSelect).toHaveBeenLastCalledWith(share, 0)
    })
    it("Allows us to specify a quantity of multiple addon shares", () => {
        const mockHandleSelect = jest.fn()
        const share1 = addonShares["1"]
        const share2 = addonShares["2"]
        const quantity1 = "2"
        const quantity2 = "3"
        render(<SelectAddons addonShares={addonShares} handleSelect={mockHandleSelect} />)
        const shareOption1 = screen.getByLabelText(new RegExp(escapeRegex(share1.label)))
        const shareOption2 = screen.getByLabelText(new RegExp(escapeRegex(share2.label)))
        userEvent.type(shareOption1, quantity1)
        userEvent.type(shareOption2, quantity2)
        expect(mockHandleSelect).toHaveBeenCalledWith(share1, parseInt(quantity1))
        expect(mockHandleSelect).toHaveBeenCalledWith(share2, parseInt(quantity2))
    })
})