/***********************************************
 * @author: James Abiagam (fabiagam@gmail.com)
 * @property: Live Fashion Sale Backend
 * @file: /test/api.test.js
 * @name : Integration Test for APIs
 ************************************************/
 "use strict";
 const path = require("path");
 require("dotenv").config({ path: path.join(__dirname, "../.env") });
 process.env.NODE_ENV = 'test';

let Inventory = require('../models/inventory');
const params = require('../data/seed_test');
const { emptyDatabase  } = require('../helpers/inventory');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe('API Server!', () => {
   
    describe('Empty Database ', () => {
      it("Remove all test data from last test", done => {
           emptyDatabase();
           done();
        });
    });

    it("Welcome to the Fashion Live Api Test Suite", done => {
        chai
          .request(app)
          .get("/")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equals("Welcome to  our Fashion Live API Service!");
            done();
          });
      });

      describe('/POST stock inventory', () => {
      it("Adds 1 entry of stock item into inventory", done => {
        chai
          .request(app)
          .post("/inventory")
          .send(params.singleEntry)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equals(true);
             expect(res.body.data).to.be.an('object');
            done();
          });
      });
    });

    
    describe('/POST multiple stock inventory', () => {
        it("Adds 3 entries of stock items  at a time into inventory", done => {
          chai
            .request(app)
            .post("/inventory")
            .send(params.multipleEntry)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.success).to.equals(true);
               expect(res.body.data).to.be.an('array');
              done();
            });
        });
      });

      describe('/POST  Buy Item during live show', () => {
        it("Removes 1 item from inventory during sale and updates sales record", done => {
          chai
            .request(app)
            .post(`/show/${params.buy.showId}/buy_item/${params.buy.itemId}`)
            .send({})
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.success).to.equals(true);
               expect(res.body.data).to.be.an('object');
              done();
            });
        });
      });

    describe('/GET  Returns sold items during a show', () => {
        it('Retreives  the name and quantity of item_id sold by show_ID.', (done) => {
            chai.request(app)
                .get(`/show/${params.sold.showId}/sold_items/${params.sold.itemId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
                });
        });
    });

}); // end

