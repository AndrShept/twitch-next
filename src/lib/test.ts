import { prisma } from './prisma'



export const getTest = async() => {

const test = await prisma.user.findMany()
return test
}