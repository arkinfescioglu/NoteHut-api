import moment from "moment";


export function convertMsToMinutesSeconds(milliseconds: any): any {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    //return seconds === 60
    //? `${minutes + 1}:00`
    //: `${minutes}:${padTo2Digits(seconds)}`;
    return minutes;
}

export const dateFormat = (date: any, format: string = "DD.MM.YYYY") => {
    if (!!date) return moment(date).format(format);
};

export const dateFormatForInput = (date: any, format: string = "YYYY-MM-DD") => {
    if (!!date) return moment(date).format(format);
};

export const dateFormatWithTime = (date: any, format: string = "DD.MM.YYYY HH:MM") => {
    if (!!date) return moment(date).format(format);
};

export const dateCompareWithToday: any = (
    endDate: any,
    lambda: any = null
) => {
    const date = new Date();
    let now = date.toISOString()
    let momentA = moment(now);
    let momentB = moment(endDate);
    if (!!lambda && typeof (lambda) === 'function') {
        return lambda(momentA, momentB);
    }
    let m = moment.utc(endDate, "YYYY-MM-DD HH:mm:ss");
    let v = moment(now, "YYYY-MM-DD HH:mm:ss");
    return m.isAfter(v);
};