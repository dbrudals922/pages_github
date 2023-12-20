var answerNum = new Array();
var numLength = 3;
var check = true;
var userNum = new Array();

const button = Array.prototype.slice.call(document.querySelectorAll('button'));
const backButton = document.querySelectorAll('button')[1];

const answer = document.getElementsByClassName('answer-item');

window.onload = function () {
    setNumber();
    button[0].addEventListener('click', getUserName);

    button.shift()
    button.shift()

    // ADD CLICK EVENT
    for (var i in button) {
        button[i].addEventListener('click', buttonClickHandler);
        i++;
    }
    backButton.addEventListener('click', backButtonClickHandler);
}


// 맞출 숫자 지정
function setNumber() {
    var random;
    answerNum.splice(0, answerNum.length);
    while (answerNum.length < numLength) {
        random = Math.floor(Math.random() * 10);

        for (var i = 0; i < answerNum.length; i++) {
            if (answerNum[i] == random) {
                check = false;
                break;
            }
        }

        if (check && answerNum[0] != 0) {
            answerNum.push(random);
        }
        check = true;
    }

    console.log(answerNum);
    // document.getElementById("answer").innerText = getNum;
}



function checkNumber() {
    if (userNum) {
        //check strike,ball,out
        var strike, ball;

        strike = 0;
        ball = 0;

        for (var i = 0; i < answerNum.length; i++) {
            for (var k = 0; k < userNum.length; k++) {
                if ((answerNum[i] == userNum[k]) && (i == k)) { // 위치와 숫자가 모두 맞을때
                    strike++;
                } else if ((answerNum[i] == userNum[k]) && (i != k)) { // 숫자만 맞을때
                    ball++;
                }
            }
        }

        result = {}
        result['OUT'] = 3 - (strike + ball);
        result['B'] = ball;
        result['S'] = strike;

        return result;
    }

    // if (strike == 0 && ball == 0) { // 맞는 숫자가 하나도 없을 때
    //     setText.innerHTML += userText + " : out!\n";
    // } else if (strike == numLength) { // 맞췄을 때
    //     setText.innerHTML += numLength
    //         + "strike! you won the game!!!\nclick restart to play again\n";
    //     document.getElementById("victoryImg").style.display = "inline";
    // } else {
    //     setText.innerHTML += userText + " : ";
    //     setText.innerHTML += (strike + " strike, " + ball + " ball!\n");
    // }
}


// Clicked Number Button
const buttonClickHandler = (event) => {
    // alert(event.target.innerText + ' Click!');
    var f = 0;

    while (f < answer.length) {
        if (!answer[f].innerText && !userNum.includes(event.target.innerText)) {
            answer[f].innerText = event.target.innerText;
            userNum.push(event.target.innerText);
            break;
        }
        f++;
    }

    if (f >= 0) {
        backButton.style.display = "block";
    }

    if (f == 2) {
        for (var i in button) {
            button[i].disabled = true;
        }

        backButton.style.display = "none";

        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.style.fontSize = "40px";

        resultNum = showResultNumber();

        // const resultNum = document.createElement('div');

        // resultNum.style.display = "flex";
        // resultNum.style.padding = "0 20px";
        // resultNum.style.justifyContent = "space-around";

        // for (var i in userNum) {
        //     const num = document.createElement('span');
        //     num.appendChild(document.createTextNode(userNum[i]));
        //     resultNum.appendChild(num);
        // }

        resultBalls = showResultBall(userNum.join());

        resultItem.appendChild(resultNum);
        resultItem.appendChild(resultBalls);

        document.getElementsByClassName('result')[0].appendChild(resultItem);

        // unfade(resultBalls);

    }
};

function showResultNumber() {
    const resultNum = document.createElement('div');

    resultNum.style.display = "flex";
    resultNum.style.padding = "0 20px";
    resultNum.style.justifyContent = "space-around";

    for (var i in userNum) {
        const num = document.createElement('span');
        num.appendChild(document.createTextNode(userNum[i]));
        resultNum.appendChild(num);
    }

    return resultNum;
}


// Clicked Back Button
const backButtonClickHandler = () => {
    var f = 0;
    while (f < answer.length) {
        if (answer[f].innerText) {
            f++;
        }
        else {
            answer[f - 1].innerText = null;
            userNum.pop();
            if (f - 1 == 0) {
                backButton.style.display = "none";
            }
            break;
        };

    }
}

function showResultBall(userNum) {
    const result = checkNumber(userNum);
    const resultKeys = Object.keys(result);

    const resultBalls = document.createElement("div");
    resultBalls.style.display = "flex";
    resultBalls.style.justifyContent = "space-around";
    resultBalls.style.alignItems = "center";
    resultBalls.style.padding = "0 8px";

    var c = 1;
    for (var i in resultKeys) {
        // console.log(result[resultKeys[i]]);

        for (var j = 0; j < result[resultKeys[i]]; j++) {
            const a = document.createElement("span");
            a.classList.add(resultKeys[i]);
            a.classList.add('item-' + c)
            a.innerText = resultKeys[i];
            a.style.width = "40px";
            a.style.height = "40px";
            a.style.borderRadius = "20px";
            a.style.alignItems = "center";
            a.style.display = "inline-flex";
            a.style.justifyContent = "center";
            a.style.font = "Jua";
            a.style.color = "white";
            a.style.opacity = 0;
            a.style.animationName = "fadeIn";
            a.style.animationFillMode = "forwards";
            a.style.animationTimingFunction = "ease-out";
            a.style.animationDuration = "1s";

            if (c == 2) {
                a.style.animationDelay = ".5s";
            } else if (c == 3) {
                a.style.animationDelay = "1s";

                const vm = this;
                a.addEventListener("animationend", () => {
                    if (vm.result["S"] == 3) {
                        alert("성공!!")
                        document.getElementsByClassName('result')[0].innerText = null;
                    } else if (document.getElementsByClassName("result-item").length >= 9) {
                        alert("실패!");
                        document.getElementsByClassName('result')[0].innerText = null;
                    }
                    vm.resetGame();
                });
            }

            if (resultKeys[i] == "OUT") {
                a.style.backgroundColor = "red";
                a.style.fontSize = "19px";
            } else if (resultKeys[i] == "B") {
                a.style.backgroundColor = "#daa520";
                a.style.fontSize = "27px";
            } else {
                a.style.backgroundColor = "green";
                a.style.fontSize = "27px";
            }
            resultBalls.appendChild(a);
            c++;

        }
    }

    return resultBalls;
}

function resetGame() {
    userNum = [];

    for (var i in answer) {
        answer[i].innerText = null;
    }
    for (var i in button) {
        button[i].disabled = false;
    }
}

function getUserName() {
    console.log(document.getElementById("userName").value);

    document.getElementsByClassName('profile')[0].style.display = "none";
    document.getElementsByClassName('game')[0].style.opacity = 100;


}