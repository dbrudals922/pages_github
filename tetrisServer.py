#tcpserver.py

import socket

from openpyxl import Workbook


localIP     = "127.0.0.1"
localPort   = 12345

resultPath = "C:/Users/User/Desktop/tetrisRank.xlsx"

msgFromServer       = "응답완료"
bytesToSend         = str.encode(msgFromServer)

# 데이터그램 소켓을 생성
UDPServerSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

# 주소와 IP로 Bind
UDPServerSocket.bind((localIP, localPort))

print("UDP server up and listening")

write_wb = Workbook()
write_ws = write_wb.active
write_ws.append(["학번", "이름", "점수", "전화번호"])

# 들어오는 데이터그램 Listen
while(True):
    bytesAddressPair = UDPServerSocket.recvfrom(1024)
    message = bytesAddressPair[0]
    address = bytesAddressPair[1]
    
    clientMsg = "Message from Client:{}".format(message.decode("utf-8"))
    clientIP  = "Client IP Address:{}".format(address)
    

    write_ws.append(message.decode("utf-8").split("/"))
    
    write_wb.save(resultPath)
    
    
    print(clientMsg)
    print(clientIP)

    # Sending a reply to client
    UDPServerSocket.sendto(bytesToSend, address)
