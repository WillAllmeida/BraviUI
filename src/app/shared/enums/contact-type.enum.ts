export enum ContactType {
    Telefone = 0,
    Email = 1,
    Whatsapp = 2
}

export const ContactTypeToIcon: Record<number, string> = {
    0: "phone",
    1: "email",
    2: "chat"
}