class Login {
    get loginOption() {return $(`=Log in`)}
    get loginByEmailOption() {return $(`[data-testid="social-auth-button-email"]`)}
    get emailId() {return $(`#email`)}
    get password() {return $(`#password`)}
    get loginBtn() {return $(`[data-testid="signup-login-submit-btn"]`)}

    clickLoginOption() {
        this.loginOption.click()
    }

    clickEmailLoginOption() {
        this.loginByEmailOption.click()
    }

    enterEmailId() {
        this.emailId.setValue("jineshkhimsaria@yahoo.com")
    }

    enterPassword() {
        this.password.setValue("Parents@1")
    }

    clickLoginBtn() {
        this.loginBtn.click()
    }
}

module.exports = new Login()