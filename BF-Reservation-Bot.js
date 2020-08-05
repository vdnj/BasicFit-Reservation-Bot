const secret = require('./secret');
const bf = require('./basic-fit');
 
(async () => {

    console.log('Dont forget to put and remove your pass in secret.js !');
    await bf.initialize();
    await bf.login(secret);
    await bf.booking();
    await bf.browser.close();
    
})();