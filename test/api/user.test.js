const request = require('supertest');
const app = require('../../src');

test('유저 테스트', async () => {
    const response = await request(app.callback()).get('/api/user/1');
    console.log(response.body);
    expect(response.status).toBe(200);
});

test('유저 테스트', async () => {
    const response = await request(app.callback()).get('/api/user/');
    console.log(response.body);
    expect(response.status).toBe(200);
});

test('유저 정보 수정 테스트', async () => {
    const requestBody = {
        nickname: 'walewale', 
        iidx_id: "12341234", 
        dj_name: "WW", 
        dj_class: "none"
    }
    const response = await request(app.callback()).patch('/api/user/1').send(requestBody);
    console.log(response.body);
    expect(response.status).toBe(200);
});