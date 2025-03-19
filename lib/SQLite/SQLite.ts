import { IPhone } from '@/modules/home/entities/IPhone';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from 'expo-sqlite';

class SQliteService {
    private _name = 'test.db'

    constructor() {
        this.createTables();
    }

    public createTables = async () => {
        const db = await SQLite.openDatabaseAsync(this._name);
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS phones (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, phone INTEGER);
            `);
        await db.closeAsync();
    }

    public insertPhone = async (value: Omit<IPhone, 'id'>) => {
        const db = await SQLite.openDatabaseAsync(this._name);
        await db.runAsync('INSERT INTO phones (name, phone) VALUES (?, ?)', value.name, value.phone);
        const allRows = await db.getAllAsync('SELECT * FROM phones');
        await db.closeAsync();
        return allRows as IPhone[];
    }

    public getPhones = async () => {
        const db = await SQLite.openDatabaseAsync(this._name);
        const allRows = await db.getAllAsync('SELECT * FROM phones');
        await db.closeAsync();
        return allRows as IPhone[];
    }

    public deletePhone = async ($id: number) => {
        const db = await SQLite.openDatabaseAsync(this._name);
        await db.runAsync('DELETE FROM phones WHERE id = $id', { $id });
        const allRows = await db.getAllAsync('SELECT * FROM phones');
        await db.closeAsync();
        return allRows as IPhone[];
    }

    public get name() {
        return this._name;
    }

};

export const sqliteService = new SQliteService();