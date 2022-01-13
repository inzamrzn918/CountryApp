const chai = window.chai
const expect = chai.expect
let date = new Date(2022, 0o1, 12, 10, 30, 0o0, 0);

// ========== Test for getting time in am/pm ===============
it('Test Success for', (done) => {
    let result = formatAMPM(date);
    expect(result).to.deep.equal("10:30 am");
    done();
})

//