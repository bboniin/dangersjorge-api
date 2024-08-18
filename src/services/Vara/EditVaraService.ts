import prismaClient from '../../prisma'

interface VaraRequest {
    name: string;
    varaId: string
}

class EditVaraService {
    async execute({ name, varaId }: VaraRequest) {

        if (!name) {
            throw new Error("Nome é obrigatório")
        }

        const varaAlreadyExists = await prismaClient.vara.findFirst({
            where: {
                name: name
            }
        })

        if (varaAlreadyExists) {
            if (varaAlreadyExists.id != varaId) {
                throw new Error("Vara já cadastrada no sistema")
            }
        }

        const vara = await prismaClient.vara.update({
            where: {
                id: varaId,
            },
            data: {
                name: name
            }
        })

        return (vara)
    }
}

export { EditVaraService }