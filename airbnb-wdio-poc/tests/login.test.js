common = require(`../pages/common`)

describe(`Airbnb Authorization`, function() {

    it(`Login to Airbnb`, () => {
        pageLogin.clickLoginOption()
        pageLogin.clickEmailLoginOption()
        pageLogin.enterEmailId()
        pageLogin.enterPassword()
        pageLogin.clickLoginBtn()
    })

})