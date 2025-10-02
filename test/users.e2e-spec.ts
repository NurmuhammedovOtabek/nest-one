import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "../src/app.module"
import request from "supertest"

describe("User (e2e)", ()=>{
  let app: INestApplication;
  let token: String;

  jest.setTimeout(15000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/singin")
      .send({
        email: "bb@gmail.com",
        password: "string",
      });
    token = response.body.token;
    console.log("token", token);
  });

  it("/user (GRT) --> 200 OK", () => {
    return request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("/user (GRT) --> 200 OK", () => {
    return (
      request(app.getHttpServer())
        .get("/users")
        // .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  // it("/auth/singup (POST) --> 201", async ()=>{
  //     return request(app.getHttpServer()).post("/auth/singup").send({
  //       name: "qA555",
  //       email: "qa555@gmail.com",
  //       password: "456i551",
  //       value: "Admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(201)
  // });

  it("/auth/singup (POST) --> 409", async ()=>{
      return request(app.getHttpServer()).post("/auth/singup").send({
        name: "qA555",
        email: "qa555@gmail.com",
        password: "456i551",
        value: "Admin",
      })
      .expect("Content-Type", /json/)
      .expect(409)
  });


  

  afterAll(async () => {
    await app.close();
  });
})