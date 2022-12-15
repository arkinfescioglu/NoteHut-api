declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {

        /**
         * İs request header has json format.
        */
        wantsJSON(): boolean;

        getId(module?: any): any;
    }
}