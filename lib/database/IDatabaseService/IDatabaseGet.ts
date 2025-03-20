export interface IDatabaseGet {
    get: <T>(tableName: string,) => Promise<T[] | null>
};