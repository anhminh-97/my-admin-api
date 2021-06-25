const faker = require('faker');
const fs = require('fs');

// Set locale to use Vietnamese
faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // Loop and push category
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: true,
    };

    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        originalPrice: faker.datatype.number(),
        salePrice: faker.datatype.number(),
        attributes: [
          {
            id: 1,
            name: 'color',
            variations: false,
            options: [faker.commerce.color()],
          },
          { id: 2, name: 'size', variations: false, options: [] },
        ],
        variations: [],
        type: 'simple',
        description: faker.commerce.productDescription(),
        categories: [{ id: category.id, name: category.name }],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        status: true,
        quantity: Number.parseFloat(faker.commerce.price()),
        productImage: faker.image.avatar(),
        productGallery: [
          faker.image.imageUrl(400, 400),
          faker.image.imageUrl(400, 400),
          faker.image.imageUrl(400, 400),
          faker.image.imageUrl(400, 400),
        ],
      };

      productList.push(product);
    });
  }
  return productList;
};

(() => {
  // Random data
  const categoryList = randomCategoryList(15);
  const productList = randomProductList(categoryList, 5);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
  };

  // write db object to db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('successfully :>> ');
  });
})();
