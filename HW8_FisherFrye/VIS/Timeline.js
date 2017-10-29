
    var data = `[{
        "Person": "Alex Frye",
        "Job Title": "Database Development Lead",
        "Start Date": "Oct 2017",
        "End Date": "Present",
        "Job Description":  [
                              "Lead T-SQL Database Development responsible for design, estimate, and development for a small team supporting Revenue Management Applications.",
                              "Develop Tables, Views, Procedures, Triggers, Jobs, SSIS, etc. in a SQL 2008 Datawarehouse Environment, with exposure to SQL 2014.",
                              "Development Experience creating SQL objects to support .NET Applications",
                              "Lead restructure of TFS utilization during Migration from 2010 to 2017, allowing usage of Kanban boards to support our product backlog"
                            ]
      },
      {
        "Person": "Alex Frye",
        "Job Title": "Database Developer III",
        "Start Date": "May 2016",
        "End Date": "Oct 2017",
        "Job Description":  null
      },
      {
        "Person": "Alex Frye",
        "Job Title": "Business Analyst II",
        "Start Date": "Sept 2015",
        "End Date": "May 2016",
        "Job Description":  [{
                            "SubLabel": "Revenue Management - Financial Planning & Analysis",
                            "SubDesc": [
                                        "Created Business & Functional Requirement documentation to support various revenue applications which enabled business users to manage Rebate Incentive programs, Pricing analytics, & ultimately arrive at transactional-level profitability metrics",
                                        "Facilitated extensive user training to enable proper usage of Revenue applications",
                                        "Facilitated a requirement workshop to provide implementation guidance & gap analysis for new business unit to integrate into rebate application",
                                        "Support business needs through detailed data analytics & reporting initiatives"
                                        ]
                                    },
                            {
                            "SubLabel": "Secure Supply Chain (Drug Serialization)",
                            "SubDesc":  [
                                        "Supported the Pilot program for implementing new processes to remain compliant due to the Drug Supply Chain Security Act (DSCSA).",
                                        "Facilitated requirement workshops to identify as is & to be processes in the distribution centers participating in Pilot Programs"
                                        ]
                                    }
                            ]
      },
      {
        "Person": "Alex Frye",
        "Job Title": "Business Analyst I",
        "Start Date": "June 2014",
        "End Date": "Sept 2015",
        "Job Description":  null
      },
      {
        "Person": "Alex Frye",
        "Job Title": "Client Services Associate Team Lead",
        "Start Date": "January 2014",
        "End Date": "June 2014",
        "Job Description":  [
                            "Primary contact for 10 clients (partnerships) and responsible for making sure investor ownership & K-1 Tax Forms are reported and mailed out correctly.",
                            "Created various SQL queries/reports in order to help clients cut costs, reduce call center backlog, and provide transparency to clients regarding their investor data.",
                            "Took initiatives to standardize best practices for e-file Test Plans & Summary Documentation."
                            ]
      },
      {
        "Person": "Alex Frye",
        "Job Title": "IT Intern - Business Analyst",
        "Start Date": "May 2013",
        "End Date": "August 2013",
        "Job Description":  [
                            "Elicited information and created process flow diagrams to document financial processes, resulting in process improvements",
                            "Created a decision analysis document to aide business & internal IT in selecting a project development approach",
                            "Facilitated Business Functional Requirements Document (BFRD)/Process documentation reviews"
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
                if(data[i]["Job Title"] == "Business Analyst II"){
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