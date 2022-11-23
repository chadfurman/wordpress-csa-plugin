import { useState } from "react";
import {
    CommentsType,
    HearAboutUsQuestion,
    HearAboutUsQuestionId,
    HearAboutUsQuestions,
    Referral,
    SelectedHearAboutUsQuestion
} from "../../types";

interface CommentsProps {
    handleUpdateComments: (comments: CommentsType) => void
    handleUpdateReferral: (referral: Referral) => void
    handleUpdateSelectedHearAboutUsQuestion: (selectedHearAboutUsQestion?: SelectedHearAboutUsQuestion) => void
    hearAboutUsQuestions: HearAboutUsQuestions
}
function Comments({hearAboutUsQuestions, handleUpdateComments, handleUpdateSelectedHearAboutUsQuestion, handleUpdateReferral}: CommentsProps) {
    const [selectedHearAboutUsQuestion, setSelectedHearAboutUsQuestion] = useState<SelectedHearAboutUsQuestion>()
    const handleChangeComments = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const comments = e.currentTarget.value
        handleUpdateComments(comments)
    }
    const handleChangeHearAboutUsQuestion = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const hearAboutUsQuestionId: HearAboutUsQuestionId = e.currentTarget.getAttribute('data-hear-about-us-question-id') || "missing-hear-about-us-question-id-from-radio"
        const hearAboutUsQuestion: HearAboutUsQuestion = hearAboutUsQuestions[hearAboutUsQuestionId]
        console.log("change method")
        if (selectedHearAboutUsQuestion && selectedHearAboutUsQuestion.id === hearAboutUsQuestionId) {
            setSelectedHearAboutUsQuestion(undefined);
            handleUpdateSelectedHearAboutUsQuestion(undefined)
        } else {
            setSelectedHearAboutUsQuestion(hearAboutUsQuestion);
            handleUpdateSelectedHearAboutUsQuestion(hearAboutUsQuestion)
        }
    }
    const handleChangeReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
        const referral = e.currentTarget.value
        handleUpdateReferral(referral)
    }

    return <>
        <h3>Comments</h3>
        <label>
            Additional Thoughts
            <textarea rows={10} cols={50} onChange={handleChangeComments}></textarea>
        </label>
        <ul>
            <li>
                <label>How did you hear about Red Fire Farm?</label>
                <div>
                    <ul>
                        {Object.keys(hearAboutUsQuestions).map(hearAboutUsQuestionId => {
                            const hearAboutUsQuestion = hearAboutUsQuestions[hearAboutUsQuestionId]
                            return <li key={hearAboutUsQuestionId}>
                                <label><input type="radio" data-hear-about-us-question-id={hearAboutUsQuestionId} checked={(selectedHearAboutUsQuestion && selectedHearAboutUsQuestion.id == hearAboutUsQuestion.id) || false} onClick={handleChangeHearAboutUsQuestion} />{hearAboutUsQuestion.label}</label>
                            </li>
                        })}
                    </ul>
                </div>
            </li>
            <li>
                <label>Did a friend refer you? If so, please enter their name.<input onChange={handleChangeReferral}/></label>
            </li>
        </ul>;
    </>
}

export default Comments