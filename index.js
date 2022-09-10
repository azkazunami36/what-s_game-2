function sound() { document.getElementById('memz').play(); }; //再生

var //数が多いほどランダム性が上がると思います
image1 = 280, //確率、img.png
image2 = 10, //確率、nyancat.gif
image3 = 10, //確率、miku.gif
playaudio = "nyancata.mp3"; //再生する音声ファイル
var x, y; //ドラッグ時に使用すると思われる変数

window.onload = function () {
    document.getElementById("memz").src = playaudio;
    var bodyid = document.getElementById("bodyi");
    let fors = 0;
    interval = setInterval(() => {
        if (fors > 500) clearInterval(interval);
        var bo0 = document.createElement("div");
        var bo1 = document.createElement("img");
        var sW = Math.floor(Math.random() * (document.documentElement.clientWidth - 90));
        var sH = Math.floor(Math.random() * (document.documentElement.clientHeight - 90));
        bo0.style.top = sH + "px";
        bo0.style.left = sW + "px";
        bo0.style.cursor = "move";
        bo0.style.width = "7%";
        bo0.style.position = "absolute";
        bo0.style.zIndex = "1000";
        var types = Math.floor(Math.random() * (image1 + image2 + image3));
        if (types < image1) {
            bo1.src = "img.png";
        } else if (types < (image2 + image1)) {
            bo1.src = "cat.gif";
        } else if (types < (image3 + image2 + image1)) {
            bo1.src = "miku.gif";
        };
        bo1.style.width = "100%";
        bo1.onclick = sound;
        bo0.appendChild(bo1);
        bodyid.appendChild(bo0);
        bo0.addEventListener("mousedown", mdown, false);
        bo0.addEventListener("touchstart", mdown, false);
        fors++;
    }, 50);
    document.getElementById("intro").addEventListener("ended", () => { sound(); });
};

function mdown(e) {
    var bo0 = document.createElement("audio");
    bo0.src = playaudio;
    bo0.style.display = "none";
    bo0.autoplay = true;
    bo0.loop = true;
    this.classList.add("drag");
    if (e.type === "mousedown") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    };
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;
    document.body.addEventListener("mousemove", mmove, false);
    document.body.addEventListener("touchmove", mmove, false);
};
function mmove(e) {
    document.addEventListener('touchmove', function (event) { event.preventDefault(); }, { passive: false });
    var drag = document.getElementsByClassName("drag")[0];
    if (e.type === "mousemove") {
        var event = e;
    } else {
        var event = e.changedTouches[0];
    };
    e.preventDefault();
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";
    drag.addEventListener("mouseup", mup, false);
    document.body.addEventListener("mouseleave", mup, false);
    drag.addEventListener("touchend", mup, false);
    document.body.addEventListener("touchleave", mup, false);
};
function mup(e) {
    var drag = document.getElementsByClassName("drag")[0];
    document.body.removeEventListener("mousemove", mmove, false);
    drag.removeEventListener("mouseup", mup, false);
    document.body.removeEventListener("touchmove", mmove, false);
    drag.removeEventListener("touchend", mup, false);
    drag.classList.remove("drag");
};
