var jsonData;

var url = new URL(window.location.href);
var jobHistoryFile = url.searchParams.get("JobHistory");

function LoadTimeline(jsonFile) {
    var getUrl = 'MiscFiles/'+jsonFile+'.json';
    $.getJSON(getUrl, function(data) {
                selectMod = 0;
                selected = [];
                selected.length = data.length;
                for(var i = 0; i<selected.length; i++){
                    if(i==selectMod)selected[i]=1;
                    else selected[i]=0;   
                }
                jsonData = data;
                init();

              });
}

function init(){
    window.requestAnimationFrame(draw);
}

function draw() {
    var timelineVis = document.getElementById('timelineVis');
    timelineVis.width = window.innerWidth*.8;
    timelineVis.addEventListener("mousemove", doMouseMove, false);
    timelineVis.addEventListener("click", doMouseClick, false);
    var ctx = timelineVis.getContext('2d');
    //LoadTimeline(ctx, timelineVis.width, timelineVis.height);
    TimeLineDraw(ctx, timelineVis.width, timelineVis.height);
    window.requestAnimationFrame(draw);
}


function TimeLineDraw(ctx, width, height){
    var rad = width/50;
    timelineVis.height = rad*4;

    ctx.beginPath();
    ctx.moveTo(0,height/2);//(0,window.innerHeight/2);
    ctx.lineTo(width,height/2);//(window.innerWidth, window.innerHeight/2);
    ctx.stroke();
    ctx.closePath();
    
    ;
    xCircDist = (width-(width/30))/jsonData.length;
    
    ctx.strokeStyle = '#6280BF';
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(0,height/2);//(0,window.innerHeight/2);
    ctx.lineTo(width,height/2);//(window.innerWidth, window.innerHeight/2);
    ctx.closePath();
    ctx.fillStyle = '#6280BF';
    ctx.strokeStyle = '#6280BF';
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    for(var i = 0; i<jsonData.length; i++){
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = '#6280BF';
        ctx.fillText(jsonData[i]["Start Date"], (width/50)+(i*xCircDist), (height/2)-(rad));
        ctx.fill();
        ctx.restore();
        
        
        ctx.save();
        
        drawEllipseByCenter(ctx, (width/50)+(i*xCircDist) , height/2, rad, rad);
        if(selected[i]==0){
            ctx.fillStyle = '#FFFFFF';
        }
        else{
            ctx.fillStyle = '#6280BF';
           
            document.getElementById('Work ExperienceJS').innerHTML = `<h3 id="content">`+jsonData[i]["Job Title"]+ `</h3>
            `;
            document.getElementById('Work ExperienceJS').innerHTML += `<h4 id="content">`+jsonData[i]["Start Date"]+` To `+ jsonData[i]["End Date"]+`</h4>
            `;

            if(jsonData[i]["Job Description"] != null){
                if(jsonData[i]["Job Title"] == "Business Analyst II"){
                    for(var j=0; j<jsonData[i]["Job Description"].length; j++){
                        document.getElementById('Work ExperienceJS').innerHTML += `<u> ` + jsonData[i]["Job Description"][j]["SubLabel"] + `</u>
                        `;
                        
                        document.getElementById('Work ExperienceJS').innerHTML += `<ul>
                        `;
                        
                        for(var k=0; k<jsonData[i]["Job Description"][j]["SubDesc"].length; k++){  
                            document.getElementById('Work ExperienceJS').innerHTML += `<li> ` + jsonData[i]["Job Description"][j]["SubDesc"][k] + `</li>
                            `;
                        }
                        document.getElementById('Work ExperienceJS').innerHTML += `</ul></br>
                        `;
                    }
                }
                else{
                    document.getElementById('Work ExperienceJS').innerHTML += `<ul>
                    `;
                        for(var j=0; j<jsonData[i]["Job Description"].length; j++){
                            document.getElementById('Work ExperienceJS').innerHTML += `<li> ` + jsonData[i]["Job Description"][j] + `</li>
                            `;
                        }
                    document.getElementById('Work ExperienceJS').innerHTML += `</ul>
                    `;
            
                    }
            }
 
        }
           
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
}

function drawEllipseByCenter(ctx, cx, cy, w, h) {
    drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
  }
  
  function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle
  
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    //ctx.closePath(); // not used correctly, see comments (use to close off open path)
    ctx.stroke();
  }

function doMouseMove(event){
    console.log(event.clientX+", "+event.clientY);
}

function doMouseClick(event){
    selectMod++;
    for(var i = 0; i<selected.length; i++){
        if((i%selected.length)==(selectMod%selected.length)) selected[i]=1;
        else selected[i]=0;
    }
}

LoadTimeline(jobHistoryFile);