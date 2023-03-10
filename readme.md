# Terminal Canvas

Created with love to make better terminal games.
See ![on replit](https://replit.com/@sojs/Terminal-Canvas) and fork to use template on replit.
Otherwise just download `/lib`.

## Usage

1. Import into your scripts

```js
const { colors, TerminalContext } = require("/lib/index.js");
```

2. Initialize your canvas

```js

/*@param x - width of the canvas
* @param y - height of the canvas
*/
let ctx = new TerminalContext(x,y);
ctx.style = colors.white
```
**you can use any color/style supported by [colors.js](https://www.npmjs.com/package/colors)**

## Drawing on the Canvas

#### Write Text
```js
ctx.text(x,y,text,style)
```
- x: the x-coordinate of the text
- y: the y-coordinate of the text
- text: a string containing the text content.
*note: if the text overflows some bugs may happens, so make sure to put appropriate x coordinates and canvas widths. (every character in the text takes up a single X coordinate)
- style: defualt white | any color supported by [colors.js](https://www.npmjs.com/package/colors)

#### Rectangle
```js
ctx.rect(x,y,w,h,color)
```
- x: the x-coordinate of the rect
- y: the y-coordinate of the rect
- w: the width of the rect
- h: the height of the rect
- color: defualt white, color of the rectangle (fill is not supported.. if this project gets enough use I may add it)

**returns an array of `[x,y,width,height]`,**
**useful for checking collisions**

#### Lines
```js
ctx.lineSegment(x1,y1,x2,y2)
```
- (x1,y1): starting point
- (x2,y2): ending point

#### Circle

```js
ctx.circle(h,k,r,style)
```
- (h,k): center point of circle
- r: radius of circle
- style: defualt white, fill is not supported (see above)

#### Collision checking

```js
ctx.checkCollision(rect1,rect2)
```
- rect1- an array specifiying the collision box, formatted `[x,y,width,height]`
- rect2- another array specifiying a collision box

**returns true if the boxes are colliding, false if they are not**

### Rendering Drawn Objects

All of the above methods only load things to be drawn into a *render queue*. This queue is only rendered onto the screen after calling the `ctx.tick()` method.

## Misc

See ![on replit](https://replit.com/@sojs/Terminal-Canvas) and fork to use template, or download the `/lib` folder to use.

Physics.js is currently empty.. I started working on it a while back, but the project did not get nearly the attention I would have liked, and discontinued the physics system. If you submit a PR I'll probably merge it.

![Contact me](https://sojs-space.sojs.repl.co) if you want something programmed, have any questions, comments, or suggestions.