import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './services/product-resolve.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolveService } from './services/buy-product-resolve.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'admin', 
        component: AdminComponent,
        canActivate: [authGuard],
        data: {
            roles: ['admin']
        }
    },
    {
        path: 'user', 
        component: UserComponent,
        canActivate: [authGuard],
        data: {
            roles: ['user']
        }
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'forbidden', 
        component: ForbiddenComponent
    },
    {
        path: 'addProduct', 
        component: AddNewProductComponent,
        canActivate: [authGuard],
        data: {
            roles: ['admin']
        },
        resolve: {
            product: ProductResolveService
        }
    },
    {
        path: 'showProductDetails', 
        component: ShowProductDetailsComponent,
        canActivate: [authGuard],
        data: {
            roles: ['admin', 'user']
        }
    },
    {
        path: 'productViewDetails', 
        component: ProductViewDetailsComponent,
        resolve: {
            product: ProductResolveService
        }
    },
    {
        path: 'buyProduct', 
        component: BuyProductComponent,
        canActivate: [authGuard],
        data: {
            roles: ['user']
        },
        resolve: {
            productDetails: BuyProductResolveService
        }
    },
    {
        path: 'orderConfirm', 
        component: OrderConfirmationComponent,
        canActivate: [authGuard],
        data: {
            roles: ['user']
        }
    },
    {
        path: 'register', 
        component: RegisterComponent
    },
    {
        path: 'cart', 
        component: CartComponent,
        canActivate: [authGuard],
        data: {
            roles: ['user']
        }
    },
    {
        path: 'myOrders', 
        component: MyOrdersComponent,
        canActivate: [authGuard],
        data: {
            roles: ['user']
        }
    },
    {
        path: 'orderDetails', 
        component: OrderDetailsComponent,
        canActivate: [authGuard],
        data: {
            roles: ['admin']
        }
    }
];
