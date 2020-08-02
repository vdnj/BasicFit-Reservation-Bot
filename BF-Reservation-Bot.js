const secret = require('./secret');
const bf = require('./basic-fit');
 
(async () => {

    await bf.initialize();
    await bf.login(secret);
    await bf.booking();
    await bf.browser.close();
})();