document.querySelector(".title").innerText = "ACM Craft 실험실";

const f = document.createElement("div");
f.style.cssText = "display: flex; flex-wrap:wrap;";
document.querySelector(".frame").append(f);

const el = new Array(20);
el.fill(0);

el.forEach(e => {
    e = document.createElement("div");
    e.classList = "node"
    document.querySelector(".frame div").append(e);
});

// document.querySelector(".frame").innerHTML ="<div>123</div>"