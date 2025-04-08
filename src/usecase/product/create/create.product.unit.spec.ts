import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

const input: InputCreateProductDto = {
  type: "a",
  name: "Product A",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
      type: input.type
    });
  });

  it("should throw an error when product type is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, type: "" };

    await expect(productCreateUseCase.execute(invalidInput)).rejects.toThrow(
      "Product type is required"
    );
  });

  it("should throw an error when product type is not supported", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, type: "*" };

    await expect(productCreateUseCase.execute(invalidInput)).rejects.toThrow(
      "Product type not supported"
    );
  });

  it("should throw an error when product name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, name: "" };

    await expect(productCreateUseCase.execute(invalidInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when product price is invalid", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, price: -1 };

    await expect(productCreateUseCase.execute(invalidInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});

