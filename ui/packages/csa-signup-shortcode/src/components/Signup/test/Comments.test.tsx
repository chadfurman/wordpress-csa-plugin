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
        const match = new RegExp(hearAboutUsQuestions["1"].label)
        const question = screen.getByLabelText(match)
        userEvent.click(question)
        expect(mockHandleUpdateSelectedHearAboutUsQuestion).toHaveBeenCalledWith(hearAboutUsQuestions["1"])
    })
    it("lets us un-answer how we heard about the CSA", () => {
        const {mockHandleUpdateSelectedHearAboutUsQuestion} = renderCommentsComponent()
        const match = new RegExp(hearAboutUsQuestions["1"].label)
        const question = screen.getByLabelText(match)
        userEvent.click(question)
        userEvent.click(question)
        expect(mockHandleUpdateSelectedHearAboutUsQuestion).toHaveBeenLastCalledWith(undefined)
    })
    it("lets us answer how we heard about the CSA only once", () => {
        const {mockHandleUpdateSelectedHearAboutUsQuestion} = renderCommentsComponent()
        const match1 = new RegExp(hearAboutUsQuestions["1"].label)
        const match2 = new RegExp(hearAboutUsQuestions["2"].label)
        const question1 = screen.getByLabelText(match1)
        const question2 = screen.getByLabelText(match2)
        userEvent.click(question1)
        userEvent.click(question2)
        expect(mockHandleUpdateSelectedHearAboutUsQuestion).toHaveBeenLastCalledWith(hearAboutUsQuestions["2"])
    })
    it("lets us say who referred us, if anyone", () => {
        const referer = "Mock Referal"
        const {mockHandleUpdateReferral} = renderCommentsComponent()
        const question = screen.getByLabelText(/refer/)
        userEvent.type(question, referer)
        expect(mockHandleUpdateReferral).toHaveBeenCalledWith(referer)
    })
})