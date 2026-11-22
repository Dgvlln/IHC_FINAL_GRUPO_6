/* =====================================================
   app.js - Multiconstrucciones Río Santa S.A.C.
   Toda la lógica de la página (antes estaba dentro del index.html)
   ===================================================== */

/* ========== 1. TIENDA: catálogo, login, carrito, Yape, boleta, inventario, ventas, reportes ========== */
/* ---------- CATEGORÍAS Y SUBCATEGORÍAS ---------- */
const CO='Construcción',AG='Tanques y Agua',BA='Baños y Sanitarios',ES='Espejos y Decoración',MU='Muebles y Estantería',
      IL='Iluminación y Focos',HE='Herramientas',EL='Electricidad',PI='Pinturas',SE='Seguridad';
const TREE={
 [CO]:['🧱',['Cemento y Concreto','Fierro y Alambre','Clavos y Fijaciones','Ladrillos y Bloques','Tablas y Madera','Arena y Piedra']],
 [AG]:['💧',['Tanques Rotoplas','Tuberías PVC','Accesorios de Agua']],
 [BA]:['🚽',['Inodoros','Lavatorios','Grifería','Duchas y Tinas']],
 [ES]:['🪞',['Espejos']],
 [MU]:['🛋️',['Muebles de Baño','Estantes','Cocina y Oficina']],
 [IL]:['💡',['Focos LED','Paneles y Reflectores','Tiras LED']],
 [HE]:['🛠️',['Manuales','Eléctricas','Medición']],
 [EL]:['🔌',['Cables','Interruptores y Tomas']],
 [PI]:['🎨',['Látex y Esmaltes','Accesorios de Pintura']],
 [SE]:['🦺',['Protección Personal']]
};

/* ---------- PRODUCTOS ---------- */
const productos=[
[1,'Cemento Sol x 42.5kg',CO,0,28.5,150],
[4,'Cemento Andino Tipo I x 42.5kg',CO,0,27.8,120],
[5,'Yeso en Bolsa 20kg',CO,0,14,40],
[2,'Fierro Corrugado 1/2" Aceros Arequipa',CO,1,34,80],
[6,'Fierro Corrugado 3/8" Aceros Arequipa',CO,1,22,100],
[7,'Fierro Corrugado 5/8" Aceros Arequipa',CO,1,52,60],
[8,'Alambre Negro N°16 por kg',CO,1,6.5,200],
[9,'Alambre Galvanizado N°14 por kg',CO,1,8.5,90],
[10,'Alambre de Púas Rollo 200m',CO,1,130,15],
[11,'Clavos de 2" por kg',CO,2,5.5,300],
[12,'Clavos de 3" por kg',CO,2,5.5,250],
[15,'Clavos para Calamina por kg',CO,2,8,80],
[16,'Tornillos Drywall 1" Caja x100',CO,2,12,70],
[3,'Ladrillo King Kong 18H',CO,3,1.2,1200],
[18,'Ladrillo Pandereta',CO,3,.9,1500],
[19,'Ladrillo de Techo 15cm',CO,3,2.4,800],
[38,'Bloque de Concreto 15cm',CO,3,3.2,400],
[39,'Tabla de Construcción 2"x8"x3m',CO,4,38,60],
[40,'Tabla de Encofrado 1"x8"x3m',CO,4,22,90],
[41,'Listón de Madera 2"x2"x3m',CO,4,12,120],
[42,'Triplay Fenólico 18mm 1.22x2.44m',CO,4,165,25,180],
[43,'Parante de Eucalipto 3m',CO,4,14,100],
[44,'Arena Gruesa por m³',CO,5,65,30],
[45,'Piedra Chancada 1/2" por m³',CO,5,85,25],
[46,'Tanque Rotoplas 600L',AG,0,380,12],
[47,'Tanque Rotoplas 1100L',AG,0,560,10,610],
[48,'Tanque Rotoplas 2500L',AG,0,1150,4],
[49,'Cisterna Rotoplas 1000L',AG,0,780,6],
[50,'Tubo PVC Agua 1/2" x 5m',AG,1,12,80],
[51,'Tubo PVC Desagüe 4" x 3m',AG,1,28,60],
[52,'Codo PVC 1/2"',AG,2,1.5,300],
[53,'Llave de Paso 1/2" Bronce',AG,2,24,50],
[54,'Pegamento PVC 1/4 Galón',AG,2,32,35],
[55,'Flotador de Tanque 1/2"',AG,2,18,40],
[20,'Inodoro One Piece Trébol con Sistema Dual',BA,0,380,15],
[25,'Pack Combo Inodoro + Lavatorio + Espejo',BA,0,450,10,520],
[21,'Lavatorio de Loza con Pedestal Blanco',BA,1,125,20],
[22,'Grifería Monocomando para Lavatorio Cromo',BA,2,95,25,115],
[23,'Ducha Térmica Electric Shower 4 Temp',BA,3,140,30],
[24,'Tina de Baño Acrílica 1.40m Blanca',BA,3,650,5],
[26,'Espejo Redondo con Luz LED Touch 60cm',ES,0,180,12,210],
[27,'Espejo Rectangular con Marco de Aluminio',ES,0,150,18],
[28,'Espejo Organizador de Pared para Joyas/Baño',ES,0,220,8],
[29,'Mueble Base para Lavatorio Melamine',MU,0,290,10],
[30,'Estante Metálico Modular 5 Niveles',MU,1,165,22,190],
[31,'Gabinete Aéreo de Cocina Melamine 1.20m',MU,2,340,7],
[32,'Escritorio de Oficina Minimalista en L',MU,2,280,14],
[33,'Foco LED Ahorrador 12W Luz Blanca Philips',IL,0,9.5,150],
[34,'Foco LED Dicroico GU10 7W Luz Cálida',IL,0,12,90],
[35,'Panel LED Redondo Empotrable 18W',IL,1,28,60,35],
[36,'Reflector LED Exterior 50W IP66',IL,1,55,25],
[37,'Tira LED 5 Metros RGB con Control Remoto',IL,2,38,40],
[13,'Martillo de Carpintero Profesional',HE,0,25,18],
[14,'Juego de Llaves Mixtas x 8pz',HE,0,55,12],
[56,'Alicate Universal 8"',HE,0,22,35],
[57,'Taladro Percutor 750W',HE,1,210,9],
[58,'Amoladora 4 1/2" 850W',HE,1,185,12],
[59,'Wincha de 5 metros',HE,2,12,50],
[60,'Nivel de Burbuja 60cm',HE,2,28,25],
[62,'Cable THW 2.5mm² Rollo 100m',EL,0,210,14],
[63,'Cable Vulcanizado 2x14 por metro',EL,0,4.5,400],
[64,'Interruptor Simple Bticino',EL,1,9,80],
[65,'Tomacorriente Doble con Tierra',EL,1,14,70],
[66,'Pintura Látex Blanco 4L',PI,0,78,30],
[67,'Esmalte Sintético 1 Galón',PI,0,95,20],
[68,'Rodillo 9" con Bandeja',PI,1,18,40],
[69,'Brocha de 3"',PI,1,8,60],
[70,'Casco de Seguridad Amarillo',SE,0,18,50],
[71,'Guantes de Cuero por par',SE,0,12,80],
[72,'Lentes de Seguridad',SE,0,8,90],
[73,'Botas de Seguridad Punta de Acero',SE,0,95,20]
].map(([id,nombre,categoria,i,precio,stock,antes])=>({id,nombre,categoria,sub:TREE[categoria][1][i],precio,stock,base:stock,antes}));

