import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectShares from "../SelectShares";
import {shares} from "../../../data/constants";
import userEvent from '@testing-library/user-event';

describe("SelectShares", () => {
    it("Allows us to specify a quantity of a share", () => {
        const mockHandleSelect = jest.fn()
        render(<SelectShares shares={shares} handleSelect={mockHandleSelect} />)
        const shareLabelRegex = new RegExp(shares[1].label.replace(/\(/, "\\(").replace(/\)/, "\\)"))
        const share = screen.getByLabelText(shareLabelRegex)
        userEvent.type(share, "5")
        expect(mockHandleSelect).toBeCalledWith(shares[1], 5)
    })
    it("Allows us to un-specify a quantity of a share", () => {
        const mockHandleSelect = jest.fn()
        render(<SelectShares shares={shares} handleSelect={mockHandleSelect} />)
        const shareLabelRegex = new RegExp(shares[1].label.replace(/\(/, "\\(").replace(/\)/, "\\)"))
        const share = screen.getByLabelText(shareLabelRegex)
        userEvent.type(share, "5")
        expect(mockHandleSelect).toBeCalledWith(shares[1], 5)
        userEvent.clear(share)
        expect(mockHandleSelect).toHaveBeenLastCalledWith(shares[1], 0)
    })
    it("Allows us to specify a quantity of multiple shares", () => {
        const mockHandleSelect = jest.fn()
        render(<SelectShares shares={shares} handleSelect={mockHandleSelect} />)
        const shareLabelRegex = new RegExp(shares[1].label.replace(/\(/, "\\(").replace(/\)/, "\\)"))
        const share = screen.getByLabelText(shareLabelRegex)
        userEvent.type(share, "5")
        const shareLabelRegex2 = new RegExp(shares[2].label.replace(/\(/, "\\(").replace(/\)/, "\\)"))
        const share2 = screen.getByLabelText(shareLabelRegex2)
        userEvent.type(share2, "1")
        expect(mockHandleSelect).toBeCalledWith(shares[1], 5)
        expect(mockHandleSelect).toBeCalledWith(shares[2], 1)
    })
})