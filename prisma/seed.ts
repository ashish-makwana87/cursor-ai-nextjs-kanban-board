import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
  //columns
  const todoColumn = await prisma.column.upsert({
    where: {name: "ToDo"},
    update: {},
    create: {name: "ToDo"}
  })
  
  const inProgressColumn = await prisma.column.upsert({where: { name: "In Progress" },
    update: {},
    create: { name: "In Progress" }})

const doneColumn = await prisma.column.upsert({
    where: { name: "Done" },
    update: {},
    create: { name: "Done" },
  });
 
const deepak = await prisma.user.upsert({
    where: { name: "Deepak Patadia" },
    update: { avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/meeting-2284501_1280_ku8tfa.jpg" },
    create: {
      name: "Deepak Patadia",
      avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/meeting-2284501_1280_ku8tfa.jpg",
    },
  });

  const saurav = await prisma.user.upsert({
    where: { name: "Saurav Ahir" },
    update: { avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/people-2569234_1280_gg2ouo.jpg" },
    create: {
      name: "Saurav Ahir",
      avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/people-2569234_1280_gg2ouo.jpg",
    },
  });

  const dimple = await prisma.user.upsert({
    where: { name: "Dimple Hirwani" },
    update: { avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/friendship-2366955_1280_t5xg1f.jpg" },
    create: {
      name: "Dimple Hirwani",
      avatarUrl: "https://res.cloudinary.com/ddulynvdq/image/upload/v1757436323/friendship-2366955_1280_t5xg1f.jpg",
    },
  });

  const tasks = [
    {
      title: "Implement authentication",
      content: "Set up NextAuth.js for user authentication",
      columnId: todoColumn.id,
      assigneeId: deepak.id,
    },
    {
      title: "Design system",
      content: "Create consistent component library",
      columnId: todoColumn.id,
      assigneeId: saurav.id,
    },
    {
      title: "Kanban board",
      content: "Create drag and drop kanban board",
      columnId: inProgressColumn.id,
      assigneeId: dimple.id,
    },
    {
      title: "Project setup",
      content: "Initial project configuration",
      columnId: doneColumn.id,
      assigneeId: deepak.id,
    },
  ];

  for (const task of tasks) {
    const existing = await prisma.task.findFirst({
      where: { title: task.title, columnId: task.columnId },
    });
    if (existing) {
      await prisma.task.update({
        where: { id: existing.id },
        data: task,
      });
    } else {
      await prisma.task.create({ data: task });
    }
  }

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
