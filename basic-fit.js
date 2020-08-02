const puppeteer = require('puppeteer');

const bf = {

    browser: null,
    page: null,

    initialize: async () => {

        // Go to BF Page

        bf.browser = await puppeteer.launch({
            headless : false, // To Remove when bot OP
            defaultViewport: null, // To Remove when bot OP
            args: ['--start-fullscreen'], // To Remove when bot OP
            slowMo: 150
        });
        bf.page = await bf.browser.newPage();
        await bf.page.goto('https://my.basic-fit.com/login');
        await bf.page.waitForSelector('.text-field-normal');

    },

    login: async ({email, pass}) => {

        // Connect to BF account

        const loginInputs = await bf.page.$$('.text-field-normal');
        const emailInput = loginInputs[0];
        const passInput = loginInputs[1];

        await emailInput.type(email);
        await passInput.type(pass + String.fromCharCode(13));

        await bf.page.waitForSelector('#makeBookingId');

    },

    booking: async () => {

        // Book training session

        const makeBookingBtn = await bf.page.$('#makeBookingId');
        await makeBookingBtn.click();
        await bf.page.waitForSelector('#reserveBookingId');

        const reserveBookingBtn = await bf.page.$('#reserveBookingId');
        reserveBookingBtn.click();
        await bf.page.waitForSelector('#clubNameId');

            // Select the gym
        const clubNameBtn = await bf.page.$('#clubNameId');
        await clubNameBtn.click();
        await bf.page.waitForSelector('input[placeholder="Choose a club"]');

        await bf.page.type('input[placeholder="Choose a club"]', 'Vendargues');
        await bf.page.click('#reserveBookingId');

        await bf.page.waitForSelector('#clubNameId');

            // Select the day
        const dayBtns = await bf.page.$$('.radio-button-row');
        const tommorowBtn = dayBtns[1];
        await tommorowBtn.click();
        await bf.page.waitFor(2000);

            // Select the time
        const morningBtn = await bf.page.$('#morningSlotsId');
        await morningBtn.click();

        const timeBtns = await bf.page.$$('.button-cta-box.clickable');
        const seventThirtyBtn = timeBtns[8];
        await seventThirtyBtn.click();

            // Submit first step
        const continueBtn = await bf.page.$('#nextBtnId');
        await continueBtn.click();
        await bf.page.waitForSelector('#goToFriendsBtnId');

            // Select training duration
        const durationBtns = await bf.page.$$('.radio-button-row');
        const sixtyMinsBtn = durationBtns[2];
        await sixtyMinsBtn.click();

            // Accept conditions
        const acceptConditionsBtn = await bf.page.$('.rules-bullet-points-section.clickable');
        await acceptConditionsBtn.click();
        
            // Submit second step
        const submitBtn = await bf.page.$('#nextBtnId');
        await submitBtn.click();
        await bf.page.waitForSelector('#cancelReservationId');

        console.log('Séance réservée !');

    }

}

module.exports = bf;