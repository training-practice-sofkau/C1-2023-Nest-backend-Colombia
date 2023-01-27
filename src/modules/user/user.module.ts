import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user/user.controller";
import { CustomerService } from "src/services/customer/customer.service";

@Module({
    controllers:[UserController],
    providers:[CustomerService]
})

export class UserModule{}