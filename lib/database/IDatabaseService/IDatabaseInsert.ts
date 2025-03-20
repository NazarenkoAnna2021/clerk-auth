export interface IDatabaseInsert {
    insert: <T>(tableName: string, value: Omit<T, 'id'>) => Promise<T[] | null>
};