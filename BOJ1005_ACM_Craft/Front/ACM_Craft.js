document.querySelector(".title").innerText = "ACM Craft 실험실";

const f = document.createElement("div");
f.style.cssText = "display: flex; flex-wrap:wrap;";
document.querySelector(".frame").append(f);

const el = new Array(20);
el.fill(0);

el.forEach((e, i) => {
    e = document.createElement("div");
    e.classList = "node";
    e.innerText = i+1;
    el[i] = e;
    // e.style.left = `${i*50}px`;
    document.querySelector(".frame div").append(e);
});


document.querySelector(".input").addEventListener('click', randomNode);

function randomNode() {
    const map = new Map();
    el.forEach(e => {
        // 20, 10
        while(true) {
            var x = Math.round(Math.random()*95);
            var y = Math.round(Math.random()*45);
            console.log(x*100+y)
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
        e.style.left = `${x*10}px`;
        e.style.top = `${y*10}px`;
    })
}

// document.querySelector(".frame").innerHTML ="<div>123</div>"