import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data first
  await prisma.task.deleteMany();
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

  // Create tasks
  await prisma.task.create({
    data: {
      title: "Implement authentication",
      content: "Set up NextAuth.js for user authentication",
      columnId: todoColumn.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Design system",
      content: "Create consistent component library",
      columnId: todoColumn.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Kanban board",
      content: "Create drag and drop kanban board",
      columnId: inProgressColumn.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Project setup",
      content: "Initial project configuration",
      columnId: doneColumn.id,
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
