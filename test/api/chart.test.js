const request = require('supertest');
const app = require('../../src');

// test('차트 정보 1개 불러오기 테스트', async () => {
//     const response = await request(app.callback()).get('/api/chart/2');
//     console.log(response.body);
//     expect(response.status).toBe(200);
// });

// test('차트 정보 여러개 불러오기 테스트', async () => {
//     const response = await request(app.callback()).get('/api/chart/');
//     console.log(response.body);
//     expect(response.status).toBe(200);
// });

test('곡 정보 여러개 불러오기 테스트', async () => {
    const response = await request(app.callback()).get('/api/song/');
    console.log(response.body);
    expect(response.status).toBe(200);
});

test('곡 정보 페이징 테스트', async () => {
    const limit = 10;
    const offset = 50;
    const response = await request(app.callback()).get(`/api/song?limit=${limit}&offset=${offset}`);
    console.log(response.body);
    expect(response.status).toBe(200);
});
