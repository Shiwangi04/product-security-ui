import { OrderProductQuantity } from "./order-product-quantity.model";

export interface OrderDetails {
    fullName: string,
	fullAddress: string,
    contactNo: string,
	altContactNo: string,
	transactionId: string,
	productList: OrderProductQuantity[]
}