import { getNode, getGraph } from "./ACM_Craft.js";

export function output() {
    document.querySelector(".output").addEventListener("click", () => {
        const nodes = getNode();
        const graphs = getGraph();
        if (graphs.length > 0) {
            solution(nodes, graphs);
        }else {
            alert("입력부터 해주세요.")
        }
    })
}

function solution(nodes, graphs) {
    const p = new Array(nodes.length);
    const arr = new Array(nodes.length);
    const start = nodes[0][2];
    const q = [];

    q.push(start-1);
    p.fill(0);
    arr.fill(0);
    arr.forEach((e, i) => arr[i] = new Array());
    // console.log(arr)
    // console.log(p)

    graphs.forEach(e => {
        p[e[1]-1]++;
        arr[e[0]-1].push(e[1]-1);
    })
    var t = 1;
    document.querySelector(`.node-${start}`).classList += " active";
    while(q.length > 0) {
        var curr = q.shift();
        if (arr[curr]) {
            arr[curr].forEach(e => {
                p[e]--;
                if (p[e] === 0) {
                    setTimeout(() => {
                        document.querySelector(`.node-${e+1}`).classList += " active";
                    }, t*1000);
                    t++;
                    q.push(e);
                }
            })
        }
    }
}
