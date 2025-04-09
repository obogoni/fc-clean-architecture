import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";
import { ProductType } from "./product.types";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get finalPrice(): number {
    return this._price;
  };

  get type(): ProductType {
    return "a";
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): void {
    const validator = ProductValidatorFactory.create();
    validator.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
