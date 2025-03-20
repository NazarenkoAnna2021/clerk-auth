export interface IDatabaseDelete {
    delete: <T>(tableName: string, $id: number) => Promise<T[] | null>
};