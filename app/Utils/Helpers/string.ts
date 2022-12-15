import { string } from "@ioc:Adonis/Core/Helpers";

export function getFileExtension(filename: any) {
    return filename.split(".").pop();
}

export const titleCase = (value: string): string => {
    if (!!value && typeof value !== "undefined") {
        return string.titleCase(value);
    }
    return "";
}

export const htmlFilter = (value: any, encodeSymbols: boolean = true) => {
    return string.escapeHTML(value, {
        encodeSymbols: encodeSymbols
    });
}

export const trim = (value: any) => {
    return string.condenseWhitespace(value);
}

export const randomChar = (length: number): string => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const randomUUID = () => {
    return (
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1) +
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    );
};
