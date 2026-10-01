/* Dados de demonstração. Loja fictícia da Cria Site.
   O dono troca tudo aqui ou pelo painel.
   emoji: desenho usado quando o item ainda não tem foto. */
export const LOJA = {
  nome:"Brasa Burger",
  frase:"Hambúrguer artesanal na brasa. Pão fresco, blend 160g, entrega rápida.",
  whatsapp:"5511994516869",          // WhatsApp da Cria Site nos modelos
  abre:"18:00", fecha:"23:40",
};
export const CATEGORIAS = [
  {id:"top",   nome:"Mais vendidos", emoji:"🔥"},
  {id:"combo", nome:"Combos",        emoji:"🍔"},
  {id:"art",   nome:"Artesanais",    emoji:"⭐"},
  {id:"porc",  nome:"Porções",       emoji:"🍟"},
  {id:"beb",   nome:"Bebidas",       emoji:"🥤"},
];
/* adicionais: lista de opção paga. montar: escolhas do combo. */
const ADIC_LANCHE = [
  {nome:"Bacon extra", preco:4.00},
  {nome:"Cheddar extra", preco:3.50},
  {nome:"Ovo", preco:2.50},
  {nome:"Sem cebola", preco:0},
];
export const ITENS = [
  {id:1, cat:"top",   emoji:"🍔", img:"b1.jpg", nome:"Brasa Bacon", camp:true,  desc:"Blend 160g na brasa, cheddar, bacon crocante, cebola caramelizada e maionese da casa.", pe:"320g · serve 1", preco:28.90, adic:ADIC_LANCHE},
  {id:2, cat:"top",   emoji:"🍔", img:"b2.jpg", nome:"Duplo Cheddar", desc:"Dois blends 160g, muito cheddar cremoso, picles e pão brioche.", pe:"410g · serve 1", preco:33.90, adic:ADIC_LANCHE},
  {id:3, cat:"combo", emoji:"🍟", img:"c1.jpg", nome:"Combo Casal", desc:"2 lanches à escolha, 1 batata cheddar grande e 2 refrigerantes.", pe:"serve 2", preco:69.90, montar:[
      {titulo:"Escolha o 1º lanche", de:["art","top"], qtd:1},
      {titulo:"Escolha o 2º lanche", de:["art","top"], qtd:1},
      {titulo:"Escolha os refrigerantes", de:["beb"], qtd:2},
    ]},
  {id:4, cat:"combo", emoji:"🍔", img:"c2.jpg", nome:"Combo Solo", desc:"1 lanche à escolha, batata média e bebida.", pe:"serve 1", preco:39.90, montar:[
      {titulo:"Escolha o lanche", de:["art","top"], qtd:1},
      {titulo:"Escolha a bebida", de:["beb"], qtd:1},
    ]},
  {id:5, cat:"art",   emoji:"🍔", img:"b3.jpg", nome:"Brasa Onion", desc:"Blend 160g, onion rings, barbecue, cheddar e bacon.", pe:"330g · serve 1", preco:31.90, adic:ADIC_LANCHE},
  {id:6, cat:"art",   emoji:"🍔", img:"b4.jpg", nome:"Brasa Salada", desc:"Blend 160g, alface, tomate, cebola roxa e maionese verde.", pe:"300g · serve 1", preco:27.90, adic:ADIC_LANCHE},
  {id:7, cat:"porc",  emoji:"🍟", img:"p1.jpg", nome:"Batata Cheddar e Bacon", desc:"Batata crocante coberta com cheddar e bacon.", pe:"400g · serve 2", preco:24.90},
  {id:8, cat:"porc",  emoji:"🍟", img:"p2.jpg", nome:"Fritas Simples", desc:"Batata sequinha com sal e nosso toque.", pe:"300g · serve 1", preco:16.90},
  {id:9, cat:"beb",   emoji:"🥤", img:"d1.jpg", nome:"Refrigerante Lata", desc:"Coca, Guaraná ou Fanta, 350ml.", pe:"350ml", preco:7.00},
  {id:10,cat:"beb",   emoji:"🧃", img:"d2.jpg", nome:"Suco Natural", desc:"Laranja, maracujá ou abacaxi, 500ml.", pe:"500ml", preco:11.00},
];
