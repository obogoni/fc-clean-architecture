import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
      type: "a"
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
      type: "a"
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product 2",
      price: 200,
      type: "a"
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
      type: foundProduct.type
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(foundProducts).toHaveLength(2);
    expect(foundProducts[0].id).toBe(product.id);
    expect(foundProducts[0].name).toBe(product.name);
    expect(foundProducts[0].price).toBe(product.price);
    expect(foundProducts[1].id).toBe(product2.id);
    expect(foundProducts[1].name).toBe(product2.name);
    expect(foundProducts[1].price).toBe(product2.price);
  });

});
