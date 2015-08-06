var app = require('../app');
var request = require('supertest').agent(app.listen());

var db = require('./../lib/db');
var co = require('co');
var should = require('should');
var testHelpers = require("./testHelpers");

describe('the homepage', function() {

    beforeEach(function(done) {
        testHelpers.removeAllDocs();
        done();
    });

    afterEach(function(done) {
        testHelpers.removeAllDocs();
        done();
    });

    it('should display nicely without errors', function(done) {
        request
            .get('/')
            .expect(200) // ok
            .expect('Content-Type', /html/) // displays
            .end(done);
    });

    it('should list all the questions in the db', function(done) {
        
        co(function *() {

            yield db.questions.insert({title: "Q1"});
            yield db.questions.insert({title: "Q2"});

            request
                .get('/')
                .expect(200)
                .expect(function(res) {
                    res.text.should.containEql('Q1');
                    res.text.should.containEql('Q2');
                })
                .end(done);
        }());
    });
});