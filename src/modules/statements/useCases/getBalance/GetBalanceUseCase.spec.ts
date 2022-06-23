import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryUsersRepository = new InMemoryUsersRepository();
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Modules :: Statements :: Use Cases :: Get Balance", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("Should be able to get the balance", async () => {
    const userCreated = await createUserUseCase.execute({
      name: "Volnei",
      email: "volnei@email.com",
      password: "12345678",
    });

    const balanceFound = await getBalanceUseCase.execute({
      user_id: userCreated.id!,
    });

    expect(balanceFound).toHaveProperty("statement");
    expect(balanceFound).toHaveProperty("balance");

    expect(balanceFound.balance).toBe(0);
  });

  it("Should return user not found when id is invalid", async() => {
    try {
        await getBalanceUseCase.execute({user_id: "invalid id"})
    } catch (error: any) {
        expect(error).toBeInstanceOf(GetBalanceError)
        expect(error.message).toBe("User not found")
        expect(error.statusCode).toBe(404)
    }
  })
});

