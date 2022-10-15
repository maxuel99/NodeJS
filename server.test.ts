import supertest from 'supertest';

import { prismaMock } from "./lib/prisma/client.mock";

import app from './app';

const request = supertest(app);

describe("GET /planets", () => {
  test('Valid request', async() => {
      const planets = [
        {
          id: 1,
          name: "Mercury",
          description: null,
          diameter: 1234,
          moons: 12,
          createdAt: "2022-10-14T21:31:08.595Z",
          updatedAt: "2022-10-14T21:30:26.901Z",
        },
        {
          id: 2,
          name: "Venus",
          description: null,
          diameter: 5678,
          moons: 12,
          createdAt: "2022-10-14T21:31:47.945Z",
          updatedAt: "2022-10-14T21:31:21.075Z",
        },
      ];

      //@ts-ignore
      prismaMock.planet.findMany.mockResolvedValue(planets);

      const response = await request
      .get('/planets')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect('Access-Control-Allow-Origin', 'http://localhost:8080');

      expect(response.body).toEqual(planets);
  });
});

describe("GET /planet/:id", () => {
  test('Valid request', async() => {
      const planet = {
          id: 1,
          name: "Mercury",
          description: null,
          diameter: 1234,
          moons: 12,
          createdAt: "2022-10-14T21:31:08.595Z",
          updatedAt: "2022-10-14T21:30:26.901Z",
      };

      //@ts-ignore
      prismaMock.planet.findUnique.mockResolvedValue(planet);

      const response = await request
      .get('/planets/1')
      .expect(200)
      .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual(planet);
  });

  test("Planet does not exist", async () => {
    //@ts-ignore
    prismaMock.planet.findUnique.mockResolvedValue(null);

    const response = await request
      .get("/planets/23")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /planets/23");
  })

  test("Invalid planet ID", async () => {
    const response = await request
      .get("/planets/asdf")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot GET /planets/asdf");
  })
});

describe("POST /planets", () => {
  test('Valid request', async() => {
    const planet = {
        name: "Mercury",
        diameter: 1234,
        moons: 12,
    };
  
    const response = await request
    .post('/planets')
    .send(planet)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect('Access-Control-Allow-Origin', 'http://localhost:8080');

  
    expect(response.body).toEqual(planet);
  });

  test('Invalid request', async() => {
    const planet = {
        diameter: 1234,
        moons: 12,
    };
  
    const response = await request
    .post('/planets')
    .send(planet)
    .expect(422)
    .expect('Content-Type', /application\/json/);
  
    expect(response.body).toEqual({
      errors: {
        body: expect.any(Array)
      }
    });
  });
})

describe("PUT /planets/:id", () => {
  test('Valid request', async() => {
    const planet = {
        id: 3,
        name: "Mercury",
        description: "Lovely planet",
        diameter: 1234,
        moons: 12,
        createdAt: "2022-10-14T21:31:08.595Z",
        updatedAt: "2022-10-14T21:30:26.901Z",
    };

    //@ts-ignore
    prismaMock.planet.update.mockResolvedValue(planet);
  
    const response = await request
    .put('/planets/3')
    .send({
        name: "Mercury",
        description: "Lovely planet",
        diameter: 1234,
        moons: 12
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect('Access-Control-Allow-Origin', 'http://localhost:8080');

  
    expect(response.body).toEqual(planet);
  });

  test('Invalid request', async() => {
    const planet = {
        diameter: 1234,
        moons: 12,
    };
  
    const response = await request
    .put('/planets/23')
    .send(planet)
    .expect(422)
    .expect('Content-Type', /application\/json/);
  
    expect(response.body).toEqual({
      errors: {
        body: expect.any(Array)
      }
    });
  });
  test("Planet does not exist", async () => {
    //@ts-ignore
    prismaMock.planet.update.mockRejectedValue(new Error("Error"));

    const response = await request
      .put("/planets/23")
      .send({
        name: "Mercury",
        description: "Lovely planet",
        diameter: 1234,
        moons: 12
    })
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot PUT /planets/23");
  })

  test("Invalid planet ID", async () => {
    const response = await request
      .put("/planets/asdf")
      .send({
        name: "Mercury",
        description: "Lovely planet",
        diameter: 1234,
        moons: 12
      })
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot PUT /planets/asdf");
  })
})

describe("DELETE /planet/:id", () => {
  test('Valid request', async() => {
      const response = await request
      .delete('/planets/1')
      .expect(204)
      .expect('Access-Control-Allow-Origin', 'http://localhost:8080');


      expect(response.text).toEqual("");
  });

  test("Planet does not exist", async () => {
    //@ts-ignore
    prismaMock.planet.delete.mockRejectedValue(new Error("Error"));

    const response = await request
      .delete("/planets/23")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot DELETE /planets/23");
  })

  test("Invalid planet ID", async () => {
    const response = await request
      .delete("/planets/asdf")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot DELETE /planets/asdf");
  })
});
