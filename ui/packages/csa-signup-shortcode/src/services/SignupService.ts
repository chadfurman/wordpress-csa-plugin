import {SignupFormData} from "../types";
import {signupResourceRoute} from "./RouteService";

export class SignupService {
    signup(signupData: SignupFormData) {
        fetch(signupResourceRoute,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(signupData)
            }
        )
    }
}