import json
import os
import sys
import time

from PyQt5 import uic, QtWidgets, QtCore
from PyQt5.QtWidgets import *


# UI파일 연결
# 단, UI파일은 Python 코드 파일과 같은 디렉토리에 위치해야한다.
form_class = uic.loadUiType("tetrisScoreForm.ui")[0]

resultPath = "/Users/rudals/Desktop/tetrisRank.txt"
path = "/Users/rudals/Downloads/"


# 화면을 띄우는데 사용되는 Class 선언
class WindowClass(QMainWindow, form_class):
    score = None

    def __init__(self, score):
        super().__init__()
        self.setWindowFlags(QtCore.Qt.WindowStaysOnTopHint)
        self.setupUi(self)

                
        self.score = score
        self.scoreView.setText(score)
        
    def accept(self):
        tf = open(resultPath, 'a')
        tf.write(self.score + "/" + self.studentNum.text() + "/" + self.name.text() + "/" + self.phoneNum.text() + "\n")
        tf.close()
        
        self.close()
        
        return

    def reject(self):
        print("close")
        self.close()
       

    
def file_check():
    a = os.listdir(path)
    path_len_org = len(a)
    while True:
        time.sleep(2)
        b = os.listdir(path)
        path_len_final = len(b)
        if path_len_org < path_len_final:
            changed = path + [x for x in b if x not in a][0]
            
            f = open(changed, 'r')
            line = json.loads(f.readline())
            f.close()
            
            # WindowClass의 인스턴스 생성
            myWindow = WindowClass(str(line["endcontext"]["score"]))
            
            myWindow.show()
    
            app.exec_()
                          
            os.remove(changed)
            
            print("했당")
            
            
        elif path_len_org > path_len_final:
            print("A file is removed")
            return
            # return "file is removed"
        else:
            pass


if __name__ == "__main__":
    # file_check()
    # QApplication : 프로그램을 실행시켜주는 클래스
    app = QApplication(sys.argv)
            
    file_check()

