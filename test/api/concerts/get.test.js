const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  
  before(async () => {
    const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Performer1', genre: 'Pop', price: 30, day: 2, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConOne.save();
  
    const testConTwo = new Concert({ _id: '5d9f1140f10a81216cfd4409', performer: 'Performer2', genre: 'Rock', price: 35, day: 2, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConTwo.save();

    const testConThree = new Concert({ _id: '5d9f1140f10a81216cfd4410', performer: 'Performer2', genre: 'R&B', price: 40, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await testConThree.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
});

it('/:id should return one department by :id ', async () => {
  const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('object');
  expect(res.body).to.not.be.null;
});

it('/performer/:performer should return an array with concerts filtered by performer', async () => {
  const res = await request(server).get('/api/concerts/performer/Performer2');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('array');
  expect(res.body.length).to.be.equal(2);
});

it('/genre/:genre should return an array with concerts filtered by genre', async () => {
  const res = await request(server).get('/api/concerts/genre/Rock');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('array');
  expect(res.body.length).to.be.equal(1);
});

it('/day/:day should return an array with concerts filtered by day', async () => {
  const res = await request(server).get('/api/concerts/day/2');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('array');
  expect(res.body.length).to.be.equal(2);
});

it('/price/:price_min/:price_max should return an array with concerts filtered by price', async () => {
  const res = await request(server).get('/api/concerts/price/30/45');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.an('array');
  expect(res.body.length).to.be.equal(3);
});

after(async () => {
  await Concert.deleteMany();
});

});