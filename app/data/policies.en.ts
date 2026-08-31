import type { PoliciesContent } from './policies'

export const policiesEn: PoliciesContent = {
  lastUpdated: 'August 31, 2026',
  sections: [
    {
      id: 'privacidade',
      title: 'Privacy Policy',
      paragraphs: [
        "This site is Rafael Muniz's personal online résumé. It is a static page — no sign-up, no login and no database. There is no user account to create or access here.",
        'The contact form stores nothing. When you fill it in, your own browser builds a WhatsApp link (wa.me) with the text you typed and opens that conversation in a new tab — the content is only sent if you complete the send inside WhatsApp. No information passes through a server of this site or is saved anywhere it controls.',
        'No analytics service, tracking pixel or advertising cookie is used. There is no collection of browsing behavior, and no sale or sharing of personal data with third parties.',
        'The only external service this site loads is Google Fonts, used solely to display the typography (Inter). When the page loads, your browser makes a request to Google servers to fetch the font files — that communication is governed by Google’s own privacy policy.',
        "The contact links (email, phone/WhatsApp and LinkedIn) take you off this site to third-party platforms. From the moment you access those platforms, their terms and privacy policies apply, not this site's.",
        'Questions about privacy can be sent directly to rafael.s.m.muniz@gmail.com.',
      ],
    },
    {
      id: 'termos-de-uso',
      title: 'Terms of Use',
      paragraphs: [
        'The content of this site is informational: to present the professional experience, skills and projects of Rafael Muniz. It is provided "as is", with no guarantee of continued accuracy — information may be updated at any time.',
        'The portfolio section contains links to third-party sites on which Rafael Muniz worked as a developer or contributor. The availability, content and operation of those sites are the responsibility of their respective organizations, not of this site.',
        'There is no guarantee of uninterrupted availability. The site may go offline, change address or be discontinued without prior notice.',
        'The texts, design and structure of this résumé belong to Rafael Muniz. Reproduction of the content for plagiarism or commercial use without authorization is not permitted.',
        'Using the information presented here for hiring, business or any other decision is the sole responsibility of whoever uses it.',
        'These terms are governed by Brazilian law.',
      ],
    },
    {
      id: 'portfolio-e-projetos',
      title: 'Portfolio and Projects Developed',
      paragraphs: [
        "This site is Rafael Muniz's professional portfolio, and its purpose is to present development, design and technology projects carried out by the person responsible for the site.",
        'The projects shown in the "Portfolio" section are meant exclusively as a technical and professional demonstration of the work developed. Listing a given project does not, in itself, constitute a statement that there is any partnership, commercial representation, joint ownership, endorsement or current contractual relationship between the person responsible for this portfolio and the person, professional or organization related to the project.',
        'Wherever possible, the information shown about each project is limited to the public identification of the project and a description of the development activities carried out by the person responsible for the portfolio.',
        'Trademarks, trade names, texts, images, photographs, logos and other elements belonging to third parties remain the property of their respective owners. Showing such elements in the context of a portfolio project does not imply any claim of ownership over them.',
        'If the owner of a given piece of content, trademark or project believes that its presentation in this portfolio violates a legally protected right or interest, they may request the review or removal of the material through the contact channel provided on this site. The request will be reviewed in good faith and, where appropriate, the material may be removed or adjusted.',
        'The person responsible for the portfolio makes no claim of ownership over third-party trademarks, names, content or other elements that may appear in the projects shown, limiting themselves to identifying and demonstrating their part in the technical development of the respective websites.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookie Notice',
      paragraphs: [
        'This site does not use tracking, advertising or analytics cookies — which is why no cookie consent banner is shown: there is nothing non-essential to consent to.',
        'The only information stored in your browser by this site is: (1) a temporary flag in sessionStorage, used only to track whether the opening animation (preloader) has already been shown in the current tab, cleared automatically when you close the tab; and (2) a cookie named "rm-locale", created when you choose a language in the switcher (or on your first visit, based on your browser language), used only to remember that language on future visits.',
        'None of this data identifies you, leaves your browser or is shared with third parties. The language cookie lasts at most one year and can be deleted at any time in your browser settings.',
        'When loading the Google Fonts font, Google may technically log information such as the IP address of the request, as happens with any request made to an external server. This site neither controls nor accesses that log.',
        'If this site ever starts using analytics, pixels or any non-essential cookie, this page will be updated to reflect the change before it goes into production.',
      ],
    },
  ],
}
