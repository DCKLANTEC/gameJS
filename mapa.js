//Clases
class Punto{
	constructor(color,px,py,ancho,alto,estado,contenedor){
		this.color=color;
		this.px=px;
		this.py=py;
		this.ancho=ancho;
		this.alto=alto;
		this.estado=estado;
		this.contenedor=contenedor;
	}
	getColor(){
		return this.color;
	}
	setColor(color){
		this.color=color;
	}
	getPx(){
		return this.px;
	}
	setPx(px){
		this.px=px;
	}
	getPy(){
		return this.py;
	}
	setPy(py){
		this.py=py;
	}
	getAncho(){
		return this.ancho;
	}
	setAncho(ancho){
		this.ancho=ancho;
	}
	getAlto(){
		return this.alto;
	}
	setAlto(alto){
		this.alto=alto;
	}
	getEstado(){
		return this.estado;
	}
	setEstado(estado){
		this.estado=estado;
	}

	getContenedor(){
		return this.contenedor;
	}
	setContenedor(contenedor){
		this.contenedor=contenedor;
	}	
}

class Carta{
	constructor(color,px,py,ancho,alto,lugar){
		this.color=color;
		this.px=px;
		this.py=py;
		this.ancho=ancho;
		this.alto=alto;
		this.lugar=lugar;
	}
	getColor(){
		return this.color;
	}	
	setColor(color){
		this.color=color;
	}
	getPx(){
		return this.px;
	}
	setPx(px){
		this.px=px;
	}
	getPy(){
		return this.py;
	}
	setPy(py){
		this.py=py;
	}
	getAncho(){
		return this.ancho;
	}
	setAncho(ancho){
		this.ancho=ancho;
	}
	getAlto(){
		return this.alto;
	}
	setAlto(alto){
		this.alto=alto;
	}
	getLugar(){
		return this.lugar;
	}
	setLugar(lugar){
		this.lugar=lugar;
	}		
}
//Variables globales
var canvas,puntos,cartas,cartaActual,cartaAnterior,lienzo,noEncontrado=true,cubitos=0,evento='VICTORIA';
var mx=0,my=0,cartXant,cartYant,puntoAnterior;

window.onload=iniciar;

function cargarPuntos(){
	puntos = new Array();
	for(y=0;y<10;y++){
		for(x=0;x<10;x++){
			var px=x*50;
			var py=y*50;
			var estadoAuxiliar;

			//Verficamos si estamos en el ultimo nivel que al vez el primero en el mapa
			if(y==9)
				estadoAuxiliar=true;
			else if(y<9)
				estadoAuxiliar=false;

			if(y%2==0){
				if(x%2==0)
				puntos.push(new Punto('#E6E6E6',px,py,50,50,estadoAuxiliar,false));
				else
					puntos.push(new Punto('#fff',px,py,50,50,estadoAuxiliar,false));
			}
			else
			{
				if(x%2!=0)
				puntos.push(new Punto('#E6E6E6',px,py,50,50,estadoAuxiliar,false));
				else
					puntos.push(new Punto('#fff',px,py,50,50,estadoAuxiliar,false));			
			}
		}
	}
}


function cargarCartas(){
	cartas = new Array();
	for(y=0;y<1;y++){
		for(x=0;x<10;x++){
			var px=x*50;
			var py=y*50;
			if(x%2==0)
				cartas.push(new Carta('#7B181E',px+550,py,50,50,true));
			else
				cartas.push(new Carta('#4080FF',px+550,py,50,50,true));
		}
	}	
}

function final(){
	lienzo.font='bold 50px verdana';
	lienzo.fillStyle='#fff';
	lienzo.textAlign='center';
	lienzo.fillText(evento,250,250);
	evento='GOOO';
}

function inicio(){
	window.setTimeout(iniciar,1500);
	actualizar();
	lienzo.font='bold 50px verdana';
	lienzo.fillStyle='red';
	lienzo.textAlign='center';
	lienzo.fillText(evento,250,250);
	
}

