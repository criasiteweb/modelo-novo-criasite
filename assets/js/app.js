import {LOJA,CATEGORIAS,ITENS} from "./cardapio.js";
const $=(s,r=document)=>r.querySelector(s);
const reais=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const semAcento=s=>s.normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase();
const itemPorId=id=>ITENS.find(i=>i.id===id);
const itensDe=cats=>ITENS.filter(i=>cats.includes(i.cat));

/* topo */
$("[data-logo]").textContent=LOJA.nome.split(" ").map(p=>p[0]).join("").slice(0,2);
document.querySelectorAll("[data-nome]").forEach(e=>e.textContent=LOJA.nome);
$("[data-frase]").textContent=LOJA.frase;
$("[data-horario]").textContent=`Aberto agora · fecha às ${LOJA.fecha}`;

/* categorias */
const catsEl=$("[data-cats]");
CATEGORIAS.forEach((c,i)=>{
  const b=document.createElement("button");
  b.textContent=`${c.emoji} ${c.nome}`; b.dataset.cat=c.id; if(i===0)b.classList.add("on");
  b.onclick=()=>document.getElementById("sec-"+c.id)?.scrollIntoView({behavior:"smooth",block:"start"});
  catsEl.append(b);
});

/* seções */
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
          <span class="preco">${reais(it.preco)}${it.montar?'<small>a partir de</small>':""}</span>
          <span class="add" aria-hidden="true">+</span>
        </div>
      </div>
      ${it.img
        ? `<img class="card__img" src="assets/img/${it.img}" alt="${it.nome}" loading="lazy" decoding="async">`
        : `<span class="card__img card__img--ph" role="img" aria-label="${it.nome}">${it.emoji||"🍽️"}</span>`}`;
    card.onclick=()=>abrirItem(it);
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

/* ---------- JANELA DO ITEM ---------- */
const dlg=$("[data-dlg]");
let itemAtual=null, escolhasCombo=[];
function abrirItem(it){
  itemAtual=it; escolhasCombo=[];
  dlg.innerHTML=it.montar?telaCombo(it):telaItem(it);
  dlg.showModal();
  ligarDialog(it);
}
function telaItem(it){
  const adic=(it.adic||[]).map((a,i)=>`
    <label class="opc">
      <input type="checkbox" data-adic="${i}">
      <span>${a.nome}</span>
      <span class="opc-preco">${a.preco?"+ "+reais(a.preco):"grátis"}</span>
    </label>`).join("");
  return `
  ${it.img
    ? `<div class="dlg-img dlg-img--foto" style="background-image:url('assets/img/${it.img}')" role="img" aria-label="${it.nome}"></div>`
    : `<div class="dlg-img" role="img" aria-label="${it.nome}">${it.emoji||"🍽️"}</div>`}
  <button class="dlg-x" data-fechar aria-label="Fechar">✕</button>
  <div class="dlg-corpo">
    <h3>${it.nome}</h3>
    <p class="dlg-desc">${it.desc}</p>
    ${adic?`<div class="dlg-sub">Adicionais</div>${adic}`:""}
    <label class="dlg-obs">
      <span>Observação</span>
      <input type="text" data-obs placeholder="Ex.: sem picles, ponto da carne">
    </label>
  </div>
  <div class="dlg-rod">
    <div class="qtd"><button data-menos aria-label="Menos">−</button><b data-q>1</b><button data-mais aria-label="Mais">+</button></div>
    <button class="btn-add" data-confirmar>Adicionar <span data-sub>${reais(it.preco)}</span></button>
  </div>`;
}
function telaCombo(it){
  const grupos=it.montar.map((g,gi)=>{
    const ops=itensDe(g.de).map(o=>`
      <label class="opc">
        <input type="radio" name="g${gi}" data-grupo="${gi}" value="${o.id}">
        <span>${o.nome}</span><span class="opc-preco">${o.pe||""}</span>
      </label>`).join("");
    const extra=g.qtd>1?` <small>(escolha ${g.qtd})</small>`:"";
    return `<div class="dlg-sub">${g.titulo}${extra}</div><div data-grp="${gi}" data-qtd="${g.qtd}">${ops}</div>`;
  }).join("");
  return `
  ${it.img
    ? `<div class="dlg-img dlg-img--foto" style="background-image:url('assets/img/${it.img}')" role="img" aria-label="${it.nome}"></div>`
    : `<div class="dlg-img" role="img" aria-label="${it.nome}">${it.emoji||"🍽️"}</div>`}
  <button class="dlg-x" data-fechar aria-label="Fechar">✕</button>
  <div class="dlg-corpo">
    <h3>${it.nome}</h3>
    <p class="dlg-desc">${it.desc}</p>
    ${grupos}
    <label class="dlg-obs"><span>Observação</span><input type="text" data-obs placeholder="Ex.: ponto da carne"></label>
  </div>
  <div class="dlg-rod">
    <div class="qtd"><button data-menos aria-label="Menos">−</button><b data-q>1</b><button data-mais aria-label="Mais">+</button></div>
    <button class="btn-add" data-confirmar>Adicionar <span data-sub>${reais(it.preco)}</span></button>
  </div>`;
}
function ligarDialog(it){
  let q=1;
  const elQ=$("[data-q]",dlg), elSub=$("[data-sub]",dlg);
  const calc=()=>{
    let base=it.preco;
    dlg.querySelectorAll("[data-adic]:checked").forEach(c=>base+=it.adic[+c.dataset.adic].preco);
    elSub.textContent=reais(base*q);
    return base;
  };
  $("[data-fechar]",dlg).onclick=()=>dlg.close();
  $("[data-menos]",dlg).onclick=()=>{q=Math.max(1,q-1);elQ.textContent=q;calc();};
  $("[data-mais]",dlg).onclick=()=>{q++;elQ.textContent=q;calc();};
  dlg.querySelectorAll("[data-adic]").forEach(c=>c.onchange=calc);
  // combo: limitar seleção por grupo quando qtd>1 usa checkbox? aqui qtd=2 é 2 refris: deixo radio repetível via checkbox
  dlg.querySelectorAll("[data-grp]").forEach(grp=>{
    const qtd=+grp.dataset.qtd;
    if(qtd>1){ // troca radios por checkbox limitado
      grp.querySelectorAll('input[type=radio]').forEach(r=>{r.type="checkbox";});
      grp.addEventListener("change",()=>{
        const marc=grp.querySelectorAll("input:checked");
        if(marc.length>qtd) marc[0].checked=false;
      });
    }
  });
  $("[data-confirmar]",dlg).onclick=()=>{
    const base=calc();
    // validar combo
    if(it.montar){
      for(const grp of dlg.querySelectorAll("[data-grp]")){
        const qtd=+grp.dataset.qtd, marc=grp.querySelectorAll("input:checked");
        if(marc.length!==qtd){grp.scrollIntoView({block:"center"});grp.classList.add("faltou");setTimeout(()=>grp.classList.remove("faltou"),1200);return;}
      }
    }
    const adics=[...dlg.querySelectorAll("[data-adic]:checked")].map(c=>it.adic[+c.dataset.adic].nome);
    const escolhas=[...dlg.querySelectorAll("[data-grp] input:checked")].map(c=>itemPorId(+c.value).nome);
    const obs=$("[data-obs]",dlg).value.trim();
    for(let n=0;n<q;n++) carrinho.push({nome:it.nome,preco:base,adics,escolhas,obs});
    dlg.close(); renderBar();
  };
  calc();
}
dlg.addEventListener("click",e=>{ if(e.target===dlg) dlg.close(); });

/* ---------- CARRINHO ---------- */
let carrinho=[];
function renderBar(){
  const bar=$("[data-bar]");
  if(!carrinho.length){bar.classList.remove("on");return;}
  $("[data-bar-qt]").textContent=carrinho.length;
  $("[data-bar-tot]").textContent=reais(carrinho.reduce((s,i)=>s+i.preco,0));
  bar.classList.add("on");
}
$("[data-bar]").onclick=abrirCarrinho;
const cdlg=$("[data-cdlg]");
function abrirCarrinho(){
  if(!carrinho.length)return;
  const linhas=carrinho.map((it,i)=>`
    <div class="c-item">
      <div><b>${it.nome}</b> ${reais(it.preco)}
        ${it.escolhas?.length?`<div class="c-det">${it.escolhas.join(", ")}</div>`:""}
        ${it.adics?.length?`<div class="c-det">+ ${it.adics.join(", ")}</div>`:""}
        ${it.obs?`<div class="c-det">Obs: ${it.obs}</div>`:""}
      </div>
      <button data-remove="${i}" aria-label="Remover">✕</button>
    </div>`).join("");
  const tot=carrinho.reduce((s,i)=>s+i.preco,0);
  cdlg.innerHTML=`
    <button class="dlg-x" data-fechar aria-label="Fechar">✕</button>
    <div class="dlg-corpo"><h3>Seu pedido</h3>${linhas}
      <div class="c-total"><span>Total</span><b>${reais(tot)}</b></div></div>
    <div class="dlg-rod"><button class="btn-add full" data-enviar>Enviar pelo WhatsApp</button></div>`;
  $("[data-fechar]",cdlg).onclick=()=>cdlg.close();
  cdlg.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{carrinho.splice(+b.dataset.remove,1);cdlg.close();renderBar();if(carrinho.length)abrirCarrinho();});
  $("[data-enviar]",cdlg).onclick=enviarWhats;
  cdlg.showModal();
}
cdlg.addEventListener("click",e=>{if(e.target===cdlg)cdlg.close();});
function enviarWhats(){
  const linhas=carrinho.map(it=>{
    let l=`• ${it.nome} — ${reais(it.preco)}`;
    if(it.escolhas?.length) l+=`%0A   ${it.escolhas.join(", ")}`;
    if(it.adics?.length) l+=`%0A   + ${it.adics.join(", ")}`;
    if(it.obs) l+=`%0A   Obs: ${it.obs}`;
    return l;
  }).join("%0A");
  const tot=carrinho.reduce((s,i)=>s+i.preco,0);
  window.open(`https://wa.me/${LOJA.whatsapp}?text=${`Olá! Quero pedir:%0A${linhas}%0A%0ATotal: ${reais(tot)}`}`,"_blank");
}
