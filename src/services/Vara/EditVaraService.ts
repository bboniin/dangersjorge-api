import prismaClient from '../../prisma'

interface VaraRequest {
    name: string;
    judge: string;
    varaId: string
}

class EditVaraService {
    async execute({ name, judge, varaId }: VaraRequest) {

        if (!name || !judge) {
            throw new Error("Nome e juiz são obrigatórios")
        }

        const varaExists = await prismaClient.vara.findFirst({
            where: {
                id: varaId
            }
        })

        if (!varaExists) {
            throw new Error("Vara não encontrada")
        }

        const varaAlreadyExists = await prismaClient.vara.findFirst({
            where: {
                name: name,
                visible: true
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
                name: name,
                judge: judge
            }
        })

        return (vara)
    }
}

export { EditVaraService }