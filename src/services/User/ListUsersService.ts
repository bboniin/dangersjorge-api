import prismaClient from '../../prisma'

interface UserRequest {
    type: string;
    page: number;
    all: boolean;
}

class ListUsersService {
    async execute({ type, page, all }: UserRequest) {

        let filter = {}


        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }

        if(type == "ADMIN"){
            const usersTotal = await prismaClient.user.count({
                where: {
                    visible: true,
                    role: "ADMIN",
                }
            })
            const users = await prismaClient.user.findMany({
                where: {
                    visible: true,
                    role: "ADMIN",
                },
                ...filter
            })
            return ({users, usersTotal})  
        }else{
            if(type == "SECRETARY"){
                const usersTotal = await prismaClient.user.count({
                    where: {
                        visible: true,
                        role: "SECRETARY",
                    }
                })
                const users = await prismaClient.user.findMany({
                    where: {
                        visible: true,
                        role: "SECRETARY"
                    },
                    ...filter
                })
                return ({users, usersTotal})  
            }else{
                if(type == "LAWYER"){
                    const usersTotal = await prismaClient.user.count({
                        where: {
                            visible: true,
                            role: "LAWYER",
                        }
                    })
                    const users = await prismaClient.user.findMany({
                        where: {
                            visible: true,
                            role: "LAWYER"
                        },
                        ...filter
                    })
                    return ({users, usersTotal})  
                }else{
                    const usersTotal = await prismaClient.user.count({
                        where: {
                            visible: true
                        }
                    })
                    const users = await prismaClient.user.findMany({
                        where: {
                            visible: true
                        },
                        ...filter
                    })
                    return ({users, usersTotal})  
                }
            }
        }
    }
}

export { ListUsersService }