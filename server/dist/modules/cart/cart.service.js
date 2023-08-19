"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCartItemsByUserId(userId) {
        const cartItems = await this.prisma.cartItem.findMany({ where: { userId }, include: { Product: true } });
        return {
            data: { cartItems },
            message: 'Cart items fetched succesfully',
            statusCode: 200,
        };
    }
    async addCartItem(userId, dto) {
        const existingCartItem = await this.prisma.cartItem.findFirst({ where: { productId: dto.productId, userId } });
        if (existingCartItem) {
            const a = await this.prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + 1 },
            });
            return a;
        }
        const cartItem = await this.prisma.cartItem.create({ data: { userId, quantity: dto.quantity, productId: dto.productId } });
        return cartItem;
    }
    async updateCartItem(userId, dto, cartItemId) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem)
            throw new common_1.NotFoundException('Cart item not found');
        this.ensureUserOwnsCartItem(cartItem, userId);
        const updatedCartItem = await this.prisma.cartItem.update({ data: Object.assign({}, dto), where: { id: cartItemId } });
        return updatedCartItem;
    }
    async deleteCartItem(userId, cartItemId) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem)
            throw new common_1.NotFoundException('Cart item not found');
        this.ensureUserOwnsCartItem(cartItem, userId);
        const deletedCartItem = await this.prisma.cartItem.delete({ where: { id: cartItemId } });
        return deletedCartItem;
    }
    async updateCartItemQuantity(userId, cartItemId, quantity) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem)
            throw new common_1.NotFoundException('Cart item not found');
        this.ensureUserOwnsCartItem(cartItem, userId);
        const updatedCartItem = await this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
            include: { Product: true },
        });
        return updatedCartItem;
    }
    ensureUserOwnsCartItem(cartItem, userId) {
        if (cartItem.userId !== userId)
            throw new common_1.BadRequestException("User doesn't own this cart item");
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map