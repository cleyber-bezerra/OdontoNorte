"""Gera um CSV simples com as consultas do banco OdontoNorte."""
import csv, os
import psycopg

conexao = psycopg.connect(
    host=os.getenv('DB_HOST', 'localhost'), port=os.getenv('DB_PORT', '5432'),
    dbname=os.getenv('DB_NAME', 'db_odonto_norte'), user=os.getenv('DB_USER', 'odonto_user'),
    password=os.getenv('DB_PASSWORD', 'odonto123'))

sql = """SELECT p.nome, d.nome, c.data_consulta, c.hora_consulta,
         c.procedimento, c.valor, c.status
         FROM consulta c JOIN paciente p ON p.id=c.paciente_id
         JOIN dentista d ON d.id=c.dentista_id ORDER BY c.data_consulta"""
with conexao, conexao.cursor() as cursor:
    cursor.execute(sql)
    linhas = cursor.fetchall()
with open('relatorio_consultas.csv', 'w', newline='', encoding='utf-8-sig') as arquivo:
    escritor = csv.writer(arquivo, delimiter=';')
    escritor.writerow(['Paciente','Dentista','Data','Hora','Procedimento','Valor','Status'])
    escritor.writerows(linhas)
print(f'Relatório gerado com {len(linhas)} consultas.')
