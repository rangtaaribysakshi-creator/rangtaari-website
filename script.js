const WHATSAPP_NUMBER="919999999999"; // Replace with your WhatsApp number, e.g. 919876543210
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function order(product){
  const msg=`Hi Rangtaari by Sakshi! I am interested in: ${product}. Please share availability, colours and final price.`;
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  const t=document.getElementById('toast');t.classList.add('show');setTimeout(()=>{t.classList.remove('show');window.open(url,'_blank')},350);
}
