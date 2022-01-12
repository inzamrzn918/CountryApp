const chai = window.chai
const expect = chai.expect
let urls = [
    "https://restcountries.com/v3.1/alll",
    "https://restcountries.com/v2/name/ind",
    "https://restcountries.com/v3.1/alpha/ind",


]
for (let i = 0; i < urls.length; i++) {
    it('Test Successful', (done) => {
        //define some data to compare against
        var blah = 'foo';

        //call the function we're testing
        var result = getResponse(urls[i]);

        //assertions
        result.then((data) => {
            console.log(data);

            // expect(data.length).toBeGreaterThan(0);
            if (data.message != undefined) {
                expect(data.message).not.toEqual("Page Not Found");
                done();
            }

        }, (error) => {
            assert.fail(error, "Failed!");
            done();
        });
        done();
    });
}
