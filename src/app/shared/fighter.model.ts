export class Fighter {
    basicData: {
        imageURL: string,
        name: string,
        nickname: string,
        surname: string
    };
    bodyData: {
        age: number,
        height: number,
        reach: number,
        weight: number,
    };
    desc: string;
    record: {
        draw: number,
        loses: number,
        wins: number,
    }
}