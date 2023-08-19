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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const shared_1 = require("../../shared");
const dto_1 = require("./dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async getUserCartItems(req) {
        return this.cartService.getCartItemsByUserId(req.user.id);
    }
    async addCartItem(req, cartItemDTO) {
        return this.cartService.addCartItem(req.user.id, cartItemDTO);
    }
    async updateCartItem(req, cartItemDTO, cartItemId) {
        return this.cartService.updateCartItem(req.user.id, cartItemDTO, cartItemId);
    }
    async updateCartItemQuantity(req, cartItemDTO, cartItemId) {
        const cartItem = await this.cartService.updateCartItemQuantity(req.user.id, cartItemId, cartItemDTO.quantity);
        return {
            data: { cartItem },
            message: 'CartItem updated successfully',
            statusCode: 200,
        };
    }
    async deleteCartItem(req, cartItemId) {
        console.log('test');
        return this.cartService.deleteCartItem(req.user.id, cartItemId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getUserCartItems", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CartItemDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addCartItem", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('cartItemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CartItemDTO, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItem", null);
__decorate([
    (0, common_1.Patch)('/:cartItemId'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('cartItemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CartItemUpdateQuantity, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItemQuantity", null);
__decorate([
    (0, common_1.Delete)('/:cartItemId'),
    (0, common_1.UseGuards)(shared_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('cartItemId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCartItem", null);
CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map