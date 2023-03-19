const productsModels = require('./products.model');

module.exports = {
  Query: {
    products: () => {
      return productsModels.getAllProducts();
    },
    productsByPrice: (_, args) => {
      return productsModels.getProductsByPrice(args.min, args.max);
    }, 

    product: (_, args) => {
      return productsModels.getproductByID(args.id);
    }
    //the convension for argument that you don't use is to use underscore
    //if there are two arguments that you don't use then you use two underscores for the second unused arguments. 
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return productsModels.addNewProduct(args.id, args.description, args.price);
    },

    addNewProductReview: (_,args) => {
      return productsModels.addNewProductReview(args.id, args.rating, args.comment);
    }
  }
};