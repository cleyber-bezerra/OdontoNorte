import { Request, Response } from 'express';
import { PacienteModel } from '../models/PacienteModel';
export class PacienteController {
  static async listar(_req: Request, res: Response) {
    try { res.json(await PacienteModel.listar()); }
    catch { res.status(500).json({ erro: 'Não foi possível listar pacientes.' }); }
  }
  static async criar(req: Request, res: Response) {
    const { nome, telefone, email } = req.body;
    if (!nome || !telefone || !email) return res.status(400).json({ erro: 'Preencha nome, telefone e e-mail.' });
    try { res.status(201).json(await PacienteModel.criar({ nome, telefone, email })); }
    catch { res.status(400).json({ erro: 'E-mail já cadastrado ou dados inválidos.' }); }
  }
}
