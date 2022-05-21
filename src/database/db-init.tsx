import { DatabaseConnection } from './db-connection'

var db : any = null;
export default class DatabaseInit {

    constructor() {
        db = DatabaseConnection.getConnection()
        this.InitDb()
    }
    private InitDb() {
        var sql = [
            `DROP TABLE IF EXISTS  weather;`,
            `CREATE TABLE IF NOT EXISTS weather (id integer primary key autoincrement, nome text);`
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(db);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}