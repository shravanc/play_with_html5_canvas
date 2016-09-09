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
//		image_obj = context.getImageData(0, 0, ev.target.width, ev.target.height);

//    imageFromCanvas();
	};
	image.src = file;
}


function click_behavior(event){
  console.log("inside click_behavior");
  var image_data=null;
  //console.log(event.screenX);
  //console.log(event.screenY);
  image_obj = context.getImageData (0, 0, canvas.width, canvas.height);
  
  modifyImage();
  //splash_pixel(event);
  //insideCircle(event);
  //imageFromCanvas(event);
  //clickMeNot(event);
  
//  context.putImageData(image_data, event.screenX, event.screenY);
 // console.log("finished");
}


function modifyImage(){
  var data = image_obj.data;
  for (var i=0; i < data.length; i+=4){
   data[i+2] = 0;
   //data[i+1] = 255;
   //data[i+2] = 255;
   data[i+3] = 255;
  }
  image_obj.data = data;
  context.putImageData(image_obj, 0, 0 );
}

function splash_pixel(event){
  var data = image_obj.data;
  xaxis = event.screenX;
  yaxis = event.screenY;
  //console.log(event);
  console.log(data.length/4);
  for(var i=0; i<=1000000; i+=4){
   data[xaxis+i] = 255;
   data[xaxis+1+i] = 0;
   data[xaxis+2+i] = 0;
   data[xaxis+3+i] = 255;
   
  }
  
  for(i=0; i<=1000000; i+=4){
   data[yaxis+i] = 0;
   data[yaxis+1+i] = 0;
   data[yaxis+2+i] = 255;
   data[yaxis+3+i] = 255;
  }
  //var x_1 = null, x_2 = null;
  //var y_1 = null, y_2 = null;
    image_obj.data = data;
  context.putImageData(image_obj, 0, 0 );
  
  //for (var i=0; i< data.length; i+=4){
    
  //}
  
}

function insideCircle(event){
  var radius = 100000;
  var data = image_obj.data;
  xaxis = event.layerX;
  yaxis = event.layerY;
  var x_diff = null, y_diff = null, squared_rad=null, squared_sum=null;
  
  console.log("inside insideCircle");
  console.log(context);
  for (var i=0; i<data.length; i+=4){
    xdiff = (xaxis - i) * (xaxis - i);
    ydiff = (yaxis - i) * (yaxis - i);
    
    if (i == xaxis){
      console.log("xaxis match");
    }
    squared_sum = xdiff + ydiff;
    squared_rad = radius * radius;
    
    if (squared_sum <= squared_rad){
      data[i] = 0;
      data[i+1] = 0;
      data[i+2] = 0;
      data[i+3] = 255;
    }
  }
  
  image_obj.data = data;
  //context.putImageData(image_obj, 0, 0);
  //context.fillText("clicked here", event.layerX, event.layerY);
  //context.fillRect(xaxis, yaxis, 10, 10);
  context.fillRect(0, 10, 10, 10);

  
}

function imageFromCanvas(event){
  var data = image_obj.data;
  var x_axis = event.layerX;
  var y_axis = event.layerY;
  var width = 4800;
  var height = 499;
  var pixel_width = 10;
  var pixel_height = 10;
  
  var point = null;
  var x_len = y_axis+(pixel_width*4);
  var y_len = x_axis+(pixel_height*4);


  console.log("xaxis value is ",x_axis );
  console.log("yaxis value is ",y_axis );
  
  console.log("x_len value is ",x_len );
  console.log("y_len value is ",y_len );


  var index = 0;
  for(var i=y_axis; i<=y_len; i+=4){
    for(var j=x_axis;j<=x_len; j+=4){
      //if (index > 10){
      //  break;
      //}
      point = (i*width) + j;
      console.log("i value is",i);
      console.log("j value is",j);
      console.log(point);
      data[point] = 255;
      data[point+1] = 255;
      data[point+2] = 255;
      data[point+3] = 255;
      index += 1;
    }
  }



  image_obj.data = data;
  context.putImageData(image_obj, 0, 0);

  console.log("inside imageFromCanvas");
  console.log(event);
}


function mouse_hover(event){
  xaxis = event.layerX;
  yaxis = event.layerY;
  
  
  
  context.fillRect(xaxis, yaxis, 10, 10);
  
}

function clickMeNot(event){
    var x_axis = event.layerX,
        y_axis = event.layerY,
        limit = 400,
        width = 4800,
        height = 499,
        data = image_obj.data,
        point = 0;
  
//        y_axis = 50;

        limit = limit + x_axis;
  console.log("xaxis value is ",x_axis );
  console.log("yaxis value is ",y_axis );

/*
        point = 400+(4800*400);

        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
        
        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
        
        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
        
        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
        
        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
*/

///*
  
    for(var i=x_axis; i<= limit; i+=4){
      console.log("i value is ",i);
        point = (y_axis * width) + i;

        data[point] = 255;
        data[point+1] = 255;
        data[point+2] = 255;
        data[point+3] = 255;
    }
//*/
    image_obj.data = data;
    context.putImageData(image_obj,0,0);

}