/* ---------- ESTADO ---------- */
let ventas=[];
let carrito=[],user=null,cat='Todos',sub='',abierto='',q='',actual='tienda';
const $=id=>document.getElementById(id), f=n=>'S/ '+n.toFixed(2), prod=id=>productos.find(p=>p.id===id);

const esAdmin=()=>{
  if(!user) return false;
  const rolStr = String(user.rol || user || "").toLowerCase();
  const rolId = Number(user.rol_id || 0);
  return rolStr.includes('admin') || rolStr.includes('desarrollador') || rolId === 2;
};

const esPersonal=()=>!!user;

const VISTAS=['tienda','inv','ventas','rep','nos'];
const API='api/';

function escHtml(t){
  return String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function api(ruta,opciones={}){
  const r=await fetch(API+ruta,{
    credentials:'same-origin',
    ...opciones,
    headers:opciones.body?{'Content-Type':'application/json'}:{}
  });
  let d;
  try{d=await r.json()}
  catch(e){throw new Error('El servidor no respondió con JSON.')}
  if(!r.ok||d.ok===false)throw new Error(d.error||d.mensaje||'Ocurrió un error.');
  return d;
}

async function cargarProductos(){
  try{
    const d=await api('products.php');
    if(d && d.productos){
      d.productos.forEach(n=>{
        const p=prod(n.id);
        if(p){p.precio=n.precio;p.antes=n.antes;p.stock=n.stock;p.base=n.base}
        else productos.push(n);
      });
    }
  }catch(e){}
}

function nivel(p){
  if(!p)return 0;
  let s=0;
  if(p.length>=8)s++;
  if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++;
  if(/\d/.test(p))s++;
  if(/[^A-Za-z0-9]/.test(p))s++;
  return (p.length>=8&&s>=3)?3:1;
}
function medidor(v,pref){
  const n=nivel(v);
  $(pref+'-meter').className='meter'+(n?' l'+n:'');
  $(pref+'-txt').className='mtxt'+(n?' l'+n:'');
  $(pref+'-txt').textContent=!n?'Ingresa una contraseña':n===3?'✔ Contraseña segura':'⚠ Contraseña poco segura';
}
function msg(id,txt,ok){const e=$(id);e.textContent=txt;e.classList.add('show');return e}
function ocultar(...ids){ids.forEach(i=>$(i).classList.remove('show'))}

function limpiarErr(){ocultar('login-err');$('f-user').classList.remove('error');$('f-pass').classList.remove('error')}

async function entrar(u){
  user=u;
  await cargarProductos();
  const rol=String(u.rol||'').toUpperCase();
  $('who').innerHTML='👤 '+escHtml(u.nombre || u)+' <span class="tag">'+escHtml(rol)+'</span>';
  $('who').style.display='';$('btn-salir').style.display='';$('btn-ingreso').style.display='none';
  $('btn-process').style.display='';
  ['inv','ventas','rep'].forEach(x=>$('bt-'+x).style.display=esAdmin()?'flex':'none');
  $('login-screen').style.display='none';
  cerrarAnuncio();
  renderCats();vista('tienda');renderCarrito();
}

function abrirLogin(){
  limpiarErr();
  $('login-screen').style.display='flex';
  $('username').focus();
}
function cerrarLogin(){
  limpiarErr();
  $('login-screen').style.display='none';
}

async function login(e){
  e.preventDefault();limpiarErr();
  const usuario=$('username').value.trim(),password=$('password').value;
  let datos;
  try{
    datos=await api('login.php',{method:'POST',body:JSON.stringify({usuario,password})});
  }catch(err){
    $('f-pass').classList.add('error');
    msg('login-err','❌ '+err.message);
    $('password').value='';$('password').focus();
    return;
  }
  try{await entrar(datos.usuario)}
  catch(err){msg('login-err','❌ '+err.message)}
}

async function salir(){
  try{await api('login.php?salir=1')}catch(e){}
  user=null;carrito=[];
  $('who').style.display='none';$('btn-salir').style.display='none';$('btn-ingreso').style.display='';
  $('btn-process').style.display='none';
  ['inv','ventas','rep'].forEach(x=>$('bt-'+x).style.display='none');
  $('username').value='';$('password').value='';$('password').type='password';$('eye').textContent='👁️';
  limpiarErr();
  vista('tienda');renderCarrito();
}

function recuperar(e){
  e.preventDefault();ocultar('fg-err','fg-ok');
  msg('fg-err','Para recuperar tu contraseña comunícate con la administradora de la ferretería (954175106).');
}

function vista(v){
  actual=v;
  VISTAS.forEach(x=>{$('v-'+x).style.display=x===v?'block':'none';$('bt-'+x).classList.toggle('on',x===v)});
  ({tienda:renderProductos,inv:renderInv,ventas:renderVentas,rep:renderRep,nos:()=>{}})[v]();
}

function renderCats(){
  const b=(on,fn,txt,extra='',cls='')=>`<button class="${cls} ${on?'on':''}" onclick="${fn}">${txt}${extra}</button>`;
  $('cats').innerHTML=
    b(cat==='Todos',"filtrar('Todos')",'🏬 Todos los productos')+
    b(cat==='Ofertas',"filtrar('Ofertas')",'🔥 Ofertas')+
    Object.entries(TREE).map(([n,[ic,subs]])=>
      b(cat===n&&!sub,`filtrar('${n}')`,`<span>${ic}</span>${n}`,`<i>${abierto===n?'▾':'▸'}</i>`)+
      (abierto===n?subs.map(s=>b(cat===n&&sub===s,`filtrar('${n}','${s}')`,s,'','sub')).join(''):'')
    ).join('');
}
function filtrar(c,s=''){
  abierto=(abierto===c&&!s&&cat===c&&!sub)?'':(TREE[c]?c:'');
  cat=c;sub=s;
  $('titulo').textContent=c==='Todos'?'Catálogo completo':c==='Ofertas'?'🔥 Ofertas':(s||c);
  renderCats();
  actual==='inv'?renderInv():vista('tienda');
}
function buscar(v){q=v.toLowerCase();actual==='inv'?renderInv():vista('tienda')}
const filtrados=()=>productos.filter(p=>
  (cat==='Todos'||(cat==='Ofertas'?!!p.antes:(p.categoria===cat&&(!sub||p.sub===sub))))&&
  (p.nombre.toLowerCase().includes(q)||p.sub.toLowerCase().includes(q)||p.categoria.toLowerCase().includes(q)));

function renderProductos(){
  const g=$('products-grid'),l=filtrados();
  if(!l.length){g.innerHTML='<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:2rem">No se encontraron productos disponibles.</p>';return}
  g.innerHTML=l.map(p=>{
    const st=esPersonal()?`<div class="st ${p.stock<10?'bad':'ok'}">📦 Almacén: ${p.stock} un.</div>`:`<div class="st ok">${p.stock>0?'✔ Stock disponible':'<span class="bad">Agotado</span>'}</div>`;
             return `<div class="card">${p.antes?'<div class="badge">OFERTA</div>':''}
      <div class="pimg"><img src="${(window.IMG_URL&&IMG_URL[p.id])||'img/'+p.id+'.png'}" alt="${p.nombre}" loading="lazy" onerror="if(!this.dataset.t){this.dataset.t=1;this.src='img/${p.id}.jpg'}else{this.onerror=null;this.src=imgIA(${p.id})}"></div>
      <div><span class="cat">${p.categoria} › ${p.sub}</span><h4>${p.nombre}</h4>${st}

  
      <span class="price">${f(p.precio)}</span>${p.antes?`<span class="old">${f(p.antes)}</span>`:''}</div>
      <button class="btn-add" onclick="agregar(${p.id})" ${p.stock<=0?'disabled':''}>${p.stock>0?'Agregar':'Agotado'}</button></div>`;
  }).join('');
}
// llamado de imagenes |||| 598- 610
function agregar(id){
  const p=prod(id);if(!p||p.stock<=0)return;
  const it=carrito.find(i=>i.id===id);
  if(it){if(it.cantidad>=p.stock){alert('Stock máximo alcanzado.');return}it.cantidad++}
  else carrito.push({id,nombre:p.nombre,precio:p.precio,cantidad:1});
  renderCarrito();
}
function cambiar(id,d){
  const it=carrito.find(i=>i.id===id),p=prod(id);
  if(d>0&&it.cantidad>=p.stock){alert('Stock máximo alcanzado.');return}
  it.cantidad+=d;if(it.cantidad<=0)carrito=carrito.filter(i=>i.id!==id);
  renderCarrito();
}
function vaciar(){carrito=[];renderCarrito()}
const descuento=(sub,un)=>un>=10?sub*.1:un>=5?sub*.05:0;
// Los precios ya incluyen IGV (RN-02): base = total / 1.18 e IGV = total - base
const igvDe=t=>{const base=Math.round(t/1.18*100)/100;return{base,igv:Math.round((t-base)*100)/100}};

function renderCarrito(){
  let sb=0,un=0,mal=false;
  if(!carrito.length)$('cart-items').innerHTML='<li class="vacio">Tu carrito está vacío</li>';
  else $('cart-items').innerHTML=carrito.map(i=>{
    const p=prod(i.id),r=p.stock-i.cantidad;sb+=i.precio*i.cantidad;un+=i.cantidad;if(r<0)mal=true;
    const info=esPersonal()?`<small class="${r<0?'bad':r<10?'warn':'ok'}">Stock ${p.stock} → quedaría ${r}${r<0?' ⚠ insuficiente':''}</small>`:'';
    return `<li class="ci"><div>${i.nombre}${info}</div><div class="q"><button onclick="cambiar(${i.id},-1)">−</button>${i.cantidad}<button onclick="cambiar(${i.id},1)">+</button></div><b>${f(i.precio*i.cantidad)}</b></li>`;
  }).join('');
  const d=descuento(sb,un),t=sb-d;
  $('subtotal').textContent=f(sb);$('discount').textContent='- '+f(d);$('total').textContent=f(t);$('igv').textContent=f(igvDe(t).igv);$('aviso').innerHTML=!carrito.length?'':mal?'<span class="bad">⚠ Hay productos sin stock suficiente. Baja la cantidad o repón stock en Inventario.</span>':'<span class="ok">✔ Hay stock disponible para todo el pedido.</span>';
  $('btn-process').disabled=!carrito.length||mal;
  const wa=$('whatsapp-btn');wa.style.display=carrito.length?'block':'none';
  if(carrito.length){
    const msg='Hola, deseo realizar este pedido en *Multiconstrucciones Río Santa S.A.C.*:\n'+carrito.map(i=>`- ${i.nombre} (x${i.cantidad}): ${f(i.precio*i.cantidad)}`).join('\n')+`\n\n*TOTAL:* ${f(t)}`;
    wa.href='https://wa.me/51954175106?text='+encodeURIComponent(msg);
  }
  if(actual==='inv')renderInv();
}

/* ---------- COBRO: COMPROBANTE, CLIENTE Y MÉTODO DE PAGO ---------- */
const METODOS={efectivo:'Efectivo',yape:'Yape',plin:'Plin',tarjeta:'Tarjeta'};
let cobro={tipo:'boleta',metodo:'efectivo'};

function totalActual(){
  let sb=0,un=0;
  carrito.forEach(i=>{sb+=i.precio*i.cantidad;un+=i.cantidad});
  return sb-descuento(sb,un);
}
function selTipo(t){
  cobro.tipo=t;
  document.querySelectorAll('#opts-tipo .cb-opt').forEach(b=>b.classList.toggle('on',b.dataset.v===t));
  $('cli-boleta').style.display=t==='boleta'?'':'none';
  $('cli-factura').style.display=t==='factura'?'':'none';
}
function selMetodo(m){
  cobro.metodo=m;
  document.querySelectorAll('#opts-metodo .cb-opt').forEach(b=>b.classList.toggle('on',b.dataset.v===m));
  Object.keys(METODOS).forEach(x=>$('pago-'+x).style.display=x===m?'':'none');
}
function calcVuelto(){
  const raw=$('cobro-recibido').value,v=parseFloat(raw)-totalActual();
  $('cobro-vuelto').textContent=raw!==''&&v>=-0.005?f(Math.max(0,v)):'—';
}
function lineasCliente(esF,c){
  const L=[];
  if(esF){L.push('Cliente: '+c.nombre,'RUC: '+c.doc);if(c.direccion)L.push('Dirección: '+c.direccion)}
  else{if(c.nombre)L.push('Cliente: '+c.nombre);if(c.doc)L.push('DNI: '+c.doc)}
  return L;
}

function procesar(){
  if(!user){abrirLogin();return}
  if(!carrito.length)return;
  ['cli-dni','cli-nom-b','cli-ruc','cli-razon','cli-dir','cobro-recibido'].forEach(i=>$(i).value='');
  ocultar('cobro-err');
  $('cobro-total').textContent=f(totalActual());
  $('cobro-vuelto').textContent='—';
  selTipo('boleta');selMetodo('efectivo');
  abrir('cobroModal');
}

async function confirmarCobro(){
  ocultar('cobro-err');
  const total=totalActual();
  let cliente;
  if(cobro.tipo==='factura'){
    const ruc=$('cli-ruc').value.trim(),razon=$('cli-razon').value.trim();
    if(!/^(10|15|16|17|20)\d{9}$/.test(ruc)){msg('cobro-err','❌ El RUC debe tener 11 dígitos y empezar con 10, 15, 16, 17 o 20.');return}
    if(!razon){msg('cobro-err','❌ Escribe la razón social del cliente.');return}
    cliente={doc:ruc,nombre:razon,direccion:$('cli-dir').value.trim()};
  }else{
    const dni=$('cli-dni').value.trim();
    if(dni&&!/^\d{8}$/.test(dni)){msg('cobro-err','❌ El DNI debe tener 8 dígitos.');return}
    cliente={doc:dni,nombre:$('cli-nom-b').value.trim(),direccion:''};
  }
  let recibido=0;
  if(cobro.metodo==='efectivo'){
    const raw=$('cobro-recibido').value;
    if(raw!==''){
      recibido=parseFloat(raw)||0;
      if(recibido<total-0.005){msg('cobro-err','❌ El monto recibido es menor al total a pagar.');return}
    }
  }
  const tipo=cobro.tipo,metodo=cobro.metodo;
  cerrar('cobroModal');
  $('btn-process').disabled=true;
  try{
    const d=await api('order.php',{
      method:'POST',
      body:JSON.stringify({items:carrito.map(i=>({id:i.id,cantidad:i.cantidad})),tipo,metodo,cliente})
    });
    const v=d.venta,esF=v.tipo==='factura',cli=v.cliente||{};
    const conRec=v.metodo==='efectivo'&&recibido>0;
    const vuelto=Math.max(0,Math.round((recibido-Number(v.total))*100)/100);

    $('ticket-items').innerHTML=v.items.map(i=>
      `<tr><td>${i.cantidad}x ${escHtml(i.nombre)}</td><td>S/${Number(i.precio).toFixed(2)}</td><td>S/${(i.precio*i.cantidad).toFixed(2)}</td></tr>`).join('');
    $('ticket-fecha').textContent='Fecha: '+v.fecha;
    $('ticket-tipo').textContent=esF?'FACTURA ELECTRÓNICA':'BOLETA DE VENTA ELECTRÓNICA';
    $('ticket-n').textContent=v.numero;
    $('ticket-cli').innerHTML=lineasCliente(esF,cli).map(escHtml).join('<br>');
    $('t-sub').textContent=f(v.subtotal);$('t-desc').textContent='- '+f(v.descuento);$('t-tot').textContent=f(v.total);
    const ig=igvDe(Number(v.total));$('t-base').textContent=f(ig.base);$('t-igv').textContent=f(ig.igv);
    $('t-pago').textContent=METODOS[v.metodo]||v.metodo;
    $('t-rec-row').style.display=conRec?'flex':'none';
    if(conRec)$('t-rec').textContent=f(recibido)+' / '+f(vuelto);
    $('pdf-link').textContent='⬇ Descargar '+(esF?'factura':'boleta')+' en PDF';

    crearPDF({
      n:v.numero,tipo:v.tipo,fecha:v.fecha,cli:cli,metodo:v.metodo,recibido:conRec?recibido:0,
      items:v.items.map(i=>({cant:i.cantidad,nombre:i.nombre,precio:i.precio})),
      sb:v.subtotal,d:v.descuento,t:v.total
    });

    abrir('receiptModal');
    carrito=[];
  }catch(err){
    alert(err.message);
  }
  try{await cargarProductos()}catch(e){}
  renderProductos();renderCarrito();
}

const wrapTxt=(t,w)=>{const o=[];let s=String(t);while(s.length>w){let k=s.lastIndexOf(' ',w);if(k<=0)k=w;o.push(s.slice(0,k));s=s.slice(k).trimStart()}o.push(s);return o};

/* ---------- COMPROBANTE EN PDF (BOLETA O FACTURA) ---------- */
let pdfURL=null;
function crearPDF(d){
  const W=74,lat=t=>String(t).replace(/[^\x20-\xFF]/g,'?'),esc=t=>lat(t).replace(/[\\()]/g,'\\$&');
  const ctr=t=>' '.repeat(Math.max(0,Math.floor((W-t.length)/2)))+t, m=n=>'S/ '+n.toFixed(2);
  const L=[],add=(t,b)=>L.push({t,b});
  add(ctr('MULTICONSTRUCCIONES RÍO SANTA S.A.C.'),1);
  add(ctr('RUC: 20601234567'));add(ctr('Huaral, Perú'));add('');
  add(ctr(d.tipo==='factura'?'FACTURA ELECTRÓNICA':'BOLETA DE VENTA ELECTRÓNICA'),1);add(ctr(d.n),1);add(ctr('Fecha: '+d.fecha));
  lineasCliente(d.tipo==='factura',d.cli||{}).forEach(t=>wrapTxt(t,W).forEach(x=>add(x)));
  add('');
  add('Cant. / Descripción'.padEnd(52)+'P.Unit'.padStart(10)+'Importe'.padStart(12),1);
  add('-'.repeat(W));
  d.items.forEach(i=>{
    const ls=[];let cur='';
    (i.cant+'x '+i.nombre).split(' ').forEach(w=>{if((cur+' '+w).trim().length>50){ls.push(cur);cur=w}else cur=(cur+' '+w).trim()});
    ls.push(cur);
    ls.forEach((t,k)=>add(k?'   '+t:t.padEnd(52)+m(i.precio).padStart(10)+m(i.precio*i.cant).padStart(12)));
  });
  add('-'.repeat(W));
  add('Subtotal:'.padEnd(W-14)+m(d.sb).padStart(14));
  add('Descuento:'.padEnd(W-14)+('- '+m(d.d)).padStart(14));
  const ig=igvDe(d.t);
  add('Op. gravada (sin IGV):'.padEnd(W-14)+m(ig.base).padStart(14));
  add('IGV (18%):'.padEnd(W-14)+m(ig.igv).padStart(14));
  add('TOTAL A PAGAR:'.padEnd(W-14)+m(d.t).padStart(14),1);
  add('Pago: '+(METODOS[d.metodo]||d.metodo));
  if(d.recibido>0){add('Recibido:'.padEnd(W-14)+m(d.recibido).padStart(14));add('Vuelto:'.padEnd(W-14)+m(Math.max(0,d.recibido-d.t)).padStart(14))}
  add('');add(ctr('¡Gracias por su compra en Multiconstrucciones Río Santa!'));
  const PER=62,pages=[];for(let i=0;i<L.length;i+=PER)pages.push(L.slice(i,i+PER));
  const o=[];
  o[1]='<< /Type /Catalog /Pages 2 0 R >>';
  o[2]='<< /Type /Pages /Kids ['+pages.map((_,i)=>(5+2*i)+' 0 R').join(' ')+'] /Count '+pages.length+' >>';
  o[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>';
  o[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>';
  pages.forEach((pg,i)=>{
    const c='BT\n12 TL\n50 800 Td\n'+pg.map(l=>'/'+(l.b?'F2':'F1')+' 10 Tf ('+esc(l.t)+') Tj T*').join('\n')+'\nET';
    o[5+2*i]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents '+(6+2*i)+' 0 R >>';
    o[6+2*i]='<< /Length '+c.length+' >>\nstream\n'+c+'\nendstream';
  });
  let out='%PDF-1.4\n';const off=[];
  for(let i=1;i<o.length;i++){off[i]=out.length;out+=i+' 0 obj\n'+o[i]+'\nendobj\n'}
  const x=out.length;
  out+='xref\n0 '+o.length+'\n0000000000 65535 f \n'+off.slice(1).map(v=>String(v).padStart(10,'0')+' 00000 n \n').join('');
  out+='trailer\n<< /Size '+o.length+' /Root 1 0 R >>\nstartxref\n'+x+'\n%%EOF';
  const u8=new Uint8Array(out.length);for(let i=0;i<out.length;i++)u8[i]=out.charCodeAt(i)&255;
  if(pdfURL)URL.revokeObjectURL(pdfURL);
  pdfURL=URL.createObjectURL(new Blob([u8],{type:'application/pdf'}));
  const a=$('pdf-link');a.href=pdfURL;a.download=(d.tipo==='factura'?'Factura_':'Boleta_')+d.n+'.pdf';
}

function renderInv(){
  $('inv-body').innerHTML=filtrados().map(p=>{
    const c=(carrito.find(i=>i.id===p.id)||{cantidad:0}).cantidad,r=p.stock-c;
    const e=p.stock<=0?['Agotado','bad']:r<0?['Insuficiente','bad']:r<10?['Stock bajo','warn']:['OK','ok'];
    return `<tr><td>${p.nombre}</td><td>${p.sub}</td>
      <td><div class="num"><button onclick="ajustar(${p.id},-1)">−</button><input type="number" min="0" value="${p.stock}" onchange="setStock(${p.id},this.value)"><button onclick="ajustar(${p.id},1)">+</button></div></td>
      <td>${c}</td><td class="${e[1]}"><b>${r}</b></td><td><span class="pill ${e[1]}">${e[0]}</span></td></tr>`;
  }).join('')||'<tr><td colspan="6" class="vacio">No hay productos en esta selección.</td></tr>';
}
async function setStock(id,v){
  const n=Math.max(0,parseInt(v)||0);
  try{
    await api('products.php',{method:'PUT',body:JSON.stringify({id,stock:n})});
    prod(id).stock=n;
  }catch(err){alert(err.message)}
  renderCarrito();
  if(actual!=='inv')renderProductos();
}
function ajustar(id,d){setStock(id,prod(id).stock+d)}
async function resetStock(){
  if(!confirm('¿Volver al stock inicial de todos los productos?'))return;
  try{
    await api('products.php',{method:'POST',body:JSON.stringify({action:'reset'})});
    await cargarProductos();
    renderCarrito();
  }catch(err){alert(err.message)}
}

async function renderVentas(){
  const tb=$('ventas-body');
  try{
    const d=await api('sales.php');
    ventas=d.ventas;
    tb.innerHTML=ventas.length
      ?ventas.map(v=>`<tr><td>${escHtml(v.n)}</td><td>${escHtml(v.fecha)}</td><td>${escHtml(v.items)}</td><td>${escHtml(v.cliente)}</td><td>${escHtml(METODOS[v.metodo]||v.metodo)}</td><td>${escHtml(v.vendedor)}</td><td><b>${f(v.total)}</b></td></tr>`).join('')
      :'<tr><td colspan="7" class="vacio">Aún no hay ventas. Emite un comprobante desde la Tienda.</td></tr>';
  }catch(err){
    tb.innerHTML=`<tr><td colspan="7" class="vacio">${escHtml(err.message)}</td></tr>`;
  }
}
async function borrarVentas(){
  if(!confirm('¿Borrar el historial de ventas?'))return;
  try{await api('sales.php',{method:'DELETE'});renderVentas()}
  catch(err){alert(err.message)}
}

async function renderRep(){
  const cont=$('rep-body');
  try{
    const d=await api('reports.php');
    const porCat=Object.keys(TREE).map(c=>[c,d.porCat[c]||0]);
    const max=Math.max(...porCat.map(x=>x[1]));
    const maxM=Math.max(0,...Object.keys(METODOS).map(k=>((d.porMetodo||{})[k]||{t:0}).t));
    cont.innerHTML=`
      <div class="kpis">
        <div class="kpi">Ventas emitidas<b>${d.ventas}</b></div>
        <div class="kpi">Total vendido<b>${f(d.total)}</b></div>
        <div class="kpi">Valor del inventario<b>${f(d.valor)}</b></div>
        <div class="kpi">Productos con stock bajo<b class="${d.bajos.length?'bad':'ok'}">${d.bajos.length}</b></div>
      </div>
      <div class="panel"><h3>Ventas por método de pago</h3>
        ${Object.keys(METODOS).map(k=>{const x=(d.porMetodo||{})[k]||{n:0,t:0};return `<div class="brow"><span>${METODOS[k]} (${x.n})</span><div><div class="bar" style="width:${maxM?x.t/maxM*100:0}%"></div></div><b>${f(x.t)}</b></div>`}).join('')}
        <p style="margin-top:.5rem;font-size:.8rem">Boletas emitidas: <b>${(d.tipos||{}).boleta||0}</b> · Facturas emitidas: <b>${(d.tipos||{}).factura||0}</b></p></div>
      <div class="panel"><h3>Valor del inventario por categoría</h3>
        ${porCat.map(([c,v])=>`<div class="brow"><span>${escHtml(c)}</span><div><div class="bar" style="width:${max?v/max*100:0}\%"></div></div><b>${f(v)}</b></div>`).join('')}</div>
      <div class="panel"><h3>⚠ Reponer pronto (menos de 10 unidades)</h3>
        ${d.bajos.length
          ?d.bajos.map(p=>`<div class="brow" style="grid-template-columns:1fr auto"><span>${escHtml(p.nombre)}</span><b class="${p.stock<=0?'bad':'warn'}">${p.stock} un.</b></div>`).join('')
          :'<p class="ok">Todo el stock está sobre 10 unidades.</p>'}</div>`;
  }catch(err){
    cont.innerHTML=`<div class="panel"><p class="bad">${escHtml(err.message)}</p></div>`;
  }
}

function verClave(){const i=$('password');i.type=i.type==='password'?'text':'password';$('eye').textContent=i.type==='password'?'👁️':'🙈'}
function abrir(id){$(id).style.display='flex'}
function cerrar(id){$(id).style.display='none'}

cargarProductos().then(()=>{renderCats();vista('tienda');renderCarrito()});
api('login.php').then(d=>entrar(d.usuario)).catch(()=>{});

/* ========== 2. IMAGEN AUTOMÁTICA POR PRODUCTO ========== */
/* Imagen automática por producto (se usa si no existe img/ID.png o .jpg) */
function imgIA(id){
  const p=prod(id)||{}, cats=Object.keys(TREE), i=Math.max(0,cats.indexOf(p.categoria));
  const pal=[['#FFC400','#FF9F00'],['#38bdf8','#0369a1'],['#a78bfa','#6d28d9'],['#f472b6','#be185d'],
             ['#fb923c','#c2410c'],['#facc15','#a16207'],['#94a3b8','#334155'],['#34d399','#047857'],
             ['#f87171','#b91c1c'],['#fbbf24','#92400e']][i%10];
  const ico=TREE[p.categoria]?TREE[p.categoria][0]:'📦';
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${pal[0]}"/><stop offset="1" stop-color="${pal[1]}"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#g)"/>
    <circle cx="330" cy="50" r="90" fill="#fff" opacity=".12"/>
    <circle cx="60" cy="280" r="110" fill="#000" opacity=".12"/>
    <text x="200" y="175" font-size="120" text-anchor="middle">${ico}</text>
    <text x="200" y="262" font-size="22" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">${escHtml(p.sub||p.categoria||'')}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
window.IMG_URL={};

/* ========== 3. ACCESIBILIDAD (zoom, daltonismo, voz, micrófono) ========== */
let zoomGlobalActivo = false;
let modoDaltonismoActivo = false;
let modoVozGlobalActivo = false;

// 1. Zoom Global (Toda la pantalla)
function toggleZoomGeneral() {
    zoomGlobalActivo = !zoomGlobalActivo;
    document.body.classList.toggle('zoom-global-active', zoomGlobalActivo);
    const btnZoom = document.getElementById('btn-zoom-control');
    btnZoom.classList.toggle('acc-btn-active', zoomGlobalActivo);
    alert(zoomGlobalActivo ? "🔍 Zoom global activado." : "🔍 Zoom global desactivado.");
}

// 2. Modo Daltonismo (Activar / Desactivar sin perder la barra)
function toggleDaltonismo() {
    modoDaltonismoActivo = !modoDaltonismoActivo;
    document.body.classList.toggle('daltonismo-mode', modoDaltonismoActivo);
    const btnDaltonismo = document.getElementById('btn-daltonismo-control');
    btnDaltonismo.classList.toggle('acc-btn-active', modoDaltonismoActivo);

    if (modoDaltonismoActivo) {
        alert("👁️‍🗨️ Modo daltonismo activado.");
    } else {
        alert("👁️‍🗨️ Modo daltonismo desactivado (Colores normales restaurados).");
    }
}

// 3. Lectura de Voz Global (Al pasar el mouse)
function toggleModoVozGlobal() {
    modoVozGlobalActivo = !modoVozGlobalActivo;
    const btnAudio = document.getElementById('btn-audio-control');
    btnAudio.classList.toggle('acc-btn-active', modoVozGlobalActivo);

    if (modoVozGlobalActivo) {
        alert("🔊 Lector global activado. Pasa el cursor sobre cualquier texto, categoría o producto.");
    } else {
        window.speechSynthesis.cancel();
        alert("🔊 Lector global desactivado.");
    }
}

// Leer elementos en voz alta al apuntar
document.addEventListener('mouseover', (e) => {
    if (!modoVozGlobalActivo) return;
    const elemento = e.target;

    if (elemento.tagName === 'BODY' || elemento.tagName === 'HTML' || elemento.closest('#accessibility-bar')) return;

    const texto = elemento.innerText ? elemento.innerText.trim() : '';
    if (texto && texto.length < 150 && !elemento.dataset.vozLeido) {
        elemento.dataset.vozLeido = "true";
        setTimeout(() => { delete elemento.dataset.vozLeido; }, 4000);

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'es-PE';
            utterance.rate = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }
});

// 4. Inyección del Micrófono Profesional AL COSTADO de la barra de búsqueda
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const inputs = document.querySelectorAll('input[type="text"], input[type="search"], input');
        let inputBuscador = null;

        inputs.forEach(inp => {
            const ph = (inp.placeholder || '').toLowerCase();
            if (ph.includes('cemento') || ph.includes('fierro') || ph.includes('busca')) {
                inputBuscador = inp;
            }
        });

        if (!inputBuscador && inputs.length > 0) {
            inputBuscador = inputs[0];
        }

        if (inputBuscador && !document.getElementById('mic-search-btn')) {
            const contenedorInput = inputBuscador.parentElement;
            if (contenedorInput) {
                contenedorInput.style.display = 'flex';
                contenedorInput.style.alignItems = 'center';
                contenedorInput.style.gap = '12px';
                inputBuscador.style.paddingRight = '15px';

                const micBtn = document.createElement('button');
                micBtn.id = 'mic-search-btn';
                micBtn.className = 'mic-search-btn';
                micBtn.type = 'button';
                micBtn.title = 'Buscar producto por voz';
                micBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>';

                micBtn.onclick = function() {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    if (!SpeechRecognition) {
                        alert('Tu navegador no soporta búsqueda por voz. Usa Google Chrome.');
                        return;
                    }

                    const recognition = new SpeechRecognition();
                    recognition.lang = 'es-PE';
                    micBtn.classList.add('mic-listening');
                    recognition.start();

                    recognition.onresult = function(event) {
                        const textoEscuchado = event.results[0][0].transcript;
                        inputBuscador.value = textoEscuchado;
                        inputBuscador.focus();
                        inputBuscador.dispatchEvent(new Event('input', { bubbles: true }));
                        inputBuscador.dispatchEvent(new Event('keyup', { bubbles: true }));
                        micBtn.classList.remove('mic-listening');
                    };

                    recognition.onerror = function() {
                        alert('No se reconoció la voz. Inténtalo de nuevo.');
                        micBtn.classList.remove('mic-listening');
                    };

                    recognition.onend = function() {
                        micBtn.classList.remove('mic-listening');
                    };
                };
                contenedorInput.appendChild(micBtn);
            }
        }
    }, 800);
});

/* ---------- ANUNCIO EMERGENTE: aparece una vez por visita, es discreto y se puede cerrar ---------- */
let anuncioTimer=null;
function mostrarAnuncio(){
  if(user)return;
  try{if(sessionStorage.getItem('anuncioVisto'))return}catch(e){}
  $('anuncio').classList.remove('oculto');
  anuncioTimer=setTimeout(cerrarAnuncio,15000);
}
function cerrarAnuncio(){
  clearTimeout(anuncioTimer);
  $('anuncio').classList.add('oculto');
  try{sessionStorage.setItem('anuncioVisto','1')}catch(e){}
}
function verOfertas(){cerrarAnuncio();vista('tienda');filtrar('Ofertas')}
setTimeout(mostrarAnuncio,4500);


/* ========== BOOTSTRAP: tooltips de la barra de accesibilidad ========== */
document.addEventListener('DOMContentLoaded', () => {
    if (window.bootstrap) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el, { trigger: 'hover', container: 'body', placement: 'top', fallbackPlacements: ['top'] }));
    }
});
