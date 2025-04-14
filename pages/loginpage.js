const { expect } = require('@playwright/test'); // for assertions

class LoginPage {
    /**
     * Initializes the login page selectors.
     * @param {import('playwright').Page} page - Playwright page.
     */
    constructor(page) {
        this.page = page;
// Selectors
        this.loginButton = page.locator('//div[@class="HPHeaderLogin"]/a/img'); //xpath
        this.emailField = page.locator('input[id*="LoginControl1_TextBoxEmail"]');
        this.passwordField = page.locator('input[id*="LoginControl1_TextBoxPassword"]');
        this.submitButton = page.locator('input[id*="LoginControl1_ButtonLogin"], button:has-text("Login")');
        this.logoutButton = page.locator('text=Logout'); // Botón/elemento de Logout visible tras login
    }

    /**
     * Navigate to the Todo.ly URL with extended timeout.
     */
    async navigate() {
// Waiters because page is slow
        await this.page.setDefaultTimeout(60000);
        await this.page.setDefaultNavigationTimeout(60000);
        await this.page.goto('https://todo.ly');
    }

    /**
     * Click "login" button
     */
    async clickLoginButton() {
        await  this.loginButton.waitFor({timeout:60000})
        await this.loginButton.click();
// Wait for email be visible
        await this.emailField.waitFor({ state: 'visible' });
    }

    /**
     * Fill in the user credentials in the login form.
     * @param {string} email - Email
     * @param {string} password - Password
     */
    async fillCredentials(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    /**
     * Enter login button
     */
    async submitLogin() {
        await this.submitButton.click();

    }

    /**
     * Confirm "logout" button is visible
     * @returns {Promise<boolean>} true if yes
     */
    async isLogoutButtonVisible() {
        return await this.logoutButton.isVisible();
    }
}

module.exports = LoginPage;