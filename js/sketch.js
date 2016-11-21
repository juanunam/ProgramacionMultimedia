
var cnv;
var video;
var mariposa=[];
var mariposas=[];
var tiempoSlide=0;
var antesMouseX=0;
var antesMouseY=0;
var velocidadX=0;
var velocidadY=0;
var velocidad=0;
var acumulador=0;
var mitadX=0;
var mitadY=0;
var microfono;
var nivelMicrofono;
var diapositiva1_3 = "El uso de la programación para crear arte es una práctica"+
					 " que comenzó en los años sesenta. En décadas posteriores, "+
					 "grupos como el Compos 68 exploraron con éxito la programación "+
					 "con fines artísticos, presentando su obra en exposiciones "+
					 "internacionales. A partir de los años 80, los programadores "+
					 "expertos se unieron al 'Demoscene', y probaron sus habilidades "+
					 "entre sí creando 'demos': creaciones visuales altamente "+
					 "técnicamente competentes.";

var diapositiva2_3 = "La visualización de datos es una proceso "+
					 " que surgio en 1990 con el nacimiento de la web 2.0. Aun que en el siglo XVIII se "+
					 "diversifico las primeras creaciones sobre visualización de datos  "+
					 "que fueron planteadas durante los años anteriores. "+
					 "En el siglo XIX hubo un gran crecimiento con respecto a "+
					 "los gráficos estadísticos y mapas temáticos. "+
					 "En este siglo las metodologias utilizadas para representar los Datos "+
					 "a través de tablas tabulares o graficamente con cuadros y diagramas.";

function recolocaCanvas(event){
	if(cnv){
		var elemento="canvas"+event.indexh+"-"+event.indexv;
		//Cambia el canvas al contenedor que le corresponde 
		if(document.getElementById(elemento)){
			cnv.parent(elemento);
			//windowResized();
		}

		//Re-inicializa el tiempo que ha transcurrido en la actual diapositiva
		tiempoSlide=0;
	}

}
function preload(){

	
	mariposa[0]  = loadImage("./imagen/mariposa-0.png"); 
	mariposa[1]  = loadImage("./imagen/mariposa-1.png"); 
	mariposa[2]  = loadImage("./imagen/mariposa-2.png"); 
	mariposa[3]  = loadImage("./imagen/mariposa-3.png"); 
	microfono = new p5.AudioIn();
	//Reproduce un video en canvas
	video = createVideo("./videos/planeta.mp4");
	video.play();
	video.hide();
	video.pause();
}
function setup(){
	//Inicializa el canvas al 80% del tamaño de la pantalla
	cnv= createCanvas(windowWidth*0.7, windowHeight*0.8);
	mitadX=width/2;
	mitadY=height/2;
	microfono.start();
	//Direcciona el canvas a la diapositiva 0,0
	/*try{
		cnv.parent("canvas0-0");
	}catch(e){
		cnv.parent("canvas1-0");
	}*/
	
}
function draw(){
	//Obtiene el slide actual
	var state = Reveal.getState();

	if(tiempoSlide==0){
		limpiaCanvas();
		recolocaCanvas(state);

	}
	//Dibuja el canvas correspondiente a la slide actual
	dibujaSlide(state.indexh,state.indexv);
	//Transcurre una iteración en esta diapositiva
	tiempoSlide++;
	//Guarda los valores del mouse
	velocidadX	= mouseX - antesMouseX;
	velocidadY	= mouseY - antesMouseY;
	velocidad	= velocidadY/velocidadX;
	antesMouseY=mouseY;
	antesMouseX=mouseX;
}
function limpiaCanvas(){
	//Pinta el fondo 
	background("#222");

}
//Manda a llamar las funciones correspondientes a cada diapositiva
function dibujaSlide(x,y){
	if(x==0 && y==0){
		plantilla0_0();
	}
	else if(x==1 && y==0){
		plantilla1_0();
	}
	else if(x==1 && y==1){

		plantilla1_1();
	}
	else if(x==1 && y==2){

		plantilla1_2();
	}
	else if(x==2 && y==0){
		plantilla2_0();
	}
	else if(x==2 && y==1){
		plantilla2_1();
	}
	else if(x==2 && y==2){
		plantilla2_2();
	}
}
/*Definición de las funciones de pintado*/
function plantilla1_0(){
	
	if(tiempoSlide==0){
		//antesMouseY=mouseY;
		//antesMouseX=mouseX;
		acumulador=0;

	}else if(velocidadX!= 0){
		acumulador +=velocidad;
	}
	var tiempoRelativo = tiempoSlide*2;
	translate(width/2,height/2);
	rotate(acumulador);

	stroke("white");
	noFill();
	var angulo=PI/180;
	var i =  tiempoRelativo%(360);
	var x=Math.sin(angulo*i);
	var y=Math.cos(angulo*i);

	stroke(255,255,255);
	point(-100-50*x,-150-50*y);
	
	line(-100+100*x,-150+100*y,100+100*x,100+100*y);
	stroke(255,30,i*2);
	line(-100-50*x,-150-50*y,100+50*x,100+50*y);
	
	point(100+50*x,100+50*y);
	//noFill();
	

}
var recursion=0;
function plantilla0_0(){

	if(tiempoSlide == 0){
		document.body.style.background 		= "rgba(22,22,22,0.3)";
		document.body.style.backgroundColor	= "rgba(22,22,22,0.3)";

		video.loop();
		video.hide();
		console.log("1");
		recursion++;
		if(recursion>2){
			recursion=0;
			return;
		}
			window.dispatchEvent(new Event('resize'));
		recursion=0;
	}
	image(video,0,0,width,height);
}
function plantilla1_1(){

	if(tiempoSlide==0){
		var colors=["red","green","blue","yellow"];
		mariposas= new Array();
		mariposas.push({
			x: mouseX,
			y: mouseY,
			step: 0,
			tint: colors[0] 
		});
	}
	if(mouseIsPressed){
		var colors=["red","green","blue","yellow"];
		var tamano = mariposas.length;
		mariposas.push({
			x: mouseX,
			y: mouseY,
			step: 0,
			tint: colors[tamano%4] 
		});
	}
	limpiaCanvas();
	stroke("white");
	mitadX=width/2;
	mitadY=height/2;
	line(mitadX,0,mitadX,height);
	line(0,mitadY,width,mitadY);
	var angulo=(2*PI)/mariposas.length;
	var radio=200;
	for (var i = mariposas.length -1 ; i >= 0 ; i--) {
		tint(mariposas[i].tint);
		stroke(mariposas[i].tint);
		point(mitadX+200*Math.sin(angulo*i),mitadY+200*Math.cos(angulo*i));
		var imagen=mariposa[mariposas[i].step%4];
		image(imagen,imagen.width/2,0,imagen.width/2,imagen.height,mariposas[i].x - imagen.width/4 ,mariposas[i].y - imagen.height/2,imagen.width/2,imagen.height);
		//image(mariposa[mariposas[i].step%4],mariposas[i].x,mariposas[i].y);
		mariposas[i].step++;
		var aleatorio=random(20);
		if(mariposas[i].x < mitadX+radio*Math.sin(angulo*i)){
			mariposas[i].x += aleatorio;
		}else{
			mariposas[i].x -= aleatorio;
		} 
		aleatorio=random(20);
		if(mariposas[i].y < mitadY+radio*Math.cos(angulo*i)){
			mariposas[i].y += aleatorio;
		}else{
			mariposas[i].y -= aleatorio;
		}

	}
}
function plantilla1_2(){
	var indice	=	Math.floor((tiempoSlide/10));
	limpiaCanvas();
	if((velocidadX>5  || velocidadX < -5)&& mouseIsPressed){

		tiempoSlide-=velocidadX;
	}
	if(tiempoSlide<0){
		tiempoSlide=0;
	}
	if(indice>diapositiva1_3.length){
		tiempoSlide= tiempoSlide%diapositiva1_3.length;
	}
	fill("white");
	stroke("white");
	text(diapositiva1_3.substring(indice),25,25);
	textSize(18);
	textFont("Georgia");
	translate(width/2,height/2);
	rotate((PI/45)*tiempoSlide);
	stroke(0,255,194);
	nivelMicrofono	=	microfono.getLevel();
	noFill();
	dibujaPoligono(0,0,100+150*nivelMicrofono,Math.floor((tiempoSlide/100)+2));
}