function actualizar(){
	//Limpieza de pantalla
	lienzo.fillStyle = "#002240";
	lienzo.fillRect(0,0,1300,620);

	//Dibujando mapa
	for(iterador=0;iterador<puntos.length;iterador++){
		lienzo.fillStyle=puntos[iterador].getColor();
		if(puntos[iterador].getEstado())
		{
			
		}
		lienzo.fillRect(puntos[iterador].getPx(),puntos[iterador].getPy(),puntos[iterador].getAncho(),puntos[iterador].getAlto());
	}

	lienzo.font='normal 14px verdana';
	lienzo.textAlign='start';
	lienzo.fillStyle='#fff';
	lienzo.fillText('Cuadros: '+cubitos,10,615);

	//Fondo de musica
	var musica='Musica: Itro x Valcos - Starbound';
	lienzo.fillRect(705,595,musica.length*9,25);
	lienzo.fillStyle='rgba(221, 84, 82,1)';
	lienzo.font='bold 14px verdana';
	lienzo.fillText(musica,720,615);
	lienzo.fillStyle='#fff';
	lienzo.font='normal 14px verdana';

	if(cartaActual!=null){
		lienzo.fillText('Carta Elegida X: '+cartaActual.getPx(),100,615);
		lienzo.fillText('Carta Elegida Y: '+cartaActual.getPy(),280,615);
		lienzo.fillText('x anterior: '+cartXant,450,615);
		lienzo.fillText('y anterior: '+cartYant,600,615);
	}

	if(cubitos==100 && evento=='VICTORIA'){
		window.setTimeout(inicio,1000);
		final();
	}

	//Dibujando cartas
	for(icart=0;icart<cartas.length;icart++){
		lienzo.fillStyle=cartas[icart].getColor();
		lienzo.fillRect(cartas[icart].getPx(),cartas[icart].getPy(),cartas[icart].getAncho(),cartas[icart].getAlto());			
	}	
}

function desbloquearNivelProximo(){
	console.log('hola');
	var px=cartaActual.getPx();
	var py=cartaActual.getPy();

	var puntoProximoX=px;
	var puntoProximoY=((py/50)-1)*50;

	for(var i=0;i<puntos.length;i++){
		if(puntos[i].getPx()==puntoProximoX && puntos[i].getPy()==puntoProximoY){
			puntos[i].setEstado(true);
		}
	}

}

