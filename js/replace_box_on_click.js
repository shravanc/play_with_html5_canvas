var canvas = document.getElementById('our-canvas'),
    context = canvas.getContext('2d'),
    imagae_obj = null,
    xaxis = null,
    yaxis = null,
    data = null,
    arr_of_hash = [],
    width=4800,
    height=499,
    re_width=300,
    re_height=100;
    
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
  

  replaceBoxOnClick(event);

}

function fillData(point, i, j){
  
   var red    = point + 0;
   var blue   = point + 1;
   var green = point + 2;
   var alpha    = point + 3;
   var hashy = {};
   var replace_box_dat={};
  
   hashy["xaxis"] = j;
   hashy["yaxis"] = i ;
   replace_box_dat["red"]   = data[red];
   replace_box_dat["blue"]  = data[blue];
   replace_box_dat["green"] = data[green];
   replace_box_dat["alpha"] = data[alpha];
   hashy["data"] = replace_box_dat;
  
  arr_of_hash.push(hashy);
  
  //console.log("before",data[red]);
  data[red]   = 0;
  data[blue]  = 0;
  data[green] = 0;
  data[alpha]   = 0;
  //console.log("after",data[red]);

  return data;

}

function refillData(obj){
  var y, x, point, width=4800, data_obj;
  
  x = obj["xaxis"] - re_width;
  y = obj["yaxis"] - re_height;
  data_obj = obj["data"];
  point = (y * width) + x;
  
  //console.log(point);
  
  //console.log("before", data[point]);
  data[point] = data_obj["red"];
  data[point+1] = data_obj["blue"];
  data[point+2] = data_obj["green"];
  data[point+3] = data_obj["alpha"];
  //console.log("after", data[point]);
  return data;
}


function replaceData(){
  //console.log("data inside replaceData", data);
  for(var i=0; i< arr_of_hash.length; i++){
    data = refillData(arr_of_hash[i]);
  }
  //console.log("data inside replaceData after", data);
  return data;
  
}


function replaceBoxOnClick(event) {
    var x_axis = event.layerX*4,
        y_axis = event.layerY,
        point = 0,
        i = 0,
        j = event.layerX,
        xlimit=300,
        ylimit=100;
        
        data = image_obj.data;
        


        ylimit = ylimit + y_axis;
        xlimit = xlimit + x_axis;
        
        for(i = y_axis; i < ylimit; i += 1){
            for(j=x_axis; j < xlimit; j += 4){
                point = (i * width) + j;
                data = fillData(point,i ,j);
            }
        }

        data = replaceData();

        //console.log(arr_of_hash);
        image_obj.data = data;

        context.putImageData(image_obj, 0, 0);

}




