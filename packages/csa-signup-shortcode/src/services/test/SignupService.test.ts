import {signupData} from "./constants";

global.fetch = jest.fn()
describe("SignupService", () => {
    it("allows signup form data to be submitted", () => {
        const service = new SignupService();
        service.signup(signupData)
        expect(fetch).toHaveBeenCalledWith(
            "SOME URL",
            expect.objectContaining({
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: expect.objectContaining({signupData})
            })
        )
    })
})