var canvas = document.getElementById('our-canvas'),
    context = canvas.getContext('2d');
    
window.addEventListener('DOMContentLoaded', initImageLoader);

function initImageLoader(){
  var location = "http://localhost/image.jpg";
  loadFile(location);
}

function loadFile(file){
  var image = new Image();
  
  image.onload = function(ev){
    canvas.width = ev.target.width;
    canvas.height = ev.target.height;
    
    context.drawImage(ev.target, 0, 0);
    
  };
  
  image.src = file;
  
}