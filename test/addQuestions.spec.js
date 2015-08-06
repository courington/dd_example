var app = require('./../app');
var request = require('supertest').agent(app.listen());
var testHelpers = require("./testHelpers");

describe('adding questions', function() {

    var a_question_form = {};

    beforeEach(function(done) {
        testHelpers.removeAllDocs();

        a_question_form = {
            questionTitle: "a question?",
            tagString: "tag1, tag2, tag3"
        };

        done();
    });

    afterEach(function(done) {
        testHelpers.removeAllDocs();
        done();
    });

    it('has nice page to add question', function(done) {
        request
            .get('/question')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(done);
    });

    it('stores correct filled out forms as new question', function(done) {
        request
            .post('/question')
            .send(a_question_form)
            .expect(302)
            .expect('location', /^\/question\/[0-9a-fA-F]{24}$/)
            .end(done);
    });
});