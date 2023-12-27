import json
import os
import sys
import time

from PyQt5 import uic, QtWidgets, QtCore
from PyQt5.QtWidgets import *

import socket

# UI파일 연결
# 단, UI파일은 Python 코드 파일과 같은 디렉토리에 위치해야한다.
form_class = uic.loadUiType("tetrisScoreForm.ui")[0]

path = "/Users/rudals/Downloads/"

# 소켓 주소
serverAddressPort   = ("10.204.12.100", 12345)


# 화면을 띄우는데 사용되는 Class 선언
class WindowClass(QMainWindow, form_class):
    score = None
    UDPClientSocket = None

    def __init__(self, score):
        super().__init__()
        self.setWindowFlags(QtCore.Qt.WindowStaysOnTopHint)
        self.setupUi(self)
        
        # 클라이언트 쪽에서 UDP 소켓 생성
        self.UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

        self.score = score
        self.scoreView.setText(score)
        
    def accept(self):
        # tf = open(resultPath, 'a')
        # tf.write(self.score + "/" + self.studentNum.text() + "/" + self.name.text() + "/" + self.phoneNum.text() + "\n")
        # tf.close()
        
        resultString =  self.studentNum.text() + "/" + self.name.text() + "/" + self.score + "/" + self.phoneNum.text() + "\n"
        
        # 생성된 UDP 소켓을 사용하여 서버로 전송
        self.UDPClientSocket.sendto(str.encode(resultString), serverAddressPort)
        
        msgFromServer = self.UDPClientSocket.recvfrom(1024)
        
        msg = "Message from Server {}".format(msgFromServer[0].decode("utf-8"))
        print(msg)
        
        self.close()

    def reject(self):
        print("close")
        self.close()

       
def Diff(li1, li2):
    return [x for x in li2 if x not in li1]

    
def file_check():
    a = os.listdir(path)
    while True:
        time.sleep(2)
        b = os.listdir(path)
        if Diff(a, b): 

            changed = path + Diff(a, b)[0]
            
            f = open(changed, 'r')
            line = json.loads(f.readline())
            f.close()
            
            # WindowClass의 인스턴스 생성
            myWindow = WindowClass(str(line["endcontext"]["score"]))
            
            myWindow.show()
    
            app.exec_()
                          
            # os.remove(changed)
            
            print("했당")
        a = b
            


if __name__ == "__main__":
    # QApplication : 프로그램을 실행시켜주는 클래스
    app = QApplication(sys.argv)
    
           
    file_check()
