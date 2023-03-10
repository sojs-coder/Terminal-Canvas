class PhysicsObject{
  constructor(x,y,width, height, rotation,bounce){
    this.x = x;
    this.y = y;

    
    this.corners = [[this.x,this.y],[this.x+width,this.y],[this.x+width,this.y+height],[this.x,this.y+height]];
    this.centerX = (this.x + this.width)/2;
    this.centerY = (this.y + this.height)/2;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.bounce = bounce;
  }
  rotate(deg){
    this.corners.Map(corner=>{
      var tempX = x - cx;
      var tempY = y - cy;
  
      var rotatedX = tempX*Math.cos(theta) - tempY*Math.sin(theta);
      var rotatedY = tempX*Math.sin(theta) + tempY*Math.cos(theta);
  
      x = rotatedX + cx;
      y = rotatedY + cy;
      return [x,y];
    });
    
  }
}