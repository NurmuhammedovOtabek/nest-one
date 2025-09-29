import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { RoleService } from '../role/role.service';
import { Role } from '../role/models/role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleServise: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleServise.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }
    const user = await this.userModel.create(createUserDto);
    await user.$set("roles", [role.id]);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

 async findByEmail(email:string) {
    const user = await this.userModel.findOne({where:{email}, include:{
      model: Role,
      attributes:["value"],
      through:{attributes:[]}
    }})
    return user?.dataValues
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
