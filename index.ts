import { Injector } from "./src/injector";
import { Container } from './src/container';

@Injector()
class Database {
  constructor() {}
  insert(table: string, data: { [column: string]: string|number }) {
    console.log(`Insert into '${table}' table:`, data);
  }
}

@Injector()
class Log {
  constructor(protected db: Database) {
  }

  info(message: string) {
    this.db.insert('log', { message });
  }
}

const Controller = () : ClassDecorator => {
  return target => null;
};

@Controller()
class UserController {
  constructor(protected logger: Log, protected db: Database) {
  }

  create(user: any) {
    return this.db.insert('user', user);
  }
}

const container = new Container();
const userInstance = container.bind<UserController>(UserController);
userInstance.create({ name: 'Rafa', email: 'example@test.test'});

const userInstance2 = container.bind<UserController>(UserController);
userInstance2.create({ name: 'Anonymous', email: 'example2@test.test'});
