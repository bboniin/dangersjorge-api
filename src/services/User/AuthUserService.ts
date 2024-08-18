import prismaClient from '../../prisma'
import { sign } from 'jsonwebtoken'
import authConfig from "../../utils/auth"
import { compare } from 'bcryptjs';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        if (!password || !email) {
            throw new Error("Email e Senha são obrigatórios")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email e Senha não correspondem ou não existe")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email e Senha não correspondem ou não existe")
        }

        const token = sign({
            email: user.email,
            role: user.role
        }, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '365d'
        })

        return({
            id: user.id,
            photo: user.photo,
            email: user.email,
            name: user.name, 
            role: user.role,
            oab: user.oab,
            token: token
        })
    }
}

export { AuthUserService }