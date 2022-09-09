function sound() { document.getElementById('memz').play(); };

window.onload = function () {
    var bodyid = document.getElementById("bodyi");
    for (let i = 0; i != 462; i++) {
        var bo0 = document.createElement("div");
        var bo1 = document.createElement("img");
        bo0.className = "drag-and-drop";
        bo0.style.top = "110px";
        bo0.style.left = "110px";
        bo0.style.display = "none";
        bo0.id = "a" + i;
        var types = Math.floor(Math.random() * 300);
        if (types < 280) {
            bo1.src = "img.png";
        } else if (types < 295) {
            bo1.src = "cat.gif";
        } else {
            bo1.src = "初音ミク.gif";
        }
        bo1.style.width = "100%";
        bo1.onclick = sound;
        bo0.appendChild(bo1);
        bodyid.appendChild(bo0);
    };
    window_load();
    var elements = document.getElementsByClassName("drag-and-drop");
    var x, y;
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    };
    function mdown(e) {
        var bo0 = document.createElement("audio");
        bo0.src = "nyancata.mp3";
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
        document.removeEventListener('touchmove', handleTouchMove, { passive: false });
    };
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);
        drag.classList.remove("drag");
    };
    document.getElementById("intro").addEventListener("ended", () => {
        sound();
    });
};
async function window_load() {
    var sW, sH, s;
    sW = document.documentElement.clientWidth - 110;
    sH = document.documentElement.clientHeight - 100;
    let esW, esH;
    var elements, i = 0;
    for (i = 0; i < 461; i++) {
        elements = document.getElementById("a" + i);
        esW = Math.floor(Math.random() * sW);
        esH = Math.floor(Math.random() * sH);
        elements.style.top = esH + "px";
        elements.style.left = esW + "px";
        await wait2();
        elements.style.display = "block";
    };
};
function wait2() {
    return new Promise(resolve => { setTimeout(resolve, 50) });
};
function wait4() {
    return new Promise(resolve => { setTimeout(resolve, 3800) });
};
