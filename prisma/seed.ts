import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();
const password = "123456"

async function seed() {
  await prisma.user.deleteMany();

  const quantity = 12;

  Array.from(Array(quantity).keys()).forEach(async () => {
    await prisma.user.create({
      data: {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        city: faker.location.city(),
        state: faker.location.state(),
      },
    });
  });
}

seed().finally(() => prisma.$disconnect());