function iniciar(){
	cubitos=0;
	cartaActual=null;
	cartaAnterior=null;
	evento='VICTORIA';


	audioPressCubo=document.getElementById('press_cubo');
	audioPressCarta=document.getElementById('press_carta');
	audioCartaDevolver=document.getElementById('carta_devolver');
	audioMusicFondo=document.getElementById('music_fondo');

	audioMusicFondo.volume=0.059;
	audioMusicFondo.load();
	audioMusicFondo.autoplay=true;

	cargarPuntos();
	cargarCartas();

	canvas=document.getElementById('lienzo');	
	lienzo=canvas.getContext('2d');

	actualizar();

	/*canvas.onclick = function(event){
		for(var i=0;i<puntos.length;i++){
			if(puntos[i].getPx()<=event.clientX-8 && (puntos[i].getPx()+puntos[i].getAncho()>=event.clientX-8)
				&& puntos[i].getPy()<=event.clientY-8 && (puntos[i].getPy()+puntos[i].getAlto()>=event.clientY-8)
				&& !puntos[i].getEstado()){
				puntos[i].setColor('#DD5452');
				puntos[i].setEstado(true);
				audioPressCubo.load();
				audioPressCubo.play();
				console.log('coger');
				cubitos++;
				actualizar();
			}
		}
	}*/

	canvas.onmousedown = function(event){
		for(var i=0;i<cartas.length;i++){
			if(cartas[i].getPx()<=event.clientX-8 && (cartas[i].getPx()+cartas[i].getAncho()>=event.clientX-8)
				&& cartas[i].getPy()<=event.clientY-8 && (cartas[i].getPy()+cartas[i].getAlto()>=event.clientY-8)){
				//CambiarEstilos del puntero
				document.getElementById('lienzo').style.cursor='pointer';
				//_-----------------------
				audioPressCarta.load();
				audioPressCarta.play();

				console.log('carta escogida');
				cartaActual=cartas[i];

				mx=(event.clientX-8)-cartas[i].getPx();
				my=(event.clientY-8)-cartas[i].getPy();

				//Seleccion la carta para resturarla
				cartXant=cartas[i].getPx();
				cartYant=cartas[i].getPy();
			}
		}

		var centerXCartaActual=cartaActual.getPx()+(cartaActual.getAncho()/2);
		var centerYcartaActual=cartaActual.getPy()+(cartaActual.getAlto()/2);

		for(var i=0;i<puntos.length;i++){
			if(puntos[i].getPx()==cartXant && puntos[i].getPy()==cartYant){//Signfica que habia estado en un punto
					puntoAnterior=i;
					puntos[i].setEstado(true);
					puntos[i].setContenedor(false);		
					console.log('vacio');
			}
		}

	}

	canvas.onmousemove=function(event){
		if(cartaActual!=null)
		{
			var centerXCartaActual=cartaActual.getPx()+(cartaActual.getAncho()/2);
			var centerYcartaActual=cartaActual.getPy()+(cartaActual.getAlto()/2);

			if(cartaActual!=null){
				cartaActual.setColor('#DD5452');
				cartaActual.setLugar(false);
				cartaActual.setPx((event.clientX-8)-mx);
				cartaActual.setPy((event.clientY-8)-my);
				actualizar();
			}
		}

	}

	canvas.onmouseup=function(event){
		if(cartaActual!=null){

			//CambiarEstilos del puntero
				document.getElementById('lienzo').style.cursor='default';
			//_-----------------------
			var centerXCartaActual=cartaActual.getPx()+(cartaActual.getAncho()/2);
			var centerYcartaActual=cartaActual.getPy()+(cartaActual.getAlto()/2);
			
			for(var i=0;i<puntos.length;i++){
				if(puntos[i].getPx()<=centerXCartaActual && (puntos[i].getPx()+puntos[i].getAncho())>=centerXCartaActual
					&& puntos[i].getPy()<=centerYcartaActual && (puntos[i].getPy()+puntos[i].getAlto())>=centerYcartaActual)//Encontro el punto
				{
					//Verifico si hay una carta ahi
					var contenedorPuntoFiltrado=false;

					for(var j=0;j<cartas.length;j++){
							if( (cartas[j].getPx()==puntos[i].getPx() && cartas[j].getPy()==puntos[i].getPy()) || !puntos[i].getEstado()){
								cartaActual.setPx(cartXant);
								cartaActual.setPy(cartYant);

								if((cartas[j].getPx()==puntos[i].getPx() && cartas[j].getPy()==puntos[i].getPy()) ){
									puntos[puntoAnterior].setEstado(false);
									puntos[puntoAnterior].setEstado(true);	
									
								}
								
								contenedorPuntoFiltrado=true;
								audioCartaDevolver.load();
								audioCartaDevolver.play();
								actualizar();								
							}					
					}
					if(!contenedorPuntoFiltrado && puntos[i].getEstado()){
								cartaActual.setPx(puntos[i].getPx());
								cartaActual.setPy(puntos[i].getPy());
								cartaActual.setLugar(true);
								puntos[i].setEstado(false);
								puntos[i].setContenedor(true);
								audioPressCubo.load();
								audioPressCubo.play();				
								console.log('lleno');
								cubitos++;
								desbloquearNivelProximo();
								actualizar();
								contenedorPuntoFiltrado=true;

								
					}
				}
			}
		}
		cartaActual=null;
	}

}
