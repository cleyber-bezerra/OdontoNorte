CREATE TABLE IF NOT EXISTS paciente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS dentista (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especialidade VARCHAR(80) NOT NULL,
  cro VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS consulta (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER NOT NULL REFERENCES paciente(id),
  dentista_id INTEGER NOT NULL REFERENCES dentista(id),
  data_consulta DATE NOT NULL,
  hora_consulta TIME NOT NULL,
  procedimento VARCHAR(100) NOT NULL,
  valor NUMERIC(10,2) NOT NULL CHECK (valor >= 0),
  status VARCHAR(30) NOT NULL DEFAULT 'Agendada'
);

INSERT INTO paciente (nome, telefone, email) VALUES
('Ana Beatriz Souza', '(62) 99911-2233', 'ana.souza@email.com'),
('Carlos Eduardo Lima', '(62) 99822-3344', 'carlos.lima@email.com'),
('Mariana Oliveira Santos', '(62) 99733-4455', 'mariana.santos@email.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO dentista (nome, especialidade, cro) VALUES
('Dra. Juliana Martins', 'Clínica Geral', 'CRO-GO 12345'),
('Dr. Rafael Almeida', 'Ortodontia', 'CRO-GO 23456'),
('Dra. Fernanda Costa', 'Odontopediatria', 'CRO-GO 34567')
ON CONFLICT (cro) DO NOTHING;

INSERT INTO consulta (paciente_id, dentista_id, data_consulta, hora_consulta, procedimento, valor, status)
SELECT p.id, d.id, CURRENT_DATE + 1, '09:00', 'Limpeza dentária', 180.00, 'Agendada'
FROM paciente p, dentista d WHERE p.email='ana.souza@email.com' AND d.cro='CRO-GO 12345'
AND NOT EXISTS (SELECT 1 FROM consulta WHERE procedimento='Limpeza dentária' AND paciente_id=p.id);

INSERT INTO consulta (paciente_id, dentista_id, data_consulta, hora_consulta, procedimento, valor, status)
SELECT p.id, d.id, CURRENT_DATE + 2, '14:30', 'Avaliação ortodôntica', 150.00, 'Confirmada'
FROM paciente p, dentista d WHERE p.email='carlos.lima@email.com' AND d.cro='CRO-GO 23456'
AND NOT EXISTS (SELECT 1 FROM consulta WHERE procedimento='Avaliação ortodôntica' AND paciente_id=p.id);

INSERT INTO consulta (paciente_id, dentista_id, data_consulta, hora_consulta, procedimento, valor, status)
SELECT p.id, d.id, CURRENT_DATE + 3, '10:15', 'Consulta preventiva infantil', 160.00, 'Agendada'
FROM paciente p, dentista d WHERE p.email='mariana.santos@email.com' AND d.cro='CRO-GO 34567'
AND NOT EXISTS (SELECT 1 FROM consulta WHERE procedimento='Consulta preventiva infantil' AND paciente_id=p.id);
