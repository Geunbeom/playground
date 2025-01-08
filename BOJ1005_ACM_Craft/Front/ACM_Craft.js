document.querySelector(".title").innerText = "ACM Craft 실험실";

const f = document.createElement("div");
f.style.cssText = "display: flex; flex-wrap:wrap;";
document.querySelector(".frame").append(f);

const el = new Array(20);
const poses = new Array(20); // 좌표값.
const real = new Array(20);
var graphs = []; // 간선값
el.fill(0);
poses.fill(0);

document.querySelector(".input").addEventListener('click', randomNode);

function randomNode() {
    document.querySelector(".frame div").innerHTML = "";
    const map = new Map();
    el.forEach((e, i) => {
        e = document.createElement("div");
        e.classList = `node node-${i+1}`;
        e.innerText = i+1;

        while(true) {
            var x = Math.round(Math.random()*95);
            var y = Math.round(Math.random()*45);
            if (x*y === 0) continue;
            if (map.get(x*100+y) == null) {
                for (let i=-5; i<=5; i++) {
                    for (let j=-5; j<=5; j++) {
                        if (x+i >= 0 && y+j >= 0)
                        map.set((x+i)*100+(y+j), true);
                    }            
                }
                break;
            }
        }
        poses[i] = [x, y, i+1];
        real[i] = [x, y, i+1];
        e.style.left = `${x*10}px`;
        e.style.top = `${y*10}px`;
        document.querySelector(".frame div").append(e);
    })

    // 0, 0 에 가까운 순으로 정렬
    poses.sort((a, b) => {
        return (a[0] + a[1]) - (b[0] + b[1])
    });
    makeGrapgh(poses);
}

function makeGrapgh(poses) {
    graphs = [];
    poses.forEach((e, i) => {
        if (i === poses.length-1) return;
        var rd = Math.round(Math.random()*3);
        for(let j=0; j<=rd; j++) {
            if (i+j+1 === poses.length) break;
            graphs.push([poses[i][2], poses[i+j+1][2]]);
        }
    })

    graphs.forEach(e => {
        const ele = document.createElement("div");
        const dis = Math.sqrt(Math.pow(real[e[0]-1][0]-real[e[1]-1][0], 2)
                            + Math.pow(real[e[0]-1][1]-real[e[1]-1][1], 2));

        ele.style.cssText = "position:absolute;"
                            + `width: ${dis*10}px;`
                            + "height: 3px;"
                            + "background-color:rgba(0, 0, 0, 0.5);"
                            + "left: 25px;"
                            + "transform-origin: left top;"
                            + `transform: rotate(${Math.atan2(
                                real[e[1]-1][1]-real[e[0]-1][1],
                                real[e[1]-1][0]-real[e[0]-1][0],
                            )}rad);`
        document.querySelector(`.node-${e[0]}`).append(ele);

    })

    console.log(graphs);
}