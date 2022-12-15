import BaseService from "App/Lib/Service/BaseService";
import { inject } from "@adonisjs/fold";
import UserRepository from "App/Repositories/UserRepository";

@inject()
export default class UserService extends BaseService {
    constructor(protected repository: UserRepository) {
        super();
    }

    public async create(input: IUserCreateInput) {
        return await this.repository.create(input);
    }

    public async updateById(input: IUserCreateInput, id: any) {
        return await this.repository.updateById(input, id);
    }
}


interface IUserCreateInput {
    email: string;
    name: string;
    lastname: string;
    password: string;
}