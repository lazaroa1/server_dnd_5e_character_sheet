import { faker } from '@faker-js/faker';

interface User {
  name: string;
  email: string;
  password: string;
}

export function creationRandomUser(): User {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
