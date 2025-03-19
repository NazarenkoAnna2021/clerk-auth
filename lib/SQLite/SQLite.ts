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

    public migrateDbIfNeeded = async (db: SQLiteDatabase) => {
        const DATABASE_VERSION = 1;
        let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
            'PRAGMA user_version'
        );
        if (currentDbVersion >= DATABASE_VERSION) {
            return;
        }
        if (currentDbVersion === 0) {
            await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
      `);
            await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
            await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
            currentDbVersion = 1;
        }
        // if (currentDbVersion === 1) {
        //   Add more migrations
        // }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }

};

export const sqliteService = new SQliteService();