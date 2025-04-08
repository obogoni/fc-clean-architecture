import Product from "../../../../domain/product/entity/product.interface";
import { AnyProduct, ProductType } from "../../../../domain/product/entity/product.types";
import ProductFactory from "../../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: AnyProduct): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
      type: entity.type
    });
  }

  async update(entity: AnyProduct): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<AnyProduct> {
    const productModel = await ProductModel.findOne({ where: { id } });

    return ProductFactory.createWithId(
      productModel.id,
      productModel.type as ProductType,
      productModel.name,
      productModel.price
    );
  }

  async findAll(): Promise<AnyProduct[]> {
    const productModels = await ProductModel.findAll();

    return productModels.map((productModel) => {
      return ProductFactory.createWithId(
        productModel.id,
        productModel.type as ProductType,
        productModel.name,
        productModel.price
      );
    });
  }
}
