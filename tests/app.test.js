const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");

describe("Rural Store API", () => {
  test("GET / retorna informações da aplicação", async () => {
    const response = await request(app).get("/");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
      application: "Rural Store API",
      status: "running",
    });
  });

  test("GET /health retorna o estado da aplicação", async () => {
    const response = await request(app).get("/health");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
      status: "healthy",
    });
  });

  test("GET /products retorna uma lista de produtos", async () => {
    const response = await request(app).get("/products");

    assert.equal(response.statusCode, 200);
    assert.equal(Array.isArray(response.body), true);
    assert.equal(response.body.length > 0, true);
  });

  test("GET /products/1 retorna o produto solicitado", async () => {
    const response = await request(app).get("/products/1");

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
      id: 1,
      name: "Ração para bovinos",
      price: 89.9,
    });
  });

  test("GET /products/999 retorna produto não encontrado", async () => {
    const response = await request(app).get("/products/999");

    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.body, {
      error: "Product not found",
    });
  });

  test("GET /products/abc rejeita um ID inválido", async () => {
    const response = await request(app).get("/products/abc");

    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, {
      error: "Invalid product ID",
    });
  });

  test("rota inexistente retorna 404", async () => {
    const response = await request(app).get("/unknown");

    assert.equal(response.statusCode, 404);
    assert.deepEqual(response.body, {
      error: "Route not found",
    });
  });

  test("a aplicação não divulga o cabeçalho X-Powered-By", async () => {
    const response = await request(app).get("/");

    assert.equal(response.headers["x-powered-by"], undefined);
  });

  test("a aplicação adiciona cabeçalhos de segurança", async () => {
    const response = await request(app).get("/");

    assert.equal(
      response.headers["x-content-type-options"],
      "nosniff",
    );
  });
});