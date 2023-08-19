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
var IUserResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const interfaces_1 = require("../../../../modules/user/interfaces");
const interfaces_2 = require("../../../../shared/interfaces");
let IUserResponse = IUserResponse_1 = class IUserResponse extends interfaces_2.IResponse {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => interfaces_1.IUserPublic }),
    __metadata("design:type", Object)
], IUserResponse.prototype, "data", void 0);
IUserResponse = IUserResponse_1 = __decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'User fetched successfully',
        type: IUserResponse_1,
    })
], IUserResponse);
exports.IUserResponse = IUserResponse;
//# sourceMappingURL=IUser.response.js.map