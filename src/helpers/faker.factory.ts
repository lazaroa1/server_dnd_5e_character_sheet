import { faker } from '@faker-js/faker';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export function creationRandomUser(): User {
  return {
    id: 1,
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
