import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    email: string;
    password: string;
    oab: string;
    observation: string;
    role: string;
}

class CreateUserService {
    async execute({ name, password, photo, role, oab, email, observation }: UserRequest) {

        if (!name || !password || !email || !role) {
            throw new Error("Preencha todos os campos obrigatórios")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        let data = {
            name: name,
            password: passwordHash,
            email: email,
            oab: oab,
            observation: observation
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }

        if(role == "ADMIN"){
            const user = await prismaClient.user.create({
                data: {...data, role: "ADMIN"}
            })

            return user    
        }
        
        if(role == "SECRETARY"){
            const user = await prismaClient.user.create({
                data: {...data, role: "SECRETARY"}
            })
            
            return user    
        }

        if(role == "LAWYER"){
            const user = await prismaClient.user.create({
                data: {...data, role: "LAWYER"}
            })
            
            return user    
        }

        throw new Error("Tipo de Usuário inválido")
    }
}

export { CreateUserService }