//import express 和 ws 套件
const WebSocket = require('ws');

let ws = new WebSocket('ws://localhost:3000')
let results = [5,4,3,2,1];
let resultIndex = 0;
let messageInterval;
ws.onopen = () => {
    console.log('open connection');
    messageInterval = ResultScheduler();
}

function GetResult(){
    const min = 0;
    const max = 2;
    const rng = Math.floor(Math.random() * (max - min) + min);
    if (rng === 0){
        return "Banker"
    }
    else{
        return "Player"
    }
}
function ResultScheduler(){
    return setInterval(() => {
        if(resultIndex >= results.length){ 
            SendResult()
            clearInterval(messageInterval);
            setTimeout(() => {
                // 間隔五秒後再次啟動定時器
                messageInterval = ResultScheduler();
              }, 5000);
        }
        else{
            SendResult()
        }
    }, 1000)
}
function SendResult(){
    if(resultIndex >= results.length){ 
        resultIndex = 0;
        let result = GetResult()
        ws.send(result);
        console.log(result);
    }
    else{
        const message = results[resultIndex++];
        ws.send(message);
        console.log(message);
    }
}