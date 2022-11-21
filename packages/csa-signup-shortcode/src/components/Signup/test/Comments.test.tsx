import React from 'react';
import Comments from "../Comments"
import { render, screen } from '@testing-library/react';
import { hearAboutUsQuestions } from '../../../data/constants';
import userEvent from '@testing-library/user-event';


const renderCommentsComponent = () => {

    const mockHandleUpdateComments = jest.fn()
    const mockHandleUpdateReferral = jest.fn()
    const mockHandleUpdateSelectedHearAboutUsQuestion = jest.fn()
    const mockHearAboutUsQuestions = jest.fn()
    render(<Comments handleUpdateComments={mockHandleUpdateComments} handleUpdateReferral={mockHandleUpdateReferral} handleUpdateSelectedHearAboutUsQuestion={mockHandleUpdateSelectedHearAboutUsQuestion} hearAboutUsQuestions={hearAboutUsQuestions} />)

    return {
        mockHandleUpdateComments,
        mockHandleUpdateReferral,
        mockHandleUpdateSelectedHearAboutUsQuestion,
        mockHearAboutUsQuestions
    }
}

describe("Comments", () => {
    it("lets us set free-text comments", () => {
        const comments = "CommentText"
        const {mockHandleUpdateComments} = renderCommentsComponent()
        const commentTextBox = screen.getByLabelText(/Additional Thoughts/)
        userEvent.type(commentTextBox, comments)
        expect(mockHandleUpdateComments).toHaveBeenCalledWith(comments)
    })
    it("lets us answer how we heard about the CSA", () => {
        const {mockHandleUpdateSelectedHearAboutUsQuestion} = renderCommentsComponent()
        const match = new RegExp(hearAboutUsQuestions["0"].label)
        const question = screen.getByLabelText(match)
        userEvent.click(question)
        expect(mockHandleUpdateSelectedHearAboutUsQuestion).toHaveBeenCalledWith(question)
    })
    it("lets us un-answer how we heard about the CSA", () => {
        expect(true).toBe(false)
    })
    it("lets us answer how we heard about the CSA only once", () => {
        expect(true).toBe(false)
    })
    it("lets us say who referred us, if anyone", () => {
        expect(true).toBe(false)
    })
})