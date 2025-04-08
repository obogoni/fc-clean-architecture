import ListProductsUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

const product1 = new Product("1", "Product A", 100);
const product2 = new Product("2", "Product B", 200);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test list products use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const listProductsUseCase = new ListProductsUseCase(productRepository);

    const output = await listProductsUseCase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].type).toBe(product1.type);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].type).toBe(product2.type);
    expect(output.products[1].price).toBe(product2.price);
  });
});

