interface WelcomeTextProps {
    welcomeTextWithHtml: string
}
function WelcomeText({welcomeTextWithHtml}: WelcomeTextProps) {
    return <div dangerouslySetInnerHTML={{__html: welcomeTextWithHtml}}></div>;
}

export default WelcomeText