import Product from "./product"
import ProductB from "./product-b"

export type ProductType = "a" | "b"

export type AnyProduct = Product | ProductB
