import Product from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductDto } from "./list.product.dto";

export default class ListProductsUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product: Product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          type: product.type
        };
      }),
    };
  }
}

