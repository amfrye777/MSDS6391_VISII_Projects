
    var data = `[{
        "Person": "Alexandra Fisher",
        "Job Title": "Sales Representative",
        "Start Date": "September 2017",
        "End Date": "Present",
        "Job Description":  [
                              "Saas software sales specialist at Lighthouse 360 a Yodle/Web.com company."
                            ]
      },
      {
        "Person": "Alexandra Fisher",
        "Job Title": "Marketing Manager",
        "Start Date": "June 2016",
        "End Date": "August 2017",
        "Job Description":  [
                              "As Marketing Manager at ChemicalInfo, top priorities are analyzing strengths and weaknesses of all products and building meaningful marketing content from product data, customer feedback, and user experience data. Contribute to the team effort by supporting the Vice President of marketing and assisting new sales team in all out-bound marketing initiatives. Manage, measure, and analyze marketing operations and performance in order to create updated marketing and sales materials and content for each product."
                            ]
      },
      {
        "Person": "Alexandra Fisher",
        "Job Title": "Product Marketing Specialist",
        "Start Date": "December 2015",
        "End Date": "May 2016",
        "Job Description":  [
                              "As Product Marketing Specialist at ChemicalInfo, worked with sales and marketing teams and focused specifically on the development of the PathFinder database—a SaaS based product developed as a sales and marketing lead generation tool for global users in the chemical and pharmaceutical industries. Supported the Director of Marketing in trade show preparation, leveraging SalesForce for sales pattern analysis, email marketing campaigns, and ad hoc market research projects. Analyzed customer satisfaction survey feedback and trends, as well as user experience data, to generate customer needs analysis for the PathFinder product."
                            ]
      },
      {
        "Person": "Alexandra Fisher",
        "Job Title": "Operations Administrator, Logistics Coordinator",
        "Start Date": "June 2012",
        "End Date": "June 2015",
        "Job Description":  [
                              "As the Operations Administrator, functioned as Operations Head, Office Manager, Human Resources and Payroll Administrator to staff of 10 office employees and 8-12 independent contractors. Maintained highest levels of service quality and client/patient satisfaction by planning, organizing and executing activities to maximize organization profits, employee performance and operations efficiency."
                            ]
      }
      
      ]`
    
    data = JSON.parse(data);

    selectMod = 0;
    selected = [];
    selected.length = data.length;
    for(var i = 0; i<selected.length; i++){
     if(i==selectMod)selected[i]=1;
     else selected[i]=0;   
    }

function init(){
    window.requestAnimationFrame(draw);
}

function draw() {
    var timelineVis = document.getElementById('timelineVis');
    timelineVis.width = window.innerWidth*.8;
    timelineVis.height = 200;
    timelineVis.addEventListener("mousemove", doMouseMove, false);
    timelineVis.addEventListener("click", doMouseClick, false);
    var ctx = timelineVis.getContext('2d');
    //LoadTimeline(ctx, timelineVis.width, timelineVis.height);
    TimeLineDraw(ctx, timelineVis.width, timelineVis.height);
    window.requestAnimationFrame(draw);
}
/*
function LoadTimeline(ctx, width, height) {
    var getUrl = 'MiscFiles/WorkTimeline.json';
    $.getJSON(getUrl, function(data) {
                return data;
              });
}
*/
function TimeLineDraw(ctx, width, height){

    ctx.beginPath();
    ctx.moveTo(0,height/2);//(0,window.innerHeight/2);
    ctx.lineTo(width,height/2);//(window.innerWidth, window.innerHeight/2);
    ctx.stroke();
    ctx.closePath();
    
    var rad = width/50;
    xCircDist = (width-(width/30))/data.length;
    
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
    for(var i = 0; i<data.length; i++){
        ctx.save();
        ctx.fillStyle = '#6280BF';
        ctx.fillText(data[i]["Start Date"], (width/50)+(i*xCircDist), (height/2)-(rad*1.5));
        ctx.fill();
        ctx.restore();
        
        
        ctx.save();
        drawEllipseByCenter(ctx, (width/50)+(i*xCircDist), height/2, rad, rad);
        if(selected[i]==0){
            ctx.fillStyle = '#FFFFFF';
        }
        else{
            ctx.fillStyle = '#6280BF';
           
            document.getElementById('Work ExperienceJS').innerHTML = `<h3 id="content">`+data[i]["Job Title"]+ `</h3>
            `;
            document.getElementById('Work ExperienceJS').innerHTML += `<h4 id="content">`+data[i]["Start Date"]+` To `+ data[i]["End Date"]+`</h4>
            `;

            if(data[i]["Job Description"] != null){
                if(data[i]["Job Title"] == "DoubleLevelJobTitle"){
                    for(var j=0; j<data[i]["Job Description"].length; j++){
                        document.getElementById('Work ExperienceJS').innerHTML += `<u> ` + data[i]["Job Description"][j]["SubLabel"] + `</u>
                        `;
                        
                        document.getElementById('Work ExperienceJS').innerHTML += `<ul>
                        `;
                        
                        for(var k=0; k<data[i]["Job Description"][j]["SubDesc"].length; k++){  
                            document.getElementById('Work ExperienceJS').innerHTML += `<li> ` + data[i]["Job Description"][j]["SubDesc"][k] + `</li>
                            `;
                        }
                        document.getElementById('Work ExperienceJS').innerHTML += `</ul></br>
                        `;
                    }
                }
                else{
                    document.getElementById('Work ExperienceJS').innerHTML += `<ul>
                    `;
                        for(var j=0; j<data[i]["Job Description"].length; j++){
                            document.getElementById('Work ExperienceJS').innerHTML += `<li> ` + data[i]["Job Description"][j] + `</li>
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

init();