import RepositoryInterface from "../../@shared/repository/repository-interface";
import { AnyProduct } from "../entity/product.types";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<AnyProduct> { }
