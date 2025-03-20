export interface IDatabaseUpdate {
    update: <T extends { [key: string]: any }>(tableName: string, value: T) => Promise<T[] | null>
};