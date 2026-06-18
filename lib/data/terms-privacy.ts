export const TERMS_PRIVACY_DATES = {
  effective: "18 June 2026",
  lastUpdated: "18 June 2026",
};

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string };

export interface LegalSection {
  number: number;
  title: string;
  blocks: LegalBlock[];
}

export const TERMS_PRIVACY_SECTIONS: LegalSection[] = [
  {
    number: 1,
    title: "Interpretation and Definitions",
    blocks: [
      { type: "h3", text: "Interpretation" },
      {
        type: "p",
        text: "Words with capitalised initial letters have meanings defined under this section. These definitions apply whether used in singular or plural.",
      },
      { type: "h3", text: "Definitions" },
      { type: "ul", items: [
        "Company refers to Clinic Genie, also referred to as “we”, “us”, or “our”.",
        "Country refers to Singapore.",
        "Device refers to any device that can access the website, including a computer, mobile phone, tablet, or other digital device.",
        "Service refers to the Clinic Genie website, website content, enquiry forms, digital features, and related website services.",
        "Terms refers to the terms, privacy provisions, and conditions set out on this page.",
        "Website refers to the Clinic Genie website at clinic-genie.com.",
        "You refers to the individual, clinic, company, organisation, representative, or user accessing or using the Website.",
      ]},
    ],
  },
  {
    number: 2,
    title: "Acceptance of Terms",
    blocks: [
      {
        type: "p",
        text: "By accessing, browsing, submitting an enquiry through, or otherwise using the Clinic Genie Website, you agree to comply with and be bound by these Terms & Privacy provisions.",
      },
      {
        type: "p",
        text: "These terms apply to your use of the Website, including browsing our pages, reading our content, submitting forms, contacting us, interacting with digital features, or engaging with any information provided through the Website.",
      },
    ],
  },
  {
    number: 3,
    title: "Business and Professional Use",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website is intended for business and professional users, including clinics, healthcare providers, business owners, clinic managers, marketing teams, founders, and organisations exploring digital marketing support.",
      },
      {
        type: "p",
        text: "Clinic Genie is a healthcare marketing agency. We are not a medical clinic, healthcare provider, or medical advisory service.",
      },
      {
        type: "p",
        text: "The Website does not provide medical advice, diagnosis, treatment, clinical guidance, or emergency support.",
      },
    ],
  },
  {
    number: 4,
    title: "No Medical Advice",
    blocks: [
      {
        type: "p",
        text: "Any healthcare-related content on this Website is provided for general informational, marketing, communications, and educational purposes only.",
      },
      {
        type: "p",
        text: "Nothing on this Website should be treated as medical advice, clinical guidance, diagnosis, treatment recommendation, or a substitute for consultation with a qualified healthcare professional.",
      },
      {
        type: "p",
        text: "If you are seeking medical advice or urgent medical care, please contact an appropriate healthcare provider or emergency service.",
      },
    ],
  },
  {
    number: 5,
    title: "Website Use",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website is provided for general informational and business enquiry purposes. You agree to use the Website responsibly and not to:",
      },
      { type: "ul", items: [
        "Use the Website in a way that may disrupt, damage, or interfere with its operation.",
        "Attempt to access restricted systems, data, or areas of the Website without permission.",
        "Use the Website for unlawful, misleading, harmful, fraudulent, or unauthorised purposes.",
        "Copy, misuse, scrape, reverse engineer, or interfere with any content, design, code, functionality, or intellectual property on the Website.",
        "Submit false, misleading, offensive, confidential, unlawful, or inappropriate information through the Website.",
      ]},
      {
        type: "p",
        text: "We may update, suspend, restrict, or discontinue any part of the Website at any time.",
      },
    ],
  },
  {
    number: 6,
    title: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All content on the Clinic Genie Website, including text, graphics, logos, images, videos, designs, layouts, software, code, downloadable materials, and other content, belongs to Clinic Genie or is used with permission.",
      },
      {
        type: "p",
        text: "You may not copy, reproduce, modify, distribute, republish, display, upload, transmit, or use any Website content without prior written consent from Clinic Genie, unless permitted by applicable law.",
      },
    ],
  },
  {
    number: 7,
    title: "Client Agreements and Service Terms",
    blocks: [
      {
        type: "p",
        text: "This Terms & Privacy page governs the use of the Clinic Genie Website.",
      },
      {
        type: "p",
        text: "If you engage Clinic Genie for services, those services may be governed by separate proposals, quotations, invoices, service agreements, statements of work, retainers, project terms, or other written arrangements.",
      },
      {
        type: "p",
        text: "If there is any inconsistency between this page and a signed or agreed client document, the specific client agreement will apply to the relevant service engagement.",
      },
    ],
  },
  {
    number: 8,
    title: "Information We Collect",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may collect information that you choose to provide when you use our Website, submit a form, contact us, or interact with our digital features. This may include:",
      },
      { type: "ul", items: [
        "Name",
        "Email address",
        "Phone number",
        "Clinic, company, or organisation name",
        "Role or professional details",
        "Website URL",
        "Service interests",
        "Project goals or marketing challenges",
        "Budget or timeline information, if voluntarily shared",
        "Message details submitted through forms",
        "Any other information you choose to provide",
      ]},
      {
        type: "p",
        text: "We may also collect non personal information such as IP address, browser type, device information, operating system, pages visited, referring website, usage patterns, and general website analytics data.",
      },
    ],
  },
  {
    number: 9,
    title: "Client, Business, and Enquiry Information",
    blocks: [
      {
        type: "p",
        text: "When you submit an enquiry to Clinic Genie, we may collect business and project-related information to understand your needs and respond appropriately.",
      },
      {
        type: "p",
        text: "This may include clinic information, company information, service interests, current website details, digital marketing goals, campaign challenges, patient acquisition objectives, and other context related to your enquiry.",
      },
      {
        type: "p",
        text: "Please do not submit confidential patient information, medical records, patient names, NRIC numbers, health information, or other sensitive personal data through our Website forms.",
      },
    ],
  },
  {
    number: 10,
    title: "Patient and Sensitive Information",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie's Website forms are intended for business, marketing, and professional enquiries only.",
      },
      {
        type: "p",
        text: "You should not submit patient data, medical records, health information, clinical images, NRIC numbers, financial account details, passwords, or other sensitive information through the Website unless we specifically request it through an appropriate secure channel.",
      },
      {
        type: "p",
        text: "If sensitive information is submitted to us by mistake, we may delete, disregard, or take reasonable steps to handle it appropriately.",
      },
    ],
  },
  {
    number: 11,
    title: "How We Use Your Information",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may use the information collected to:",
      },
      { type: "ul", items: [
        "Respond to your enquiries.",
        "Provide information about Clinic Genie services.",
        "Understand your clinic, company, business, or project needs.",
        "Prepare for a strategy call, discovery discussion, proposal, or project conversation.",
        "Communicate with you about services, proposals, updates, or relevant content.",
        "Improve our Website, content, user experience, services, and digital systems.",
        "Monitor Website traffic, performance, engagement, and analytics.",
        "Support internal business, administrative, operational, reporting, and legal purposes.",
        "Protect the security and integrity of our Website and systems.",
        "Comply with applicable laws, regulations, and legal obligations.",
      ]},
      { type: "p", text: "We do not sell your personal information." },
    ],
  },
  {
    number: 12,
    title: "Consent and Withdrawal",
    blocks: [
      {
        type: "p",
        text: "By submitting information through the Clinic Genie Website, you consent to Clinic Genie collecting, using, and disclosing that information for the purposes described on this page.",
      },
      {
        type: "p",
        text: "You may contact us to withdraw your consent where applicable, subject to any legal, contractual, operational, or business requirements that may require us to retain or continue processing certain information.",
      },
      {
        type: "p",
        text: "If you withdraw consent, this may affect our ability to respond to your enquiry or provide services.",
      },
    ],
  },
  {
    number: 13,
    title: "Marketing Communications",
    blocks: [
      {
        type: "p",
        text: "If you choose to receive updates from Clinic Genie, or if you have contacted us about our services, we may send you relevant service, content, or marketing communications.",
      },
      {
        type: "p",
        text: "You may opt out of marketing communications by following unsubscribe instructions where available or contacting us directly at hello@clinic-genie.com.",
      },
      {
        type: "p",
        text: "We may still send service-related, transactional, administrative, or legal communications where necessary.",
      },
    ],
  },
  {
    number: 14,
    title: "Cookies, Analytics, and Tracking Technologies",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website may use cookies, analytics tools, tracking pixels, and similar technologies to improve user experience, understand visitor behaviour, measure website performance, and support marketing insights.",
      },
      {
        type: "p",
        text: "These tools may help us understand how visitors arrive at the Website, which pages they view, how they interact with content, and how our digital marketing performs.",
      },
      {
        type: "p",
        text: "You may disable cookies through your browser settings. However, some parts of the Website may not function properly if cookies are disabled.",
      },
    ],
  },
  {
    number: 15,
    title: "Analytics and Marketing Tools",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may use analytics, advertising, SEO, performance, hosting, form, email, and website tools to operate and improve the Website and manage enquiries.",
      },
      {
        type: "p",
        text: "These may include platforms such as Google Analytics, Google Search Console, SEMrush, website hosting providers, form management tools, email systems, scheduling tools, and similar platforms.",
      },
      {
        type: "p",
        text: "These third party tools may collect or process certain information according to their own terms and privacy policies.",
      },
    ],
  },
  {
    number: 16,
    title: "Data Sharing and Disclosure",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may share information where needed and appropriate. This may include sharing information with:",
      },
      { type: "ul", items: [
        "Service providers who help us operate the Website, manage enquiries, provide services, host data, conduct analytics, support marketing, manage forms, maintain systems, or run business operations.",
        "Professional advisers, where necessary for business, legal, accounting, tax, compliance, or advisory purposes.",
        "Regulatory authorities, public agencies, courts, legal parties, or law enforcement bodies where required by law, legal process, or lawful request.",
        "Partners, contractors, or collaborators involved in delivering agreed services, where relevant to your enquiry or engagement.",
      ]},
      {
        type: "p",
        text: "We expect third party service providers to handle personal information responsibly and only for the purposes required.",
      },
    ],
  },
  {
    number: 17,
    title: "Cross-Border Processing",
    blocks: [
      {
        type: "p",
        text: "Some of our service providers, systems, or technology platforms may process, store, or access information outside Singapore.",
      },
      {
        type: "p",
        text: "Where applicable, Clinic Genie takes reasonable steps to ensure that personal information continues to receive appropriate protection when handled by such providers.",
      },
    ],
  },
  {
    number: 18,
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie takes reasonable administrative, technical, and operational steps to protect personal information from unauthorised access, disclosure, alteration, misuse, loss, or destruction.",
      },
      {
        type: "p",
        text: "However, no method of online transmission or electronic storage is completely secure. While we take care to protect information, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    number: 19,
    title: "Data Breach Response",
    blocks: [
      {
        type: "p",
        text: "If a data incident occurs, Clinic Genie will take reasonable steps to assess, contain, investigate, and address the incident.",
      },
      {
        type: "p",
        text: "Where required by applicable law, we will notify relevant authorities and affected individuals.",
      },
    ],
  },
  {
    number: 20,
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may retain personal information for as long as necessary to respond to enquiries, provide services, maintain business records, comply with legal obligations, resolve disputes, enforce agreements, and support legitimate business purposes.",
      },
      {
        type: "p",
        text: "When information is no longer required, we may delete, anonymise, or securely store it in accordance with our internal processes and applicable requirements.",
      },
    ],
  },
  {
    number: 21,
    title: "Your Rights",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable laws, you may contact Clinic Genie to:",
      },
      { type: "ul", items: [
        "Ask about the personal information we hold about you.",
        "Request correction or updating of your information.",
        "Request deletion of certain information, where applicable.",
        "Withdraw consent, where processing is based on consent.",
        "Opt out of marketing communications.",
        "Raise a privacy-related concern.",
      ]},
      {
        type: "p",
        text: "We may need to verify your identity before responding to certain requests.",
      },
    ],
  },
  {
    number: 22,
    title: "Third Party Links",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website may contain links to third party websites, platforms, tools, or resources.",
      },
      {
        type: "p",
        text: "Clinic Genie is not responsible for the content, accuracy, availability, privacy practices, terms, products, services, or policies of third party websites.",
      },
      {
        type: "p",
        text: "Accessing third party websites is at your own risk. We encourage you to review their own terms and privacy policies before providing any personal information.",
      },
    ],
  },
  {
    number: 23,
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website is intended for business and professional users. It is not directed at individuals under the age of 18.",
      },
      {
        type: "p",
        text: "We do not knowingly collect personal information from children. If you believe that a child has provided personal information through the Website, please contact us so that we can take appropriate steps.",
      },
    ],
  },
  {
    number: 24,
    title: "Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "The Clinic Genie Website is provided on an “as is” and “as available” basis.",
      },
      {
        type: "p",
        text: "Clinic Genie does not guarantee that the Website will always be available, uninterrupted, secure, error free, accurate, complete, current, or free from viruses or harmful components.",
      },
      {
        type: "p",
        text: "To the fullest extent permitted by law, Clinic Genie and its directors, employees, representatives, partners, contractors, and agents shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or other damages arising from your access to, use of, or inability to use the Website.",
      },
    ],
  },
  {
    number: 25,
    title: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold Clinic Genie harmless from and against any claims, losses, liabilities, damages, costs, or expenses arising from your misuse of the Website, breach of these Terms, violation of applicable law, or infringement of any rights of Clinic Genie or a third party.",
      },
    ],
  },
  {
    number: 26,
    title: "Changes to These Terms & Privacy",
    blocks: [
      {
        type: "p",
        text: "Clinic Genie may update this Terms & Privacy page from time to time.",
      },
      {
        type: "p",
        text: "Any changes will take effect once posted on the Website. Your continued use of the Website after changes are posted means that you accept the updated Terms & Privacy provisions.",
      },
    ],
  },
  {
    number: 27,
    title: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms & Privacy provisions shall be governed by and interpreted in accordance with the laws of Singapore.",
      },
      {
        type: "p",
        text: "Any dispute arising from or relating to the use of the Website shall be subject to the exclusive jurisdiction of the courts of Singapore.",
      },
    ],
  },
  {
    number: 28,
    title: "Severability",
    blocks: [
      {
        type: "p",
        text: "If any part of these Terms & Privacy provisions is found to be invalid, unlawful, or unenforceable, that part shall be modified or removed to the extent necessary.",
      },
      {
        type: "p",
        text: "The remaining provisions shall continue to apply.",
      },
    ],
  },
  {
    number: 29,
    title: "Waiver",
    blocks: [
      {
        type: "p",
        text: "If Clinic Genie does not enforce any part of these Terms & Privacy provisions, this does not mean that we waive our right to enforce that or any other provision in the future.",
      },
    ],
  },
  {
    number: 30,
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have questions about these Terms & Privacy provisions, how your information is handled, or your use of the Website, please contact Clinic Genie.",
      },
      { type: "p", text: "Clinic Genie" },
      { type: "p", text: "Email: hello@clinic-genie.com" },
      { type: "p", text: "For privacy-related requests, please use the subject line: Privacy Request." },
    ],
  },
];
