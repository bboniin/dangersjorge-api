import prismaClient from '../../prisma'

interface VaraRequest {
    name: string;
}

class CreateVaraService {
    async execute({ name }: VaraRequest) {

        if (!name) {
            throw new Error("Nome é obrigatório")
        }

        const varaAlreadyExists = await prismaClient.vara.findFirst({
            where: {
                name: name
            }
        })

        if (varaAlreadyExists) {
            throw new Error("Vara já cadastrada no sistema")
        }

        const vara = await prismaClient.vara.create({
            data: {
                name: name
            }
        })

        return (vara)
    }
}

export { CreateVaraService }