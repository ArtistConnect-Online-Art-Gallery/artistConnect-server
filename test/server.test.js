// Import supertest so we can manage the app/server in tests properly
const request = require('supertest');
const {app} = require ('../src/server');

describe('GET /', () => {
	test('GET /artworks should return a list of artworks', async () => {
		// Increase the timeout for this test (e.g., 10 seconds)
	  jest.setTimeout(10000);

	  const response = await request(app).get('/');
	  expect(response.statusCode).toBe(200);
	  expect(response.body.message).toBe('Hello Artist Connect');
	});

});

// describe('Artwork Routes', () => {
// 	test('GET /artworks should return a list of artworks', async () => {
// 	  // Assuming you have artworks in your test database
// 	  const response = await request(app).get('/artworks');
	  
// 	  // Assert the response status code
// 	  expect(response.statusCode).toBe(200);
	  
// 	  // Assert that the response body has the expected properties
// 	  expect(response.body).toHaveProperty('status', 'success');
// 	  expect(response.body).toHaveProperty('message', 'All artworks');
// 	  expect(response.body).toHaveProperty('artworks');
	  
// 	  // Assert that artworks is an array
// 	  expect(Array.isArray(response.body.artworks)).toBe(true);
	  
// 	  // Additional assertions based on your specific response structure
// 	  // For example, if you have a 'user' property within each artwork, you can check it
// 	  if (response.body.artworks.length > 0) {
// 		const firstArtwork = response.body.artworks[0];
// 		expect(firstArtwork).toHaveProperty('user');
// 		expect(firstArtwork.user).toHaveProperty('username');
// 	  }
// 	});
//   });