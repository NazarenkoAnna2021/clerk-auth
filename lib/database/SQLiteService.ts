import * as SQLite from 'expo-sqlite';
import { IDatabaseService } from './IDatabaseService/IDatabaseService';

class SQliteService implements IDatabaseService {
    private _name = ''

    constructor(initName: string) {
        if (this._name === initName) return;
        this._name = initName;
    }

    public createTable = async (tableName: string, rows: { name: string, type: string }[]) => {
        try {
            const db = await SQLite.openDatabaseAsync(this._name);
            const rowsString = rows.reduce((acc, value) => `${acc}, ${value.name} ${value.type}`, '');
            await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL${rowsString});
            `);
            await db.closeAsync();
        } catch (error) {
            console.log('SQliteService -> getPhones: ', JSON.stringify(error, null, ' '));
        };
    }

    public insert = async <T>(tableName: string, value: Omit<T, 'id'>) => {
        try {
            const db = await SQLite.openDatabaseAsync(this._name);
            const rows = Object.keys(value).join(', ');
            const values = Object.values(value) as (string | number)[];
            const valuesString = values.map(() => '?').join(', ');
            await db.runAsync(`INSERT INTO ${tableName} (${rows}) VALUES (${valuesString})`, ...values);
            const allRows = await db.getAllAsync('SELECT * FROM phones');
            await db.closeAsync();
            return allRows as T[];
        } catch (error) {
            console.log('SQliteService -> getPhones: ', JSON.stringify(error, null, ' '));
            return null;
        };
    }

    public update = async <T extends { [key: string]: any }>(tableName: string, value: T) => {
        try {
            const db = await SQLite.openDatabaseAsync(this._name);
            const rows = Object.keys(value).filter(item => item !== 'id');
            const updates = rows.map((item) => `${item} = ${typeof value[item] === 'string' ? `'${value[item]}'` : value[item]}`).join(', ');
            await db.runAsync(`UPDATE ${tableName} SET ${updates} WHERE id = ${value.id}`);
            const allRows = await db.getAllAsync('SELECT * FROM phones');
            await db.closeAsync();
            return allRows as T[];
        } catch (error) {
            console.log('SQliteService -> getPhones: ', JSON.stringify(error, null, ' '));
            return null;
        };
    }

    public get = async <T>(tableName: string) => {
        try {
            const db = await SQLite.openDatabaseAsync(this._name);
            const allRows = await db.getAllAsync(`SELECT * FROM ${tableName}`);
            await db.closeAsync();
            return allRows as T[];
        } catch (error) {
            console.log('SQliteService -> getPhones: ', JSON.stringify(error, null, ' '));
            return null;
        };
    }

    public delete = async <T>(tableName: string, $id: number) => {
        try {
            const db = await SQLite.openDatabaseAsync(this._name);
            await db.runAsync(`DELETE FROM ${tableName} WHERE id = $id`, { $id });
            const allRows = await db.getAllAsync('SELECT * FROM phones');
            await db.closeAsync();
            return allRows as T[];
        } catch (error) {
            console.log('SQliteService -> getPhones: ', JSON.stringify(error, null, ' '));
            return null;
        };
    }

    public get name() {
        return this._name;
    }

};

export const sqliteService = new SQliteService('test.db');