import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  await prisma.column.deleteMany();

  // Create columns
  const todoColumn = await prisma.column.create({
    data: { name: "Todo" },
  });

  const inProgressColumn = await prisma.column.create({
    data: { name: "In Progress" },
  });

  const doneColumn = await prisma.column.create({
    data: { name: "Done" },
  });

  // Create users
  const alice = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Smith",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
  });

  // Create tasks
  await prisma.task.create({
    data: {
      title: "Implement authentication",
      content: "Set up NextAuth.js for user authentication",
      columnId: todoColumn.id,
      assigneeId: alice.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Design system",
      content: "Create consistent component library",
      columnId: todoColumn.id,
      assigneeId: bob.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Kanban board",
      content: "Create drag and drop kanban board",
      columnId: inProgressColumn.id,
      assigneeId: alice.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Project setup",
      content: "Initial project configuration",
      columnId: doneColumn.id,
      assigneeId: bob.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
