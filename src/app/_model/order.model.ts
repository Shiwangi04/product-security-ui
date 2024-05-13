import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order {
    orderId: number,
    orderFullName: string,
    orderFullAddress: string,
    orderContactNo: string,
    orderAltContactNo: string,
    orderStatus: string,
    orderAmount: number,
    product: Product,
    user: User
}