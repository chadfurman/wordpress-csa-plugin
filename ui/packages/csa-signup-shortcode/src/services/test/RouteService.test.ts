import settings from "../../settings/settings";
import {signupResourceRoute} from "../RouteService";

describe('RouteService', () => {
    it('builds routes using settings', () => {
        expect(signupResourceRoute).toMatch(new RegExp(`^${settings.apiUrl}`))
    })
})