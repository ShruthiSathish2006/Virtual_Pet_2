//Create variables here
var dog;
var foodS,foodStock;
var fedTime, lastFed;
var feed, addFood;
var database;
var foodObj;

function preload()
{
  //load images here
  
 Dog = loadImage("images/dogImg.png");
 DogHappy = loadImage("images/dogImg1.png");


}

function setup() {
  createCanvas(1000,500);
  database = firebase.database();
  
  dog = createSprite(500,250,1,1)
  dog.addImage(Dog)
  Dog.resize(200,200)
  
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  feed=createButton("Feed the dog");
  feed.position(900,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(1200,95);
  addFood.mousePressed(addFoods);


  
}


function draw() {  
  background(46,139,87)
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke(10)
  text("Food Remaining:" + foodS,150,100);
  

  

}

function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);

}
function feedDog(){
  if(feedDog){
  
  dog.addImage(DogHappy);
  DogHappy.resize(200,200);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
    
  })
  }
  else{
    dog.addImage(Dog);
  }
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
} 

function writeStock(){
  if(foodS<=0){
    foodS = 0
  }
}



