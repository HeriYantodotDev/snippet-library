const products = [
  {
    id: 'redshoe',
    description: 'Red Shoe',
    price: 40.19,
    reviews: []
  },
  {
    id: 'bluejean',
    description: 'Blue Jeans',
    price: 55.55,
    reviews: []
  }
];

function getAllProducts() {
  return products;
}

function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  })
}

function getproductByID(id) {
  return products.find(product => product.id === id);
}

function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: []
  }
  products.push(newProduct);
  return newProduct;
}

function addNewProductReview(id, rating, comment) {

  const matchProduct = getproductByID(id);

  if (matchProduct) {
    const newReview = {
      rating,
      comment
    };

    matchProduct.reviews.push(newReview);

    return newReview;
  }

}

module.exports = {
  getAllProducts,
  getProductsByPrice,
  getproductByID,
  addNewProduct,
  addNewProductReview
};