import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stub";
import { JwtService } from "@nestjs/jwt";
import { RoleService } from "../../role/role.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Role } from "../../role/models/role.model";
import { CreateUserDto } from "../dto/create-user.dto";

describe("User service", () => {
  let usersService: UsersService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    destroy: jest.fn(),
  };
  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => "USER"),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RoleService,
        {
          provide: getModelToken(User),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesModel,
        },
      ],
    }).compile();
    usersService = moduleRef.get(UsersService);
  });

  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when create User is called", () => {
      let createUserDto: CreateUserDto;
      let newUser: User;
      beforeEach(async () => {
        createUserDto = {
          name: userStub().name!,
          email: userStub().email!,
          password: userStub().password!,
          value: userStub().value!,
        };
        newUser = await usersService.create(createUserDto);
        console.log(newUser);
      });
      it("sdf", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
        });
      });
    });
  });

  describe("findOne", () => {
    describe("when findOne is called", () => {
      test("then it should call userServise", async () => {
        expect(await usersService.findOne(userStub().id!)).toEqual(userStub());
      });
    });
  });

  describe("findAll", () => {
    describe("when finsall is called", () => {
      test("asd", async () => {
        expect(await usersService.findAll()).toEqual([userStub()]);
      });
    });
  });

//   describe("findByEmail", () => {
//     describe("when findByEmail is called", async () => {
//       expect(await usersService.findByEmail(userStub().email!)).toEqual(
//         userStub()
//       );
//     });
//   });
});
