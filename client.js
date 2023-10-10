//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000')
let resultContainer = new PIXI.Container();


//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    app.stage.addChild(resultContainer);
    resultContainer.x = app.screen.width / 2;
    resultContainer.y = app.screen.height / 2;
    resultContainer.pivot.x = resultContainer.width / 2;
    resultContainer.pivot.y = resultContainer.height / 2;
    let isGrowUp = true
    // Listen for animate update
    app.ticker.add((delta) =>
    {
        // rotate the container!
        // use delta to create frame-independent transform
        if(isGrowUp === true){
            resultContainer.scale.x *= 1.01;
            resultContainer.scale.y *= 1.01;
            if (resultContainer.scale.x >=3){
                isGrowUp = false;
            }
        }
        else{
            resultContainer.scale.x *= 0.99;
            resultContainer.scale.y *= 0.99;
            if (resultContainer.scale.x <0.7){
                isGrowUp = true;
            }
        } 
    });
    console.log('open connection')
}

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection')
}
//接收 Server 發送的訊息
ws.onmessage = event => {
    let data;
    if (event.data instanceof Blob) {
        reader = new FileReader();

        reader.onload = () => {
            data = reader.result;
            const basicText = new PIXI.Text(data);
            resultContainer.children = [];
            resultContainer.addChild(basicText);
            console.log("[DataIsBlob] ws Data: " + reader.result);
        };

        reader.readAsText(event.data);
    }
    else{
        data = event.data;
        console.log("[DataIsRaw] ws Data: "+ event);
    }
}