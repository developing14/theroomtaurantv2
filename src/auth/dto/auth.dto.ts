import { ObjectId } from "typeorm"

export class AuthDTO {
    email: string
    password: string
}

export class loginPayloadDTO {
    _id: ObjectId
    email: string
    role: string
}