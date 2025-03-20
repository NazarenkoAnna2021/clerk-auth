import { IDatabaseCreateTable } from "./IDatabaseCreateTable";
import { IDatabaseDelete } from "./IDatabaseDelete";
import { IDatabaseGet } from "./IDatabaseGet";
import { IDatabaseInsert } from "./IDatabaseInsert";
import { IDatabaseUpdate } from "./IDatabaseUpdate";


export interface IDatabaseService extends IDatabaseCreateTable, IDatabaseGet, IDatabaseInsert, IDatabaseDelete, IDatabaseUpdate { }