function plantilla2_0(){
	
	translate(width/2,height/2);
	//rotate();
	stroke("white");
	noFill();
	arc(-100,-100,100,100,0,tiempoSlide/60);

}
function plantilla2_1(){
	
	translate(width/2,height/2);
	//rotate();
	stroke("white");
	noFill();
	arc(-100,-100,100,100,0,tiempoSlide/60);

}
function plantilla2_2(){
	
	var indice	=	Math.floor((tiempoSlide/10));
	limpiaCanvas();
	if((velocidadX>5  || velocidadX < -5)&& mouseIsPressed){

		tiempoSlide-=velocidadX;
	}
	if(tiempoSlide<0){
		tiempoSlide=0;
	}
	if(indice>diapositiva2_3.length){
		tiempoSlide= tiempoSlide%diapositiva2_3.length;
	}
	fill("white");
	stroke("white");
	text(diapositiva2_3.substring(indice),25,25);
	textSize(20);
	textFont("Georgia");
	translate(width/2,height/2);
	rotate((PI/45)*tiempoSlide);
	stroke(0,255,194);
	nivelMicrofono	=	microfono.getLevel();

}

function dibujaPoligono(x,y,radio,lados){
	var angulo = (2*PI)/lados;
	var alto1;
	var alto2;
	var ancho1;
	var ancho2;
	for (var i = 0; i < lados; i++) {
		alto1= radio*Math.cos(angulo*i);
		ancho1= radio*Math.sin(angulo*i);
		alto2= radio*Math.cos(angulo*(i+1));
		ancho2= radio*Math.sin(angulo*(i+1));
		line(x+ancho1,y+alto1,x+ancho2,y+alto2);
	}
}
/*Función que se ejecuta cuando el tamaño de la pantalla cambia(para que el canvas sea responsivo)*/
function windowResized() {

	var state = Reveal.getState();
	if(state.indexh == 0 && state.indexv == 0){
		resizeCanvas(windowWidth, windowHeight);
	}else{
		resizeCanvas(windowWidth*0.7, windowHeight*0.8);
	}
  	mitadX=width/2;
  	mitadY=height/2;
}