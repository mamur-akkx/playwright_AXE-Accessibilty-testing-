import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


 //Scan the whole page for accessibility issues
test('homepage should be accessible', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
}); 




// Scan only a specific part of the page for accessibility issues
test('login form should be accessible', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  // Login correctly
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for app page (menu appears after login)
  await page.locator('#react-burger-menu-btn').waitFor();


  // srf inventory container ko scan karega.
  const results = await new AxeBuilder({ page })
    .include('#inventory_container')
    .analyze();

  //ye just critical issue to highlight karega.  
  const critical = results.violations.filter(v => v.impact === 'critical');
  expect(critical).toEqual([]);
});




//Focus on Specific WCAG Rules

test('homepage should follow specific WCAG rules', async ({ page }) => {
  await page.goto('https://saucedemo.com/');
 
  // Login correctly
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for app page (menu appears after login)
  await page.locator('#react-burger-menu-btn').waitFor();

 // ye specific WCAG rules ko target karega.
  const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 
        'wcag2aa',  
        'wcag21a',  
        'wcag21aa'
      ])
  .analyze();

expect(results.violations).toEqual([]);
});


//Exclude Specific Elements from Scan
test.only('SauceDemo accessibility scan excluding old-header', async ({ page }) => {
   await page.goto('https://saucedemo.com/');

  //  Perform login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  //  Wait for the app page to load (menu button indicates login success)
  await page.locator('#react-burger-menu-btn').waitFor();

  //  Run Axe accessibility scan, excluding a specific element (#old-header)
  const results = await new AxeBuilder({ page })
    .exclude('#old-header') // skip scanning this element
    .analyze();

  // 5 Filter only critical accessibility violations
  const critical = results.violations.filter(v => v.impact === 'critical');

  // 6️⃣ Assert no critical issues
  expect(critical).toEqual([]);

  // 7️⃣ Optional: log all violations
  if (results.violations.length > 0) {
    console.log('All accessibility violations:', results.violations.map(v => v.id));
  }
});



//Disable Specific Rules
/* This test scans the page for accessibility issues but ignores the “duplicate-id” rule. The test passes only if no other violations remain. */

test.only('homepage should be accessible with specific rules disabled', async ({ page }) => {
  await page.goto('https://saucedemo.com/');
  
  
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for app page (menu appears after login)
  await page.locator('#react-burger-menu-btn').waitFor();
   
  // 'duplicate-id' rule ko disable karega.
  const results = await new AxeBuilder({ page })
  .disableRules(['duplicate-id'])
  .analyze();
  expect(results.violations).toEqual([]);
});