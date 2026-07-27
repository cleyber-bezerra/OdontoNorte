import { pool } from '../config/db';

export interface PacienteEntrada { nome: string; telefone: string; email: string; }

export class PacienteModel {
  static async listar() {
    return (await pool.query('SELECT * FROM paciente ORDER BY id')).rows;
  }
  static async criar(dados: PacienteEntrada) {
    const sql = 'INSERT INTO paciente (nome, telefone, email) VALUES ($1,$2,$3) RETURNING *';
    return (await pool.query(sql, [dados.nome, dados.telefone, dados.email])).rows[0];
  }
}
