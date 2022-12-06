import settings from "../settings/settings"

function buildApiRoute(path: string) {
    return settings.apiUrl + "/?rest_route=" + path
}

export const signupResourceRoute = buildApiRoute("/signup")
