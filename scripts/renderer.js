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
        /* if(this.show_points)
        {
            let col = [255,0,0,255];
            this.drawPoints(this.pts, col, ctx);
        } */
    }

    // ctx:          canvas context
    drawSlide2(ctx) 
    {

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
        //this.pts = [left_bottom, right_top];
        /* if(this.show_points)
        {
            this.drawPoints(this.pts,color,ctx);
        } */
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
        var pts = new Array(this.num_curve_sections);
        //pts.length = this.num_curve_sections;
        for(let i = 0; i < this.num_curve_sections; i++)
        {
            pts[i] = pt0;
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
