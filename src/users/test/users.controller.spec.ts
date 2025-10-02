import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

jest.mock("../users.service");
describe("Users controller test", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleREf = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleREf.get(UsersController);
    usersService = moduleREf.get(UsersService);

    jest.clearAllMocks();
  });
  test("User constroller should be defined", () => {
    expect(usersController).toBeDefined();
  });

  it("User constroller should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create user trst", () => {
    describe("when create user is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;
      const dto = userStub();
      beforeAll(async () => {
        createUserDto = {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          value: dto.value,
        };
        user = await usersController.create(createUserDto);
        // console.log(user);
      });
      it("then it shoould call usersService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      it("then it shoould return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("find all users test", ()=>{
    describe("when find all user is called", () => {
      let users: User[];
      beforeAll(async () => {
        users = await usersController.findAll();
      });
      it("asdfgfdsd", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      it("asdfgfdsd", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  })

   describe("find one users test", () => {
     describe("when find aone user is called", () => {
       let user1: User | null;
       beforeAll(async () => {
         user1 = await usersController.findOne("1");
       });
       it("asdfgfdsd", () => {
         expect(usersService.findOne).toHaveBeenCalled();
       });

       it("asdfgfdsd", () => {
         expect(user1).toEqual(userStub());
       });
     });
   });

   describe("find remove users test", () => {
     describe("when remove user is called", () => {
       let rem:any
       beforeAll(async () => {
         rem = await usersController.remove("1");
       });
       it("asdfgfdsd", () => {
         expect(usersService.remove).toHaveBeenCalled();
       });

       it("asdfgfdsd", () => {
         expect(rem).toEqual("ochdi");
       });
     });
   });
});
