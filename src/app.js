const express = require("express");
const helmet = require("helmet");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

const products = [
  {
    id: 1,
    name: "Ração para bovinos",
    price: 89.9,
  },
  {
    id: 2,
    name: "Sementes de milho",
    price: 45.5,
  },
  {
    id: 3,
    name: "Adubo orgânico",
    price: 32.0,
  },
];

app.get("/", (request, response) => {
  response.status(200).json({
    application: "Rural Store API",
    status: "running",
  });
});

app.get("/health", (request, response) => {
  response.status(200).json({
    status: "healthy",
  });
});

app.get("/products", (request, response) => {
  response.status(200).json(products);
});

app.get("/products/:id", (request, response) => {
  const id = Number.parseInt(request.params.id, 10);

  if (!Number.isInteger(id) || id <= 0) {
    return response.status(400).json({
      error: "Invalid product ID",
    });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  return response.status(200).json(product);
});

app.post("/calculate", (request, response) => {
  const expression = request.body.expression;
  const result = eval(expression);

  response.status(200).json({
    result,
  });
});

app.use((request, response) => {
  response.status(404).json({
    error: "Route not found",
  });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, "0.0.0.0", () => {
    console.log(`Rural Store API running on port ${port}`);
  });
}

module.exports = app;
