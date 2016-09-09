var canvas = document.getElementById('our-canvas'),
    context = canvas.getContext('2d'),
    imagae_obj = null,
    xaxis = null,
    yaxis = null;
    
window.addEventListener('DOMContentLoaded', initImageLoader);
window.addEventListener('click', click_behavior);
//window.addEventListener('mouseover', mouse_hover);

function initImageLoader(){
  var location = "http://localhost/image.jpg";
  loadFile(location);
}

function loadFile(file){
	var image = new Image();
	image.crossOrigin = 'anonymous'; 
	image.onload = function(ev){
	  ev.target.width = 1200;
	  ev.target.height = 500;
		canvas.width = ev.target.width;
		canvas.height = ev.target.height;
		
		context.drawImage(ev.target, 0, 0);
		console.log("inside loadFile");
	};
	image.src = file;
}


function click_behavior(event){
  console.log("inside click_behavior");
  var image_data=null;

  image_obj = context.getImageData (0, 0, canvas.width, canvas.height);
  

  boxOnClick(event);

}

function fillData(data, point){
    data[point] = 255;
    data[point+1] = 255;
    data[point+2] = 255;
    data[point+3] = 255;

    return data;

}

function boxOnClick(event) {
    var x_axis = event.layerX*4,
        y_axis = event.layerY,
        xlimit = 80,
        ylimit = 10,
        width = 4800,
        height = 499,
        data = image_obj.data,
        point = 0,
        i = 0,
        j = event.layerX;


        ylimit = ylimit + y_axis;
        xlimit = xlimit + x_axis;
        console.log(event);
        console.log("xaxis is", x_axis);
        console.log("yaxis is ", y_axis);
        console.log("ylimit is ", ylimit);

        for(i = y_axis; i < ylimit; i += 1){
            for(j=x_axis; j < xlimit; j += 4){
              console.log("i value is ",i);
              //console.log("j value is ", j);
                
                point = (i * width) + j;
                data = fillData(data, point);
            }
        }

        image_obj.data = data;

        context.putImageData(image_obj, 0, 0);

}