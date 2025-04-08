import ProductB from "../entity/product-b";
import { ProductType } from "../entity/product.types";
import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
  it("should create a proct type a", () => {
    const product = ProductFactory.createNew("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a proct type b", () => {
    const product = ProductFactory.createNew("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(1);
    expect(product.finalPrice).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when product type is not supported", () => {

    const invalidType = "c" as ProductType;

    expect(() => ProductFactory.createNew(invalidType, "Product C", 1)).toThrowError(
      "Product type not supported"
    );
  });
});
