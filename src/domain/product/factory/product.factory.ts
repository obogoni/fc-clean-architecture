import Product from "../entity/product";
import { ProductType } from "../entity/product.types";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";
import { AnyProduct } from "../entity/product.types";

export default class ProductFactory {

  public static createWithId(id: string, type: ProductType, name: string, price: number): AnyProduct {
    return ProductFactory.create(id, type, name, price);
  }

  public static createNew(type: ProductType, name: string, price: number): AnyProduct {
    return ProductFactory.create(uuid(), type, name, price);
  }

  private static create(
    id: string,
    type: ProductType,
    name: string,
    price: number
  ): AnyProduct {

    if (!type) throw new Error("Product type is required");

    switch (type) {
      case "a":
        return new Product(id, name, price);
      case "b":
        return new ProductB(id, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
