const request = require('supertest');
const app = require('../../server')

describe('Encode endpoint', () => {
  it('Should encode the URL given', async () => {
    const res = await request(app).post('/api/v1/shortner/encode').send({url: 'https://indicina.com'})
    
    expect(res.statusCode).toEqual(200)
    expect(res._body.message).toBe('Encode URL successfully')
    expect(res._body.success).toBe(true)
    expect(res._body.data).toBeDefined()
  })
})

describe('Decode endpoint', () => {
  it('Should decode the URL given, to it is original url', async () => {
    const res = await request(app).post('/api/v1/shortner/decode').send({id: 'A'})
    
    expect(res.statusCode).toEqual(200)
    expect(res._body.message).toBe('Decode URL successfully')
    expect(res._body.success).toBe(true)
    expect(res._body.data).toBeDefined()
  })
})

describe('Statistics endpoint', () => {
  it('Should get statistic about the given url path', async () => {
    const res = await request(app).get('/api/v1/shortner/statistic/A')
    
    expect(res.statusCode).toEqual(200)
    expect(res._body.message).toBe('Statistics retrieved successfully')
    expect(res._body.success).toBe(true)
    expect(res._body.data).toBeDefined()
  })
})