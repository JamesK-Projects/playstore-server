const {expect} = require('chai');
const app = require('../app');
const supertest = require('supertest');
const { query } = require('express');

describe('GET /apps endpoint', () => {
    it('returns an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const app = res.body[0];
                expect(app).to.include.all.keys(
                    'App', 'Rating', 'Genres'
                )
            })
    })

    it('should return 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect('Sort must be one of rating or app')
    })

    it('should sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                let i = 0;
                while(i < res.body.length -1){
                    const appAtI = res.body[i];
                    const appAtIPlusOne = res.body[i+1]
                    if(appAtIPlusOne < appAtI){
                        sorted = false;
                        break;
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
    it('should sort alphabetically by app', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'app'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                let i = 0;
                while(i < res.body.length -1){
                    const appAtI = res.body[i];
                    const appAtIPlusOne = res.body[i+1]
                    if(appAtIPlusOne < appAtI){
                        sorted = false;
                        break;
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
    it('should filter by genres', () => {
        return supertest(app)
        .get('/apps')
        .query({genre:'Action'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            console.log(res.body)
            expect(res.body).to.be.an('array');
            for(let i = 0; i < res.body.length; i++){
                expect(res.body[i].Genres).to.include('Action')
            }
            
        })
    })
})
