export declare const appConfig: (() => {
    environment: string;
    database: {
        url: string;
    };
    client: {
        localUrl: string;
        productionUrl: string;
    };
    server: {
        localUrl: string;
        productionUrl: string;
    };
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        senderName: string;
        senderEmail: string;
    };
    jwt: {
        secret: string;
        duration: string;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    environment: string;
    database: {
        url: string;
    };
    client: {
        localUrl: string;
        productionUrl: string;
    };
    server: {
        localUrl: string;
        productionUrl: string;
    };
    mail: {
        host: string;
        port: number;
        user: string;
        password: string;
        senderName: string;
        senderEmail: string;
    };
    jwt: {
        secret: string;
        duration: string;
    };
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
}>;
