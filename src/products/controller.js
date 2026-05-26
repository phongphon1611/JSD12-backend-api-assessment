let products = [];

export const getProducts = (req, res) => {
  const { name, sort } = req.query;

  let result = [...products];

  if (name) {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (sort === "price") {
    result.sort((a, b) => a.price - b.price);
  }

  res.status(200).json({
    message: "Products fetched successfully",
    data: result,
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(200).json({
    message: "Product fetched successfully",
    data: product,
  });
};

export const createProduct = (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      message: "Name and price are required",
    });
  }

  if (typeof price !== "number") {
    return res.status(400).json({
      message: "Price must be a number",
    });
  }

  const newProduct = {
    id: String(Date.now()),
    name,
    price,
    quantity: quantity ?? 1,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (price !== undefined && typeof price !== "number") {
    return res.status(400).json({
      message: "Price must be a number",
    });
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (quantity !== undefined) product.quantity = quantity;

  res.status(200).json({
    message: "Product updated successfully",
    data: product,
  });
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.status(200).json({
    message: "Product deleted successfully",
    data: deletedProduct[0],
  });
};
