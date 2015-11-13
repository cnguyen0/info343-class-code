exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'], // the star is a wild card
    rootElement: 'body' // css selector where the ng-app is
};
