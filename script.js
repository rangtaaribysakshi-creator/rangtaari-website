// RANGTAARI SETTINGS — edit only these first
const WHATSAPP_NUMBER="919999999999"; // CHANGE to your WhatsApp number
const RAZORPAY_PAYMENT_URL=""; // Paste your hosted Razorpay Payment Page/Link here

const PRODUCTS=[
{id:1,name:"Jaipur Cotton Bedsheet",cat:"Bedsheets",price:1250,note:"Pure cotton · Jaipur print"},
{id:2,name:"King Size Jaipur Bedsheet",cat:"Bedsheets",price:1450,note:"Pure cotton · 100×108"},
{id:3,name:"Double Bed Dohar",cat:"Dohars",price:1300,note:"Cotton · Jaipur print"},
{id:4,name:"Single Bed Dohar Set",cat:"Dohars",price:1600,note:"Set of 2 · cotton"},
{id:5,name:"Quilted Jaipur Tote",cat:"Bags",price:750,note:"Everyday tote · ready stock"},
{id:6,name:"Travel Pouch Set of 3",cat:"Bags",price:650,note:"Gifting favourite"},
{id:7,name:"Tote + Pouch Combo",cat:"Bags",price:1200,note:"Perfect for gifting"},
{id:8,name:"Handblock Towel",cat:"Bath",price:450,note:"Pure cotton"},
{id:9,name:"Adult Bathrobe",cat:"Bath",price:1200,note:"Handblock print · cotton"},
{id:10,name:"Kids Bathrobe",cat:"Bath",price:800,note:"Soft cotton · kids"},
{id:11,name:"Short Jaipur Kurti",cat:"Kurtis",price:500,note:"Cotton · M–XXXL"},
{id:12,name:"Long Jaipur Kurti",cat:"Kurtis",price:700,note:"Cotton · M–XXXL"},
{id:13,name:"Cushion Covers Set of 5",cat:"Gifting",price:900,note:"Jaipur prints"},
{id:14,name:"Table Runner Set · 7 Piece",cat:"Gifting",price:1050,note:"Indian table styling"},
{id:15,name:"Table Runner Set · 13 Piece",cat:"Gifting",price:1250,note:"Festive table styling"},
{id:16,name:"Bag Charm / Keychain",cat:"Gifting",price:149,note:"Little gifting add-on"}
];

const money=n=>"₹"+Number(n).toLocaleString("en-IN");
const wa=(m)=>`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;
let cart=JSON.parse(localStorage.getItem("rangtaari_cart")||"[]");

function render(filter="All"){
 const list=filter==="All"?PRODUCTS:PRODUCTS.filter(p=>p.cat===filter);
 document.getElementById("productGrid").innerHTML=list.map(p=>`
 <article class="product-card"><div class="product-photo">${p.cat}<small>YOUR PRODUCT PHOTO</small></div>
 <div class="product-info"><h3>${p.name}</h3><p>${p.note}</p><div class="price">${money(p.price)}</div>
 <div class="product-actions"><button class="small" onclick="add(${p.id})">ADD TO BAG</button><button class="small buy" onclick="buy(${p.id})">BUY NOW</button></div></div></article>`).join("");
}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();openBag()}
function buy(id){let p=PRODUCTS.find(x=>x.id===id);window.open(wa(`Hi Rangtaari by Sakshi! I want to order:\n\n${p.name}\nPrice: ${money(p.price)}\n\nPlease confirm availability and payment.`),"_blank")}
function save(){localStorage.setItem("rangtaari_cart",JSON.stringify(cart));renderBag()}
function renderBag(){
 let total=0,count=0;const box=document.getElementById("bagItems");
 if(!cart.length)box.innerHTML='<p style="color:#777;font-size:12px">Your bag is empty.</p>';
 else box.innerHTML=cart.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);total+=p.price*i.qty;count+=i.qty;return `<div class="drawer-item"><div class="thumb">R</div><div><h4>${p.name}</h4><small>${money(p.price)} × ${i.qty}</small></div><button onclick="removeItem(${p.id})">REMOVE</button></div>`}).join("");
 document.getElementById("bagTotal").textContent=money(total);document.getElementById("bagCount").textContent=count;
 const pay=document.getElementById("payLink");pay.href=RAZORPAY_PAYMENT_URL||"#";pay.onclick=e=>{if(!RAZORPAY_PAYMENT_URL){e.preventDefault();alert("Add your Razorpay hosted checkout URL in script.js first.")}};
}
function removeItem(id){cart=cart.filter(i=>i.id!==id);save()}
function openBag(){document.getElementById("drawerBg").classList.add("open")}
function closeBag(){document.getElementById("drawerBg").classList.remove("open")}

document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)});
document.querySelectorAll(".collection").forEach(c=>c.onclick=()=>render(c.dataset.cat));
document.getElementById("openBag").onclick=openBag;document.getElementById("closeBag").onclick=closeBag;
document.getElementById("drawerBg").onclick=e=>{if(e.target.id==="drawerBg")closeBag()};
document.getElementById("hamb").onclick=()=>document.getElementById("nav").classList.toggle("mobile");
document.getElementById("waMain").href=wa("Hi Rangtaari by Sakshi! I would like to explore your collection.");
document.getElementById("waFooter").href=wa("Hi Rangtaari by Sakshi! I would like to know more about your products.");
document.getElementById("waOrder").onclick=()=>{
 if(!cart.length)return alert("Your bag is empty.");
 let total=0;let lines=cart.map(i=>{let p=PRODUCTS.find(x=>x.id===i.id);total+=p.price*i.qty;return `• ${p.name} × ${i.qty} — ${money(p.price*i.qty)}`});
 window.open(wa(`Hi Rangtaari by Sakshi! I would like to order:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\n\nPlease confirm availability and share the secure payment link.`),"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();
render();renderBag();
