/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 *  We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures its URLs (feed.url) are defined
         * and that such URLs are not empty.
         */
        it('urls are defined', function(){
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });
        /* this test loops through each feed
         * in the allFeeds object and ensures its names (feed.name) are defined
         * and that such names are not empty.
         */
         it('names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });
    /* This is a new test suit which will test The menu button functionality */
    describe('The Menu', function(){
        /* First we make sure that the menu element is
         * hidden by default by making sure that the body element
         * starts with a menu-hiden class.
         */
        it('is hidden by default', function() {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        /* Then we make sure that the menu gets 
        * toggled on and off when we click on the toggle button. 
        * I pass a click event to such button twice and make sure that the class
        * menu-hidden is toggled off when the button is clicked 
        * and toggled back on when is clicked again.
        */
        it('toggles on and off', function() {
            const body = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });      

    /* This is a suit that will asynchronously test the first feed*/
    describe('initial Entries', function(){
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Im using Jasmine's before each function to make sure everything inside it runs before any other test within the suit. 
         */
        beforeEach(function(done){
            /*Here I'm using Jasmine's done function to make sure that loadFeed
            * has finalized displaying results before moving forward
            * with the test.
            */
            loadFeed(0, done);
        });
        /* This test makes sure that the feed has at least one children (entry) by
        *  making sure that the childrens length is greater than 0.
        */
        it('has loaded', function(){
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    });

    /* This test suite will compare feeds and make sure they are different */
    describe('New Feed Selection', function(){
        /* We will need to compare the previously loaded and currently
        * loaded feed. For this I have created a constant to call on to the feed,
        * and an Array which will saved the previously loaded feed to later on compare it
        * with the currently loaded feed. 
        */
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        /* Im using Jasmine's before each function to make sure everything inside it runs before any other test within the suit. 
        */
        beforeEach(function(done){
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry) {
                firstFeed.push(entry.innerText);
            });
            /*Here I'm using Jasmine's done function.
            */
            loadFeed(1,done);
        });
        /* This test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('shows different content', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                expect(entry.innerText === firstFeed[ index ]).toBe(false);
            });
        });


    });   
}());
