import { compare, hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface UserRequest {
    name: string;
    photo: string;
    email: string;
    password: string;
    passwordOld: string;
    oab: string;
    role: string;
    observation: string;
    userId: string;
}

class EditUserService {
    async execute({ name, password, photo, role, oab, email, passwordOld, observation, userId }: UserRequest) {

        if (email) {
            const userAlreadyExists = await prismaClient.user.findFirst({
                where: {
                    email: email
                }
            })

            if (userAlreadyExists) {
                if (userAlreadyExists.id != userId) {
                    throw new Error("Email já cadastrado")
                }
            }
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        let data = {
            name: name || user.name,
            photo: photo || user.photo,
            oab: oab || user.oab,
            email: email || user.email,
            observation: observation || user.observation
        }

        if(password){
            if(passwordOld){
                const passwordMatch = await compare(passwordOld, user.password)

                if (!passwordMatch) {
                    throw new Error("Senha antiga está incorreta")
                }
            }
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload

            if (user.photo) {
                await s3Storage.deleteFile(user.photo)
            }
        }


        if(role == "ADMIN"){
            const userEdit = await prismaClient.user.update({
                where: {
                    id: userId,
                },
                data: {...data, role: "ADMIN"},
            })
    
            return (userEdit)  
        }
        
        if(role == "SECRETARY"){
            const userEdit = await prismaClient.user.update({
                where: {
                    id: userId,
                },
                data: {...data, role: "SECRETARY"},
            })
    
            return (userEdit)  
        }

        if(role == "LAWYER"){
            const userEdit = await prismaClient.user.update({
                where: {
                    id: userId,
                },
                data: {...data, role: "LAWYER"},
            })
    
            return (userEdit)   
        }
        
        throw new Error("Tipo de Usuário inválido")
    }
}

export { EditUserService }