export function customFactory<T>(type: new (...args: any[]) => T, ...injections: any[]) {
    return {
        provide: type,
        useFactory: (...args: any[]) => new type(...args),
        inject: injections,
    };
}
