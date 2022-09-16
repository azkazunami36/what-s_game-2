var image = [280, 10, 10], playaudio = "nyancata.mp3", x, y; //imageは画像の出現率、playaudioは再生する音声、x、yは画像とマウスのずれ

var windowoverflow = (x1, y1, ww, wh, iw, ih) => { //ブラウザより外に行かないようにする関数
    var x2 = x1, y2 = y1; //まずはそのまま
    if (y1 > (wh - ih)) { y2 = wh - ih; }; //座標が画面枠より下なら
    if (y1 < 0) { y2 = 0; }; //座標が画面枠より上なら
    if (x1 > (ww - iw)) { x2 = ww - iw; }; //座標が画面枠より右なら
    if (x1 < 0) { x2 = 0; }; //座標が画面枠より左なら
    return [x2, y2]; //結果を出力
};

window.onload = function () {
    var bodyid = document.body; //body取得
    let fors = 0; //interval用(forと同じ仕組みにするため)
    interval = setInterval(() => {
        if (fors > 5) clearInterval(interval);
        var bo0 = document.createElement("div");
        var bo1 = document.createElement("img");
        var sW = Math.floor(Math.random() * (document.documentElement.clientWidth - 90));
        var sH = Math.floor(Math.random() * (document.documentElement.clientHeight - 90));
        bo0.classList = "window";
        bo0.style.top = sH + "px";
        bo0.style.left = sW + "px";
        var types = Math.floor(Math.random() * (image[0] + image[1] + image[2]));
        if (types < image[0]) {
            bo1.src = "img.png";
        } else if (types < (image[1] + image[0])) {
            bo1.src = "cat.gif";
        } else if (types < (image[2] + image[1] + image[0])) {
            bo1.src = "miku.gif";
        };
        bo1.style.width = "100%";
        bo0.appendChild(bo1);
        bodyid.appendChild(bo0);
        bo0.addEventListener("mousedown", dragstart, false);
        bo0.addEventListener("touchstart", dragstart, false);
        fors++;
    }, 50);
    addEventListener("mousemove", dragmove, false);
    addEventListener("touchmove", dragmove, false);
    addEventListener("mouseup", dragend, false);
    addEventListener("touchend", dragend, false);
};
const dragstart = e => { //クリック時などに使う関数
    plays();
    console.log("クラス追加");
    console.log(e.target)
    e.preventDefault();
    e.target.classList.add("drag"); //クラス追加
    if (e.type == "mousedown") { var ev = e; } else { var ev = e.changedTouches[0]; }; //スマホ用座標かを確認し、置き換え
    //mousedownかtouchstartかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に座標が入るため、置き換えが必須)
    x = ev.clientX - e.target.getBoundingClientRect().left; //要素とマウスとのズレを記録、横
    y = ev.clientY - e.target.getBoundingClientRect().top; //要素とマウスとのズレを記録、縦
};
const dragmove = e => { //ドラッグ時やすワイプ時に使う関数
    var dragitem = document.getElementsByClassName("drag")[0]; //オブジェクト取得
    if (dragitem == undefined) return; //オブジェクトがなければ終了
    e.preventDefault(); //通常起こる動作を抑制
    if (e.type == "mousemove") { var ev = e; } else { var ev = e.changedTouches[0]; }; //スマホ用座標かを確認し、置き換え
    //mousemoveかtouchmoveかを判断し、evの内容を変える(スマホ操作の場合changedTouche[0]に座標が入るため、置き換えが必須)
    var outxy = windowoverflow( //座標の管理、画面外を抑制
        ev.clientX - x, //ズレを反映
        ev.clientY - y, //ズレを反映
        document.documentElement.clientWidth, //画面サイズ取得、横
        document.documentElement.clientHeight, //画面サイズ取得、縦
        dragitem.naturalWidth, //要素の大きさを取得、横幅
        dragitem.naturalHeight //要素の大きさを取得、縦幅
    );
    dragitem.style.left = outxy[0] + "px"; //スタイルを指定
    dragitem.style.top = outxy[1] + "px"; //スタイルを指定
    console.log(dragitem.style.left + ":" + dragitem.style.top)
};
const dragend = e => { //クリックが外されたときなどに使う関数
    console.log("クラス削除");
    var dragends = document.getElementsByClassName("drag")[0]; //オブジェクト取得
    if (dragends != undefined) dragends.classList.remove("drag"); //クラス除去
};
const plays = () => {
    var audios = document.createElement("audio");
    audios.src = playaudio;
    audios.style.display = "none";
    audios.autoplay = true;
    audios.loop = true;
};