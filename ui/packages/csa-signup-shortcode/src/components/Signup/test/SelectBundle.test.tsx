import React from 'react';
import {render, screen} from '@testing-library/react';
import SelectBundle from "../SelectBundle";
import {bundleOptions, bundles} from "../../../data/constants";

describe("SelectBundle", () => {
    it("Allows us to specify a bundle", () => {
        const fakeHandle = jest.fn()
        render(<SelectBundle bundles={bundles} handleSelect={fakeHandle} bundleOptions={bundleOptions}/>)
        const firstBundleId = Object.keys(bundles)[0]
        const firstBundle = bundles[firstBundleId]
        const firstBundleOptionId = firstBundle.bundle_option_ids[0]
        const firstBundleOption = bundleOptions[firstBundleOptionId]
        const firstElement = screen.getByTestId(`bundle-${firstBundle.id}+option-${firstBundleOption.id}`)
        firstElement.click()
        expect(fakeHandle).toBeCalledWith(firstBundle, firstBundleOption)
    })
    it("Allows us to un-specify bundle", () => {
        const fakeHandle = jest.fn()
        render(<SelectBundle bundles={bundles} handleSelect={fakeHandle} bundleOptions={bundleOptions}/>)
        const firstBundleId = Object.keys(bundles)[0]
        const firstBundle = bundles[firstBundleId]
        const firstBundleOptionId = firstBundle.bundle_option_ids[0]
        const firstBundleOption = bundleOptions[firstBundleOptionId]
        const firstElement = screen.getByTestId(`bundle-${firstBundle.id}+option-${firstBundleOption.id}`)
        firstElement.click()
        firstElement.click()
        expect(fakeHandle).toHaveBeenLastCalledWith(undefined, undefined)
    })
    it("Allows us to specify only one bundle", () => {
        const fakeHandle = jest.fn()
        render(<SelectBundle bundles={bundles} handleSelect={fakeHandle} bundleOptions={bundleOptions}/>)
        const firstBundleId = Object.keys(bundles)[0]
        const firstBundle = bundles[firstBundleId]
        const firstBundleOptionId = firstBundle.bundle_option_ids[0]
        const firstBundleOption = bundleOptions[firstBundleOptionId]
        const firstElement = screen.getByTestId(`bundle-${firstBundle.id}+option-${firstBundleOption.id}`)
        const secondBundleId = Object.keys(bundles)[1]
        const secondBundle = bundles[secondBundleId]
        const secondBundleOptionId = secondBundle.bundle_option_ids[0]
        const secondBundleOption = bundleOptions[secondBundleOptionId]
        const secondElement = screen.getByTestId(`bundle-${secondBundle.id}+option-${secondBundleOption.id}`)
        firstElement.click()
        secondElement.click()
        expect(fakeHandle).toHaveBeenLastCalledWith(secondBundle, secondBundleOption)
    })
})