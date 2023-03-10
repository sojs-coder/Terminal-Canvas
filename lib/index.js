const colors = require('colors')
const readlineModule = require('readline');

readlineModule.emitKeypressEvents(process.stdin);
 
class TerminalContext{
  constructor(y,x){
    this.y = y;
    this.x= x;
    this.elements = [];
    this.style = colors.green;
    this.inputMonitors = {};
    this.logs = true;
    
    if (process.stdin.isTTY){
      process.stdin.setRawMode(true);
    }
    process.stdin.on('keypress', (character, key) => {
     this.monitorInput(key.name)
    }) 
    this.createElements()
    this.init();
  }
  monitorInput(d){
    if(this.inputMonitors[d]){
      this.inputMonitors[d]();
    }
  }
  createElements(){
    for(var i = 0; i <this.y; i++){
      this.elements.push([]);
      for(var j = 0; j < this.x; j++){
        this.elements[i].push({text:' ',style: colors.white});
      }
    }
  }
  init(){
    for(var i = 0; i < this.y; i++){
      for(var j = 0; j < this.x; j++){
        if(i == 0 && j !== 0){
          this.elements[i][j].text = '-';
        }else if(i==0 && j==0){
          this.elements[i][j].text= "+";
        }else if(i!== 0 && j ==0){
          this.elements[i][j].text = "|"
        }
        if(i == this.y-1 && j == 0){
          this.elements[i][j].text = '+'
        }else if(i == this.y-1){
          this.elements[i][j].text='-'
        }
        if(j == this.x-1){
          this.elements[i][j].text='|'
        }
        if(j == (this.x - 1) && i == 0){
          this.elements[i][j].text='+'
        }else if(j == (this.x - 1) && i == this.y-1){
          this.elements[i][j].text="+";
        }
        if(j == this.x-1){
          this.elements[i][j].text+='\n';
        }
      }

    }
  }
  text(x,y,text,style = colors.white){
    for(var i = 0; i < text.length; i++){
      this.elements[y][x+i].text = text[i];
      this.elements[y][x+i].style = style;
    }
  }
  rect(x,y,w,h,color = colors.white){
    for(var i = y; i <(h+y); i++){
      for(var j = x;j< (w+x); j++){
        if(this.elements[i] && this.elements[i][j]){
          if(i == y && j !== x){
            this.elements[i][j].text = '-';
            this.elements[i][j].style = color
          }else if(i==y && j==x){
            this.elements[i][j].text= "+";
            this.elements[i][j].style = color
          }else if(i!== y && j ==x){
            this.elements[i][j].text= "|";
            this.elements[i][j].style = color
          }
  
  
  
          
          if(i == h+y-1 && j == w+x){
            this.elements[i][j].text = '+';
            this.elements[i][j].style = color
          }else if(i == h+y-1){
            this.elements[i][j].text='-';
            this.elements[i][j].style = color
          }
          if(j == w+x-1){
            this.elements[i][j].text='|';
            this.elements[i][j].style = color
          }
  
  
          
          if(j == (w+x - 1) && i == y){
            this.elements[i][j].text='+';
            this.elements[i][j].style = color
          }
          if(j == (w+x - 1) && i == ((h+y)-1)){
            this.elements[i][j].text="+";
            this.elements[i][j].style = color
          }
          if(j == x && i == y+h-1){
            this.elements[i][j].text='+';
            this.elements[i][j].style = color
          }
        }else{
          if(this.logs){
            console.error('Rectangle exceeds canvas');
          }
        }
      }
    }
    return [x,y,w,h]
  }
  lineSegment(x1,y1,x2,y2){
    var slope = (y2-y1)/(x2-x1);
    var y = (x) => {
      return (slope * (x-x2))+y2 
    };
    var coords = [];
    for(var i = x1; i < x2; i++){
      coords.push([i,Math.round(y(i))]);
    }
    coords.forEach((pair)=>{
      if(this.elements[pair[0]] && this.elements[pair[0]][pair[1]]){
      this.elements[pair[0]][pair[1]].text = '•';
      }else if(this.logs){
        console.error('Line exceeds canvas')
      }
    })
  }
  circle(h,k,r,style){
    var f = (x)=>{
      var z1 = x-h;
      var z2 = z1**2;
      var z3 = -z2;
      var z4 = z3 + (r**2);
      var z5 = Math.sqrt(z4);
      var z6 = z5+k;
      return z6
    }
    var g = (x)=>{
      var z1 = x-h;
      var z2 = z1**2;
      var z3 = -z2;
      var z4 = z3 + (r**2);
      var z5 = -1*Math.sqrt(z4);
      var z6 = z5+k;
      return z6
    }
    var width = 2*r;
    var startX = h-r;
    var endX = h+r
    for(var i = startX; i <= endX;i++){
      var y1 = Math.round(f(i));
      var y2 = Math.round(g(i));
      if(this.elements[y1] && this.elements[y1][i]){
         this.elements[y1][i].text = '•'; this.elements[y1][i].style = style; 
      }else{
        if(this.logs){
          console.error('Circle too big')
        }
        
      }
      if(this.elements[y2] && this.elements[y2][i]){
         this.elements[y2][i].text = '•'; this.elements[y2][i].style =style; 
      }else{
        if(this.logs){
          console.error('Circle too big')
        }
      }
    }
  }
  checkCollision(rect1, rect2) {
    var x1 = rect1[0];
    var y1 = rect1[1];
    var w1 = rect1[2];
    var h1 = rect1[3];
    var x2 = rect2[0];
    var y2 = rect2[1];
    var w2 = rect2[2];
    var h2 = rect2[3];
    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
      return true;
    } else {
      return false;
    }
  }
  tick(){
   console.clear()
    var toDraw = ''
    this.elements.forEach((row)=>{
      row.forEach(col=>{
        toDraw+=col.style(col.text);
      })
    })
    console.log(toDraw)
    this.elements = [];
    this.createElements();
    this.init();
  }
}
module.exports['TerminalContext'] = TerminalContext;
module.exports['colors'] = colors
