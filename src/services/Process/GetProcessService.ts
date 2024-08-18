import prismaClient from '../../prisma'

interface ProcessRequest {
    processId: string;
}

class GetProcessService {
    async execute({ processId }: ProcessRequest) {

        const process = await prismaClient.process.findUnique({
            where: {
                id: processId
            },
            include: {
                observations: true,
                client: true,
                vara: true,
                lawyer: true
            }
        })

        const lawyers = await prismaClient.user.findMany({
            where: {
                role: "LAWYER"
            }
        })

        let lawyersObj = {}
        lawyers.map((item)=>{
          lawyersObj[item.id] = item.name
        })

        process["lawyersName"] = process.lawyers ? process.lawyers.split(",").map((item, idx)=>{ return idx != 0 ? ", " + lawyersObj[item] : lawyersObj[item]}) : "Não cadastrado"

        return (process)
    }
}

export { GetProcessService }