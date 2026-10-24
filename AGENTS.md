# Cloud Agent notes

## Setup

Cloud Agent builds install npm dependencies, then the Playwright Chromium browser and its Linux libraries:

```bash
npm ci
npx playwright install --with-deps chromium
```

The site dev server is `npm run dev` on port 3000.

Notion, Supabase, and Resend credentials are optional. Without them, Genie Tips shows its empty state and the contact form cannot send email. Do not add live patient data or production secrets for these tests.

## Browser QA

```bash
npm run test:e2e
```

Playwright starts `npm run dev` at http://127.0.0.1:3000 when that port is free. It reuses a server that is already running unless `CI=1`.

`npm run test:e2e:headed` opens a visible browser. `npm run test:e2e:install` installs Chromium and system libraries again.

The smoke tests check page loads, navigation, header and footer links, menu buttons, horizontal overflow, and browser errors at 1440px, 768px, and 390px. They do not submit the contact form.
