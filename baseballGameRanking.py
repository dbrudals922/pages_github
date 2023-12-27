from flask import Flask
from openpyxl.workbook.workbook import Workbook


app = Flask(__name__)

resultPath = "/Users/rudals/Desktop/baseballRank.xlsx"

write_wb = Workbook()
write_ws = write_wb.active
write_ws.append(["이름", "초"])

# 일반적인 라우트 방식입니다.
@app.route('/ranking/<name>/<time>')
def board(name, time):
    write_ws.append([name, time])
    write_wb.save(resultPath)
    print(name+" / "+time)
    return "success"

app.run(host="localhost",port=5001)