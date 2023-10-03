// prisma/seed.ts

import { PrismaClient, UserRoles } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy articles
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      role: UserRoles.BUYER,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
      role: UserRoles.BUYER,

    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      role: UserRoles.ADMIN,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
      role: UserRoles.ADMIN,

    },
  });

  const post1 = await prisma.product.upsert({
    where: { title: 'aabcdaa' },
    update: { ownerId: user1.id },
    create: {
      title: 'aaPrismass Adds Support for MongoDB',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      price: 3400,
      ownerId: user1.id,
    },
  });

  const post2 = await prisma.product.upsert({
    where: { title: 'abaacdaaa' },
    update: { ownerId: user2.id },
    create: {
      title: "aWhat'sss new in Paarisma? (Q1/22)",
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      price: 3400,
      ownerId: user2.id,
    },
  });

  const post3 = await prisma.product.upsert({
    where: { title: 'abaaaacaad' },
    update: {},
    create: {
      title: 'aPrisma ssClient Just Beaacame a Lot More Flexible',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      price: 3400,
    },
  });
  console.log({ user1, user2, post1, post2, post3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
