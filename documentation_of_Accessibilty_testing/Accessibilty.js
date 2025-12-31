/* 
🧠 What is Accessibility Testing?

Accessibility testing checks whether your website can be used by people with disabilities — for example:

People with vision problems (low contrast text)

People who rely on screen readers

People who navigate with keyboard only

It helps ensure your website meets accessibility standards like WCAG so everyone can use it. 
Playwright

🧩 Why Accessibility Testing Matters

Normal automated tests check:
✔ Clicking buttons
✔ Navigation
✔ Functional behavior

But accessibility testing checks:
✔ Whether elements have labels
✔ Whether text contrasts are sufficient
✔ Whether screen readers can understand the page
✔ Whether interactive elements are usable

These are things users with disabilities rely on — not just whether a button works. 
Playwright

🛠️ How Accessibility Testing Works in Playwright

Playwright doesn’t do accessibility checks by itself — it uses a library called axe-core through @axe-core/playwright. 
Playwright

Axe-core is the engine that scans the page’s DOM for accessibility issues.

📦 Installing the Axe Accessibility Tool

First, install the package:

npm install --save-dev @axe-core/playwright


This lets you use accessibility scans inside your Playwright tests.

📄 Basic Accessibility Test (Whole Page)

Here’s how to scan an entire page for accessibility violations:

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should be accessible', async ({ page }) => {
  await page.goto('https://your-site.com/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

What this does:

Loads the page

Runs the accessibility analyzer

Checks there are no violations
➡ If any violations are found, the test fails. 
Playwright

🔎 Scan Only Part of a Page

Sometimes you want to test just part of the page — for example, a flyout or mobile menu.

await page.getByRole('button', { name: 'Menu' }).click();
await page.locator('#menu').waitFor();

const results = await new AxeBuilder({ page })
  .include('#menu')
  .analyze();

expect(results.violations).toEqual([]);


✔ Only the included region gets scanned
✔ Useful for dynamic content shown after interactions 
Playwright

📊 Focus on Specific WCAG Rules

You can filter scans to only check accessibility rules tagged for specific standards like WCAG A & AA.

const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .analyze();

expect(results.violations).toEqual([]);


🏁 This ensures the test aligns with specific accessibility criteria — recommended for compliance testing. 
Playwright

🧠 Handling Known Issues
📌 Excluding elements

If part of the page is known to be problematic but you intend to fix later:

const results = await new AxeBuilder({ page })
  .exclude('#old-header')
  .analyze();


This skips that element during the scan. 
Playwright

📌 Disabling specific rules

If a particular rule always fails but you want to ignore it temporarily:

const results = await new AxeBuilder({ page })
  .disableRules(['duplicate-id'])
  .analyze();


This turns off specific checks. 
Playwright

📎 Export Accessibility Results

You can attach the full scan result to the test report:

await testInfo.attach('accessibility-results', {
  body: JSON.stringify(results, null, 2),
  contentType: 'application/json'
});


This is helpful for debugging and CI reporting. 
Docs4dev

⚙️ Sharing Common Accessibility Settings

If you scan multiple pages with the same settings, you can use a fixture so you don’t repeat configuration.

You define a custom builder with tags, excludes, etc., and reuse it in every test. 
Playwright

💡 Important Notes

✅ Axe can automatically find many accessibility issues
⛔ It cannot detect all issues — manual testing and user testing are also needed
➡ Axe is best used as part of a full accessibility strategy 
Playwright

🏁 Summary in Simple Words

Accessibility testing ensures your app is usable by people with disabilities.

Playwright integrates with axe-core via @axe-core/playwright.

You run scans just like normal tests and assert there are no violations.

You can target whole pages, specific regions, or WCAG standards.

You can exclude known issues or disable rules temporarily.

This helps catch many accessibility problems early. 
Playwright */