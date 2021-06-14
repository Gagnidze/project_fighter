// export class Fighter {

//     constructor() { }

//     basicData: {
//         imageURL: string,
//         name: string,
//         nickname: string,
//         surname: string
//     };
//     bodyData: {
//         age: number,
//         height: number,
//         reach: number,
//         weight: number,
//     };
//     desc: string;
//     record: {
//         draw: number,
//         loses: number,
//         wins: number,
//     }
// }

export class Fighter {
    constructor(
        public basicData: {
            imageURL: string,
            name: string,
            nickname: string,
            surname: string
        },
        public bodyData: {
            age: number,
            height: number,
            reach: number,
            weight: number,
        },
        public desc: string,
        public record: {
            draw: number,
            loses: number,
            wins: number,
        },
        public id?: number,
        public userMail?: string
    ) { }
}

export interface singupResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

export interface loginResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}