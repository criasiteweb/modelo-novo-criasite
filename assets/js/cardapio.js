/* Dados de demonstração. Loja fictícia da Cria Site.
   O dono troca tudo aqui ou pelo painel. */
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
export const ITENS = [
  {id:1, cat:"top",   nome:"Brasa Bacon",      camp:true,  desc:"Blend 160g na brasa, cheddar, bacon crocante, cebola caramelizada e maionese da casa.", pe:"320g · serve 1", preco:28.90, img:"b1.jpg"},
  {id:2, cat:"top",   nome:"Duplo Cheddar",    camp:false, desc:"Dois blends 160g, muito cheddar cremoso, picles e pão brioche.", pe:"410g · serve 1", preco:33.90, img:"b2.jpg"},
  {id:3, cat:"combo", nome:"Combo Casal",      desc:"2 Brasa Bacon, 1 batata cheddar grande e 2 refrigerantes.", pe:"serve 2", preco:69.90, apartir:true, img:"c1.jpg"},
  {id:4, cat:"combo", nome:"Combo Solo",       desc:"1 Artesanal à escolha, batata média e bebida.", pe:"serve 1", preco:39.90, apartir:true, img:"c2.jpg"},
  {id:5, cat:"art",   nome:"Brasa Onion",      desc:"Blend 160g, onion rings, barbecue, cheddar e bacon.", pe:"330g · serve 1", preco:31.90, img:"b3.jpg"},
  {id:6, cat:"art",   nome:"Brasa Salada",     desc:"Blend 160g, alface, tomate, cebola roxa e maionese verde.", pe:"300g · serve 1", preco:27.90, img:"b4.jpg"},
  {id:7, cat:"porc",  nome:"Batata Cheddar e Bacon", desc:"Batata crocante coberta com cheddar e bacon.", pe:"400g · serve 2", preco:24.90, img:"p1.jpg"},
  {id:8, cat:"porc",  nome:"Fritas Simples",   desc:"Batata sequinha com sal e nosso toque.", pe:"300g · serve 1", preco:16.90, img:"p2.jpg"},
  {id:9, cat:"beb",   nome:"Refrigerante Lata", desc:"Coca, Guaraná ou Fanta, 350ml.", pe:"350ml", preco:7.00, img:"d1.jpg"},
  {id:10,cat:"beb",   nome:"Suco Natural",     desc:"Laranja, maracujá ou abacaxi, 500ml.", pe:"500ml", preco:11.00, img:"d2.jpg"},
];
