import prismaClient from '../../prisma'

interface ClientRequest {
    name: string;
    email: string;
    phoneNumber: string;
    type: string;
    cpfOrCnpj: string;
    observation: string;
}

class CreateClientService {
    async execute({ name, email, phoneNumber, type, cpfOrCnpj, observation }: ClientRequest) {

        if (!name || !type) {
            throw new Error("Nome e tipo são obrigatórios")
        }

        if(cpfOrCnpj){
            const clientAlreadyExists = await prismaClient.client.findFirst({
                where: {
                    cpfOrCnpj: cpfOrCnpj
                }
            })

            if (clientAlreadyExists) {
                throw new Error("Cliente já cadastrado no sistema")
            }
        }
        
        const client = await prismaClient.client.create({
            data: {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                type: type,
                cpfOrCnpj: cpfOrCnpj,
                observation: observation
            }
        })

        return (client)
    }
}

export { CreateClientService }