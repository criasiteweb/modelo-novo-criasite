import {LOJA,CATEGORIAS,ITENS} from "./cardapio.js";
const $=(s,r=document)=>r.querySelector(s);
const reais=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const semAcento=s=>s.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase();

/* topo */
$("[data-logo]").textContent=LOJA.nome.split(" ").map(p=>p[0]).join("").slice(0,2);
$("[data-nome]").textContent=LOJA.nome;
$("[data-frase]").textContent=LOJA.frase;
$("[data-horario]").textContent=`Aberto agora · fecha às ${LOJA.fecha}`;

/* categorias */
const catsEl=$("[data-cats]");
CATEGORIAS.forEach((c,i)=>{
  const b=document.createElement("button");
  b.textContent=`${c.emoji} ${c.nome}`; b.dataset.cat=c.id; if(i===0)b.classList.add("on");
  b.onclick=()=>{document.getElementById("sec-"+c.id)?.scrollIntoView({behavior:"smooth",block:"start"});};
  catsEl.append(b);
});

/* seções e itens */
const main=$("[data-main]");
CATEGORIAS.forEach(c=>{
  const itens=ITENS.filter(i=>i.cat===c.id);
  if(!itens.length)return;
  const sec=document.createElement("section");
  sec.id="sec-"+c.id; sec.dataset.sec=c.id;
  sec.innerHTML=`<h2 class="sec-tit"><span class="emoji">${c.emoji}</span>${c.nome}</h2><div class="grade"></div>`;
  const g=sec.querySelector(".grade");
  itens.forEach(it=>{
    const card=document.createElement("button");
    card.className="card"; card.dataset.busca=semAcento(it.nome+" "+it.desc);
    card.innerHTML=`
      <div class="card__txt">
        <div class="card__nome">${it.nome}${it.camp?'<span class="tag-top">Campeão</span>':""}</div>
        <div class="card__desc">${it.desc}</div>
        <div class="card__pe">${it.pe||""}</div>
        <div class="card__rod">
          <span class="preco">${reais(it.preco)}${it.apartir?'<small>a partir de</small>':""}</span>
          <span class="add" aria-hidden="true">+</span>
        </div>
      </div>
      <span class="card__img card__img--ph" role="img" aria-label="${it.nome}">🍔</span>`;
    card.onclick=()=>addCarrinho(it);
    g.append(card);
  });
  main.append(sec);
});

/* busca */
$("[data-input]").addEventListener("input",e=>{
  const q=semAcento(e.target.value.trim());
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display=!q||c.dataset.busca.includes(q)?"":"none";
  });
});

/* categoria ativa conforme rola */
const obs=new IntersectionObserver(es=>{
  es.forEach(en=>{if(en.isIntersecting){
    const id=en.target.dataset.sec;
    document.querySelectorAll("[data-cats] button").forEach(b=>b.classList.toggle("on",b.dataset.cat===id));
  }});
},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("[data-sec]").forEach(s=>obs.observe(s));

/* carrinho */
let carrinho=[];
function addCarrinho(it){carrinho.push(it);renderBar();}
function renderBar(){
  const bar=$("[data-bar]");
  if(!carrinho.length){bar.classList.remove("on");return;}
  const tot=carrinho.reduce((s,i)=>s+i.preco,0);
  $("[data-bar-qt]").textContent=carrinho.length;
  $("[data-bar-tot]").textContent=reais(tot);
  bar.classList.add("on");
}
$("[data-bar]").onclick=()=>{
  const linhas=carrinho.map(i=>`• ${i.nome} — ${reais(i.preco)}`).join("%0A");
  const tot=carrinho.reduce((s,i)=>s+i.preco,0);
  const msg=`Olá! Quero pedir:%0A${linhas}%0A%0ATotal: ${reais(tot)}`;
  window.open(`https://wa.me/${LOJA.whatsapp}?text=${msg}`,"_blank");
};
