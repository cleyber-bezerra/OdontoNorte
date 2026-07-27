import { Request, Response } from 'express';
import { DentistaModel } from '../models/DentistaModel';
export class DentistaController {
  static async listar(_req: Request, res: Response) {
    try { res.json(await DentistaModel.listar()); }
    catch { res.status(500).json({ erro: 'Não foi possível listar dentistas.' }); }
  }
}
