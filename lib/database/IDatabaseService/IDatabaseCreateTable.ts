export interface IDatabaseCreateTable {
    createTable: (tableName: string, rows: { name: string, type: string }[]) => Promise<void>;
};