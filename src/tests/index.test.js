const request = require('supertest');
const app = require('../../server')

describe('Encode endpoint', () => {
  it('Should encode the URL given', async () => {
    const res = await request(app).post('/api/v1/shortner/encode')
    expect(res.statusCode).toEqual(200)
  })
})

describe('Decode endpoint', () => {
  it('Should decode the URL given, to it is original url', async () => {
    const res = await request(app).post('/api/v1/shortner/decode')
    expect(res.statusCode).toEqual(200)
  })
})

describe('Statistics endpoint', () => {
  it('Should get statistic about the given url path', async () => {
    const res = await request(app).get('/api/v1/shortner/statistic/hello')
    expect(res.statusCode).toEqual(200)
  })
})