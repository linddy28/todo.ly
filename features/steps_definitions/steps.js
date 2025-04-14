const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/loginpage');

// Set default timeout to 60s for each step (site loads slowly)
setDefaultTimeout(60 * 1000);

let browser, page, loginPage;

Given('the user opens the Todo.ly site', async function () {

    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);

    await loginPage.navigate();
});

When('the user clicks the login button', async function () {

    await loginPage.clickLoginButton();
});

When('the user enters a valid email and password', async function () {

    await loginPage.fillCredentials('test@testing65.com', '12345');
});

When('the user submits the login form', async function () {

    await loginPage.submitLogin();
});

Then('the logout option should be visible', async function () {

    const loggedIn = await loginPage.isLogoutButtonVisible();
    if (!loggedIn) {
        throw new Error('Error: el botón de Logout no se encontró, login fallido.');
    }

    await browser.close();
});
