import { pool } from '../config/db';
export interface ConsultaEntrada {
  paciente_id: number; dentista_id: number; data_consulta: string; hora_consulta: string;
  procedimento: string; valor: number; status: string;
}
export class ConsultaModel {
  static async listar() {
    const sql = `SELECT c.id, p.nome AS paciente, d.nome AS dentista, d.especialidade,
      c.data_consulta, c.hora_consulta, c.procedimento, c.valor, c.status
      FROM consulta c JOIN paciente p ON p.id=c.paciente_id
      JOIN dentista d ON d.id=c.dentista_id
      ORDER BY c.data_consulta, c.hora_consulta`;
    return (await pool.query(sql)).rows;
  }
  static async criar(d: ConsultaEntrada) {
    const sql = `INSERT INTO consulta
      (paciente_id,dentista_id,data_consulta,hora_consulta,procedimento,valor,status)
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    return (await pool.query(sql,[d.paciente_id,d.dentista_id,d.data_consulta,d.hora_consulta,d.procedimento,d.valor,d.status])).rows[0];
  }
}
