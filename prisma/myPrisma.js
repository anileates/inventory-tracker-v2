const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.$on('beforeExit', async () => {
    // PrismaClient still available
    await prisma.message.create({
      data: {
        message: "Shutting down server"
      }
    })
})
module.exports = prisma