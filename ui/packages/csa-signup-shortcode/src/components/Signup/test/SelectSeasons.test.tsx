import React from 'react';
import { render, screen } from '@testing-library/react';
import SelectSeasons from '../SelectSeasons'
import { seasons } from '../../../data/constants';

describe('SelectSeasons', () => {
    it("Allows you to select a season", () => {
        const fakeSelectHandler = jest.fn()
        render(<SelectSeasons seasons={seasons} handleSelect={fakeSelectHandler}></SelectSeasons>)
        const season = seasons[Object.keys(seasons)[0]]
        const seasonButton = screen.getByText(season.label)
        seasonButton.click()
        expect(fakeSelectHandler).toHaveBeenCalledWith({[season.id]: season})
    })
    it("Allows you to unselect a season", () => {
        const fakeSelectHandler = jest.fn()
        render(<SelectSeasons seasons={seasons} handleSelect={fakeSelectHandler}></SelectSeasons>)
        const season = seasons[Object.keys(seasons)[0]]
        const seasonButton = screen.getByText(season.label)
        seasonButton.click()
        seasonButton.click()
        // empty set means no seasons selected
        expect(fakeSelectHandler).toHaveBeenLastCalledWith({})
    })
    it("Allows you to select multiple seasons", () => {
        const fakeSelectHandler = jest.fn()
        render(<SelectSeasons seasons={seasons} handleSelect={fakeSelectHandler}></SelectSeasons>)
        const season1 = seasons[Object.keys(seasons)[0]]
        const season2 = seasons[Object.keys(seasons)[1]]
        const seasonButton1 = screen.getByText(season1.label)
        const seasonButton2 = screen.getByText(season2.label)
        seasonButton1.click()
        seasonButton2.click()
        expect(fakeSelectHandler).toHaveBeenCalledWith({[season1.id]: season1, [season2.id]: season2})
    })
})