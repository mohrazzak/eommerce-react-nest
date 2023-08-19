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
exports.UpdateUserPasswordDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserPasswordDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { oldPassword: { required: true, type: () => String, minLength: 8, maxLength: 16, pattern: "/^(?=.*[a-z])/g" }, newPassword: { required: true, type: () => String, minLength: 8, maxLength: 16, pattern: "/^(?=.*[a-z])/g" } };
    }
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Old Password is required' }),
    (0, class_validator_1.Length)(8, 16, {
        message: 'Old Password should be between 8 and 16 characters long.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])/g, {
        message: 'Old Password should contain at least one lowercase letter.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])/g, {
        message: 'Old Password should contain at least one uppercase letter.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*\d)/g, {
        message: 'Old Password should contain at least one digit.',
    }),
    __metadata("design:type", String)
], UpdateUserPasswordDTO.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'New password is required' }),
    (0, class_validator_1.Length)(8, 16, {
        message: 'New Password should be between 8 and 16 characters long.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])/g, {
        message: 'New Password should contain at least one lowercase letter.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])/g, {
        message: 'New Password should contain at least one uppercase letter.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*\d)/g, {
        message: 'New Password should contain at least one digit.',
    }),
    __metadata("design:type", String)
], UpdateUserPasswordDTO.prototype, "newPassword", void 0);
exports.UpdateUserPasswordDTO = UpdateUserPasswordDTO;
//# sourceMappingURL=UpdateUserPassword.dto.js.map