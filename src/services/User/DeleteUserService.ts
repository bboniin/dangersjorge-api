import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
}

class DeleteUserService {
    async execute({ userId }: UserRequest) {

        await prismaClient.user.update({
            data: {
                email: userId,
                visible: false
            },
            where: {
                id: userId
            },
        })

        return ("Usuário deletado com sucesso")
    }
}

export { DeleteUserService }