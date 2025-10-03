// scripts/cleanupOrphanUsers.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Looking for orphan users...");

  const users = await prisma.user.findMany({
    include: {
      accounts: true,
      sessions: true,
      blogs: true,
      comments: true,
      categories: true,
      authenticators: true,
    },
  });

  const orphanUsers = users.filter(user =>
    user.accounts.length === 0 &&
    user.sessions.length === 0 &&
    user.blogs.length === 0 &&
    user.comments.length === 0 &&
    user.categories.length === 0 &&
    user.authenticators.length === 0
  );

  console.log(`Found ${orphanUsers.length} orphan users.`);

  for (const user of orphanUsers) {
    console.log(`Deleting user: ${user.id} (${user.email})`);
    await prisma.user.delete({ where: { id: user.id } });
  }

  console.log("Cleanup done!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
