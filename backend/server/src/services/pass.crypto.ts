import { compare, genSalt, hash } from "bcryptjs";

const RAND_ROUNDS = 5;

export const hashPassword = async (password: string): Promise<string>  => {
    
    const passCode = await genSalt(RAND_ROUNDS);
    return await hash(password, passCode);
}

export const checkPassword = async (password: string, hashPassword: string): Promise<boolean>  => {
    return await compare(password, hashPassword);
}