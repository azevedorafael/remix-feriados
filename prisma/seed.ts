import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const password = "123456";

async function users() {
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

async function products() {
  await prisma.product.deleteMany();

  const quantity = 12;

  Array.from(Array(quantity).keys()).forEach(async () => {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        color: `${faker.color.human()} and ${faker.color.human()}`,
        href: faker.internet.url(),
        imageSrc: faker.image.cats(),
        imageAlt: faker.lorem.sentence(),
        price: faker.number.int({
          min:1000,
          max:2000,
        }),
      },
    });
  });
}

async function seed() {
  // await users();
  await products();
}

seed().finally(() => prisma.$disconnect());