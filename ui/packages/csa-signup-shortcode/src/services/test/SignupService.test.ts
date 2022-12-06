import {signupData} from "./constants";
import {SignupService} from "../SignupService";
import {signupResourceRoute} from "../RouteService";

global.fetch = jest.fn()
describe("SignupService", () => {
    it("allows signup form data to be submitted", () => {
        const service = new SignupService();
        service.signup(signupData)
        expect(fetch).toHaveBeenCalledWith(
            signupResourceRoute,
            expect.objectContaining({
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(signupData)
            })
        )
    })
})