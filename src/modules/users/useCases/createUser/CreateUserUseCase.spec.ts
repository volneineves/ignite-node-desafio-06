import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    expect(async () => {
        const user = await createUserUseCase.execute({
            name: "test",
            email: "test@test.com.br",
            password: "123456"
        })

        expect(user).toHaveProperty("id")
    })
  })

  it("should not be able to create a user with exists email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "test",
        email: "test@testing.com",
        password: "123456",
      });

      await createUserUseCase.execute({
        name: "test",
        email: "test@testing.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
