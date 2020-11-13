common = require(`../pages/common`)

describe(`Airbnb Home Page`, function() {

    it.only(`Search Accommodation`, () => {
        pageLogin.clickLoginOption()
        pageLogin.clickEmailLoginOption()
        pageLogin.enterEmailId()
        pageLogin.enterPassword()
        pageLogin.clickLoginBtn()
        pageHome.enterPlace()
    })

})