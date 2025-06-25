import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const senhaHash = await bcrypt.hash('admin123',10)

    const admin = await prisma.usuario.upsert({
        where: {email: 'admin@barbearia.com'},
        update: {},
        create: {
            nome: 'Admin Principal',
            email: 'admin@barbearia.com',
            senha_hash: senhaHash,
            cargo: 'Admin'
        }
    })

    console.log('Usuário admin criado:', admin)
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })