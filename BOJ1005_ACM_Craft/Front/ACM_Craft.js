import { output } from "./Solution.js";

document.querySelector(".title").innerText = "ACM Craft 실험실";
document.querySelector(".input").addEventListener('click', () => randomNode());

const el = new Array(20); // 노드 요소 배열
const poses = new Array(20); // 우선 순위 좌표배열
const real = new Array(20); // 좌표배열
var graphs = []; // 간선배열
el.fill(0);
poses.fill(0);

// 노드를 생성하는 함수
function randomNode() {

    // frame 초기화
    document.querySelector(".frame").innerHTML = "";

    // 좌표가 겹치지 않게 map으로 check
    const map = new Map();
    el.forEach((e, i) => {

        // 좌표마다 요소 생성
        e = document.createElement("div");
        e.classList = `node node-${i+1}`;
        e.innerText = i+1;

        e.addEventListener("mouseover", () => hover(e, i));
        e.addEventListener("mouseout", () => hoverOff(e, i));

        // map을 검사하며 랜덤 x, y 좌표 생성
        while(true) {
            var x = Math.round(Math.random()*95);
            var y = Math.round(Math.random()*45);
                
            if (
                x*y === 0 ||
                x === 95 ||
                y === 45 ||
                map.get(x*100+y) != null
            ) continue;

            // 인근 +- 8 좌표는 할당x
            for (let i=-8; i<=8; i++) {
                for (let j=-8; j<=8; j++) {
                    if(x+i < 0 || y+j < 0) continue;
                    map.set((x+i)*100+(y+j), true);
                }            
            }
            break;
        }

        // 좌표 할당
        poses[i] = [x, y, i+1];
        real[i] = [x, y, i+1];

        // 위치 할당
        e.style.left = `${x*10}px`;
        e.style.top = `${y*10}px`;
        document.querySelector(".frame").append(e);
    })

    // 0, 0 에 가까운 순으로 정렬
    poses.sort((a, b) => {
        return (a[0] + a[1]) - (b[0] + b[1])
    });

    // 간선 생성
    makeGrapgh(poses);
}

// 간선을 생성하는 함수
function makeGrapgh(poses) {
    graphs = [];
    poses.forEach((e, i) => {
        if (i === poses.length-1) return;
        var rd = Math.round(Math.random()*2);
        for(let j=0; j<=rd; j++) {
            if (i+j+1 === poses.length) break;
            graphs.push([poses[i][2], poses[i+j+1][2]]);
        }
    })

    graphs.forEach(e => {
        const ele = document.createElement("div");

        // 화살표 모양 태그
        const stick = document.createElement("div");
        const arrow01 = document.createElement("div");
        const arrow02 = document.createElement("div");

        // 간선 사이의 거리
        const dis = Math.sqrt(Math.pow(real[e[0]-1][0]-real[e[1]-1][0], 2)
                            + Math.pow(real[e[0]-1][1]-real[e[1]-1][1], 2));

        // 간선 스타일
        stick.style.cssText = "position:absolute;"
                            + `width: ${dis*10-25}px;`
                            + "height: 5px;"
                            + "background-color:rgba(0, 0, 0, 0.2);";

        arrow01.style.cssText = "position:absolute;"
                            + `width: 20px;`
                            + "height: 5px;"
                            + "top: 0px;"
                            + `left: ${dis*10-45}px;`
                            + "background-color:rgba(0, 0, 0, 0.2);"
                            + "transform-origin: right top;"
                            + "transform: rotate(30deg);";

        arrow02.style.cssText = "position:absolute;"
                            + `width: 20px;`
                            + "height: 5px;"
                            + "top: 0px;"
                            + `left: ${dis*10-45}px;`
                            + "background-color:rgba(0, 0, 0, 0.2);"
                            + "transform-origin: right top;"
                            + "transform: rotate(-30deg);";

        ele.style.cssText = "position:absolute;"
                            + "left: 25px;"
                            + "transform-origin: left top;"
                            + `transform: rotate(${Math.atan2(
                                    real[e[1]-1][1]-real[e[0]-1][1],
                                    real[e[1]-1][0]-real[e[0]-1][0],
                                )}rad);`
                            + "z-index: -1;";
        
        ele.append(stick);
        ele.append(arrow01);
        ele.append(arrow02);

        document.querySelector(`.node-${e[0]}`).append(ele);
    })
}

function hover(e, i) {
    e.className += " active";
    document.querySelectorAll(`.node-${i+1} div div`).forEach(t => {
        t.style.backgroundColor = "black";
    })
}

function hoverOff(e, i) {
    e.classList.remove("active");
    document.querySelectorAll(`.node-${i+1} div div`).forEach(t => {
        t.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    })
}

export function getNode() {
    return poses;
}

export function getGraph() {
    return graphs;
}

output();