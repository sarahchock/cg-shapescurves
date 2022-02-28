class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) 
    {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) 
    {
        let pt0 = new Object();
        pt0.x = Math.floor(Math.random()*this.canvas.width);
        pt0.y = Math.floor(Math.random()*(this.canvas.height-49)) + 49;
        let pt1 = new Object();
        pt1.x = Math.floor(Math.random()*(this.canvas.width-pt0.x)) + pt0.x;
        pt1.y = Math.floor(Math.random()*(this.canvas.height-pt0.y)) + pt0.y;
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);
        let col = [red,green,blue,255];
        this.drawRectangle(pt0, pt1, col, ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) 
    {
        let center = new Object();
        center.x = 300;
        center.y = 300;
        let radius = 100;
        let col = [255,0,0,255];
        this.drawCircle(center, radius, col, ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) 
    {
        let pt0 = new Object();
        let pt1 = new Object();
        let pt2 = new Object();
        let pt3 = new Object();
        pt0.x = 100;
        pt0.y = 100;
        pt1.x = 200;
        pt1.y = 550;
        pt2.x = 600;
        pt2.y = 500;
        pt3.x = 600;
        pt3.y = 200;
        let col = [255,0,0,255];
        this.drawBezierCurve(pt0,pt1,pt2,pt3,col,ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) 
    {
        
    }

    drawPoints(pts, col, ctx)
    {
        for(let i = 0; i < pts.length; i++)
            {
                this.drawCircle(pts[i], 3, col, ctx);
            }
            this.show_points = true;
    }
    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) 
    {
        let right_bottom = new Object();
        right_bottom.x = right_top.x;
        right_bottom.y = left_bottom.y;
        let left_top = new Object();
        left_top.x = left_bottom.x;
        left_top.y = right_top.y;
        this.drawLine(left_bottom,right_bottom,color,ctx);
        this.drawLine(right_bottom,right_top,color,ctx);
        this.drawLine(right_top,left_top,color,ctx);
        this.drawLine(left_top,left_bottom,color,ctx);
        let pts = [left_bottom, left_top, right_bottom, right_top];
        if(this.show_points)
        {
            this.show_points = false;
            color = [255,0,0,255];
            this.drawPoints(pts,color,ctx);
        }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) 
    {
        let deg = 0;
        let degInc = 2*Math.PI/this.num_curve_sections;
        let pt0 = new Object();
        pt0.x = center.x + Math.round(radius*Math.cos(deg));
        pt0.y = center.y + Math.round(radius*Math.sin(deg));
        let pt1 = new Object();
        let pts = new Array(this.num_curve_sections);
        for(let i = 0; i < this.num_curve_sections; i++)
        {
            let arraypt = new Object();
            arraypt.x = pt0.x;
            arraypt.y = pt0.y;
            pts[i] = arraypt;
            deg = deg + degInc;
            pt1.x = center.x + Math.round(radius*Math.cos(deg));
            pt1.y = center.y + Math.round(radius*Math.sin(deg));
            this.drawLine(pt0,pt1,color,ctx);
            pt0.x = pt1.x;
            pt0.y = pt1.y;
            
        }
        if(this.show_points)
        {
            this.show_points = false;
            this.drawPoints(pts,color,ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) 
    {
        let time = 0.0;
        let timeInc = 1.0/this.num_curve_sections;
        let start = new Object();
        let end = new Object();
        start.x = pt0.x;
        start.y = pt0.y;
        end.x = 0;
        end.y = 0;
        let pts = new Array(this.num_curve_sections + 1);
        for(let i = 0; i < this.num_curve_sections; i++)
        {
            let arraypt = new Object();
            arraypt.x = start.x;
            arraypt.y = start.y;
            pts[i] = arraypt;
            time = time + timeInc;
            end.x = Math.round((Math.pow((1-time),3)*pt0.x) + (3*Math.pow((1-time),2)*time*pt1.x) + (3*(1-time)*Math.pow(time,2)*pt2.x) + (Math.pow(time,3)*pt3.x));
            end.y = Math.round((Math.pow((1-time),3)*pt0.y) + (3*Math.pow((1-time),2)*time*pt1.y) + (3*(1-time)*Math.pow(time,2)*pt2.y) + (Math.pow(time,3)*pt3.y));
            this.drawLine(start,end,color,ctx);
            start.x = end.x;
            start.y = end.y;
        }
        pts[this.num_curve_sections] = end;
        if(this.show_points)
        {
            this.show_points = false;
            this.drawPoints(pts,color,ctx);
            this.show_points = false;
            color = [0,0,255,255];
            let controlpts = [pt1,pt2];
            this.drawPoints(controlpts,color,ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
