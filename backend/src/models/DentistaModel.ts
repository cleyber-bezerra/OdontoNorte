import { pool } from '../config/db';
export class DentistaModel {
  static async listar() {
    return (await pool.query('SELECT * FROM dentista ORDER BY id')).rows;
  }
}
