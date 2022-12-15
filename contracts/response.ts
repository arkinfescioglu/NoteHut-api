declare module '@ioc:Adonis/Core/Response' {
    interface ResponseContract {
        /**
        * Success Result With Message.
        */
        success(messages?: any): any;

        /**
        * Success Result With Data.
        */
        successWithData(data: any): any;

        /**
         * Error Result With Message.
        */
        error(message?: string | null): any;
    }
}