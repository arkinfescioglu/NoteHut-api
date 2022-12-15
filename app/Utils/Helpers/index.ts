
export * from "./app";
export * from "./string";


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function instanceOf<T>(
    object: any,
    key: string
): object is T {
    return key in object;
}

export const getMeasurementTypeErrorMessage = (type: any) => {
  let obj: any = {
    "1": "Günlük Kıyafet Veri Kaydını Zaten Oluşturmuşsunuz.",
    "2": "Kıyafetsiz Veri Kaydını Zaten Oluşturmuşsunuz.",
    "3": "Manuel Veri Kaydını Zaten Oluşturmuşsunuz.",
  }
  return obj?.[type] ?? "";
}
