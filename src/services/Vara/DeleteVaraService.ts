import prismaClient from '../../prisma'

interface VaraRequest {
    varaId: string;
}

class DeleteVaraService {
    async execute({ varaId }: VaraRequest) {

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