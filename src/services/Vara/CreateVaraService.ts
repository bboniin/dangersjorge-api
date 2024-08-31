import prismaClient from '../../prisma'

interface VaraRequest {
    name: string;
    judge: string;
}

class CreateVaraService {
    async execute({ name, judge }: VaraRequest) {

        if (!name || !judge) {
            throw new Error("Nome e juiz são obrigatórios")
        }

        const varaAlreadyExists = await prismaClient.vara.findFirst({
            where: {
                name: name,
                visible: true
            }
        })

        if (varaAlreadyExists) {
            throw new Error("Vara já cadastrada no sistema")
        }

        const vara = await prismaClient.vara.create({
            data: {
                name: name,
                judge: judge
            }
        })

        return (vara)
    }
}

export { CreateVaraService }