import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import products, { Product } from '../../products';
//create CartItem interface extending Product defined in products.ts on the root
//replica of the Product interface with a quantity property
interface CartItem extends Product {
  quantity: number;
}
//create Cart interface with an array of CartItem elements
interface Cart {
  cartItems: CartItem[];
}
//initialize initialCart
const initialCart = (indexes: number[]): Cart => ({
  cartItems: indexes.map((index) => ({
    ...products[index],
    quantity: 1,
  })),
});
//
@Controller('cart')
export class CartController {
  //initial carts (dummy data)
  private carts: Record<number, Cart> = {
    1: initialCart([0, 2, 4]),
    2: initialCart([1, 3]),
  };
  constructor() {}

  @Get()
  @UseGuards(JwtAuthGuard)
  //we return a Promise with a Cart
  async index(@Request() req): Promise<Cart> {
    return this.carts[req.user.userId] ?? { cartItems: [] };
  }

  //post endpoint to add item. In the body it will contain the id of the item we want to add
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() { id }: { id: string }): Promise<Cart> {
    const cart = this.carts[req.user.userId];
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === parseInt(id),
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.cartItems.push({
        ...products.find((product) => product.id === parseInt(id)),
        quantity: 1,
      });
    }
    return cart;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async destroy(@Request() req): Promise<Cart> {
    this.carts[req.user.userId] = { cartItems: [] };
    return this.carts[req.user.userId];
  }
}
//curl -X POST http://localhost:8080/auth/login -d '{"username": "maria", "password": "123"}' -H "Content-Type: application/json"
//will return a TOKEN, insert it in the next api call:
//curl http://localhost:8080/cart -H "Authorization: Bearer TOKEN"
