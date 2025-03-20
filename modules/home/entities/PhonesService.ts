import { IDatabaseService, sqliteService } from "@/lib/database";
import { IPhone } from "./IPhone";

class PhonesService {
    private _tableName = 'phones'

    constructor(private databaseService: IDatabaseService) {
        this.createTable();
    }

    private createTable = async () => {
        await this.databaseService.createTable(this._tableName, [{ name: 'name', type: 'TEXT NOT NULL' }, { name: 'phone', type: 'INTEGER' }])
    };

    public get = async () => {
        const rows = await this.databaseService.get<IPhone>(this._tableName);
        return rows;
    }

    public insert = async (value: Omit<IPhone, 'id'>) => {
        const rows = await this.databaseService.insert<IPhone>(this._tableName, value);
        return rows;
    }

    public update = async (value: IPhone) => {
        const rows = await this.databaseService.update<IPhone>(this._tableName, value);
        return rows;
    }

    public delete = async (id: number) => {
        const rows = await this.databaseService.delete<IPhone>(this._tableName, id);
        return rows;
    }

};

export const phonesService = new PhonesService(sqliteService);