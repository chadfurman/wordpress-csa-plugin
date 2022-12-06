export function escapeRegex(s: string) {
    return s.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function createSignupServiceMock() {
    return () => ({
        submitSignup: jest.fn()
    });
}