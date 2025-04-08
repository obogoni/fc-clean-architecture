import { ProductType } from "./product.types";

export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  get type(): ProductType;
}

