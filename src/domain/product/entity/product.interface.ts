import { ProductType } from "./product.types";

export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  get finalPrice(): number;
  get type(): ProductType;
}

