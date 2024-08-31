import prismaClient from '../../prisma'

interface VaraRequest {
    varaId: string;
}

class DeleteVaraService {
    async execute({ varaId }: VaraRequest) {

        const varaAlreadyExists = await prismaClient.vara.findFirst({
            where: {
                id: varaId
            }
        })

        if (!varaAlreadyExists) {
            throw new Error("Vara não encontrada")
        }

        await prismaClient.vara.update({
            data: {
                visible: false
            },
            where: {
                id: varaId
            },
        })

        return ("Vara deletada com sucesso")
    }
}

export { DeleteVaraService }