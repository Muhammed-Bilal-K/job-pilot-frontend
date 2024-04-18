interface IMessage{
    _id?: null | undefined
    conversationId:string | undefined,
    sender:string | undefined,
    text:string | undefined,
    createdAt? : number
}

export default  IMessage