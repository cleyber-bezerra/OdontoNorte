import { Request, Response } from 'express';
import { ConsultaModel } from '../models/ConsultaModel';
export class ConsultaController {
  static async listar(_req: Request, res: Response) {
    try { res.json(await ConsultaModel.listar()); }
    catch { res.status(500).json({ erro: 'Não foi possível listar consultas.' }); }
  }
  static async criar(req: Request, res: Response) {
    const d = req.body;
    if (!d.paciente_id || !d.dentista_id || !d.data_consulta || !d.hora_consulta || !d.procedimento || d.valor === undefined)
      return res.status(400).json({ erro: 'Preencha todos os dados da consulta.' });
    try { res.status(201).json(await ConsultaModel.criar({ ...d, status: d.status || 'Agendada' })); }
    catch { res.status(400).json({ erro: 'Dados da consulta inválidos.' }); }
  }
}
