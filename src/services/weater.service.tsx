import { Weather } from '../models/weather.model'
import {DatabaseConnection} from '../database/db-connection'

const table = "weather"
const db=DatabaseConnection.getConnection()

export default class WeatherService {


     static addData(param: Weather) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome) 
                values (?)`, 
                [param.nome], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteWeather(nome: string) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from weather where nome = ?;`, [nome], (_, { rows }) => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                	console.log(txError);
				}, ()=>{
					console.log('deleted => ',nome);
				});
    }

/*
     static updateById(param: Weather) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set nome = ? where id = ?;`, [param.nome,param.id], () => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }
*/
      static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from weather`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))
    }


}