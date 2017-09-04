class Sun {

  String colorTxt;
  float randomWPoint;
  float randomHPoint;
  float randomZPoint;
  color sunColor;
  float radians=0;
  float velocity = random(0.005, 0.05);

  Sun() {
  }

  Sun(String colorTxt) {
    this.colorTxt = colorTxt;
    randomWPoint = random(50, width);
    randomHPoint = random(50, height);
    randomZPoint = random(-400, 400);

    switch(colorTxt) {
    case "Red":
      sunColor = color(255, 0, 0);
      break;
    case "Green":
      sunColor = color(0, 255, 0);
      break;
    case "Blue":
      sunColor = color(0, 0, 255);
      break;
    }
  }

  void constructSun() { 

    pushMatrix();
    stroke(0);

    switch(colorTxt) {
    case "Red":
      rotateX(radians);
      translate(0, randomHPoint, randomZPoint);
      break;
    case "Green":
      rotateY(radians);
      translate(randomWPoint, 0, randomZPoint);
      break;
    case "Blue":
      rotateZ(radians);
      translate(randomWPoint, randomHPoint, 0);
      break;
    }

    noStroke();

    fill(red(sunColor), green(sunColor), blue(sunColor));
    sphere(25);

    //translate(0, 0, 30);
    //fill(0);
    //textAlign(CENTER);
    //text(colorTxt, 0, 0);
    //fill(255);

    popMatrix();
  }

  void constructLight() {
    pushMatrix();
    switch(colorTxt) {
    case "Red":
      rotateX(radians);
      translate(0, randomHPoint, randomZPoint);
      break;
    case "Green":
      rotateY(radians);
      translate(randomWPoint, 0, randomZPoint);
      break;
    case "Blue":
      rotateZ(radians);
      translate(randomWPoint, randomHPoint, 0);
      break;
    }
    pointLight(red(sunColor), green(sunColor), blue(sunColor), randomWPoint, randomHPoint, randomZPoint);
    popMatrix();
    this.radians=radians+velocity;
  }
}