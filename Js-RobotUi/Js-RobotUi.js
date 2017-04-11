//Main Js File

//Toggleable Element Function
//vars we need to pass in for a bassic Toggleable Element
// name, id(corrisponding to the div),Networktable Key(the key the listener uses),Default state(used in some)


//Need to decide how i want to handle the listener

NetworkTableName = null;
var index = {};

//tests index
index["test"] = "it works";
document.getElementById("Test").innerHTML = index["test"];

//Set the network table name used
function Set_NT_Name(Name){
  //set network table name
  NetworkTableName = Name;
}

//Global Listener
NetworkTables.addGlobalListener(function(key, value, isNew){
  //ToggleElement is a boolean
  for (x in index){

    if(key == "/" + NetworkTableName + "/" + x.NetKey){
      x.Handle(value,isNew);
      break;
    }

  }
})

//Toggle Element Class
function ToggleElement(tName,  tId,  tNetKey, tState){
  this.Name = tName;
  this.Id = tId;
  this.NetKey = tNetKey;
  this.Hidden = false;

  if(tState == "Hidden"){
    //sets to hidden if passed as hidden api call already sets default state
    this.Hidden = true;
  }

  //Methods
  this.toggle = function(){
    //toggle function
      if (this.Hidden == true){
        //set to visible
        this.hidden = false;
        document.getElementById(this.Id).style.visibility = "visible";

      }else{
        //set to hide
        this.hidden = true;
        document.getElementById(this.Id).style.visibility = "hidden";

      }
  }
  //Standard handle function that the event listener calls
  this.Handle = function(value, isNew){
    //Handle
    //Toggle the state of the element
    toggle();

  }
}

//Called Function From External Script
function DeclareToggleElement( Name,  Id,  NetKey, State){

  //test if name or id alreayd exists. if so shoot back exception
  try{
    if (Name == null || index.hasOwnProperty(Name) || typeof Name != 'string'){
      //has name already registered
      throw "Error, /'" + Name + "/' Already Is registered, Learn How To Use My API!";
    }
  }catch(err){
    //throw the Error
    window.alert(err);
  }

  //Create Variables
  var TempObj = new ToggleElement(Name,Id,NetKey,State);
  index[Name] = TempObj; //adds to index of elements

  //set default states
  if (State == "Hidden"){
    //If Hidden
    document.getElementById(Id).style.visibility = "hidden";
  }else{
    //defaults to visible
    document.getElementById(Id).style.visibility = "visible";
  }
}

function StraightMeterObject(tName,  tId,  tNetKey, tOrientation, tMin, tMax, tValue, tGood , tLow , tHigh, tMeterStyleId, tTextStyleId,tCustomText  ){

  this.Name = tName;
  this.Id = tId;
  this.NetKey = tNetKey;
  this.Orientation = tOrientation;

  //values plugged into the html
  this.Min = tMin;
  this.Max = tMax;
  this.Value = tValue;

  //visual assigners
  this.Good = tGood;
  this.Low = tLow;
  this.High = tHigh;

  //style id handlers
  this.MeterId = tMeterStyleId;
  this.TextId = tTextStyleId;

  this.CustomString = tCustomText;


  this.Update = function(){

    //Meter
    document.getElementById(this.Id).innerHTML = "<meter low=" +this.Low+ " high=" +this.High+ " optimum=" +this.Good+ " min=" +this.Min+ " max=" +this.Max+ " value="+this.Value+" id="+this.MeterId+" ></meter> <div id = "+this.TextId+"> "+this.CustomString+" "+this.Value+ "</div> ";

    //Default Bar styling
    document.getElementById(this.MeterId).style.width = "350px";
    document.getElementById(this.MeterId).style.height = "50px";


    if (this.Orientation == true){
      //if orientation is then it means that they want the bar verticle
      document.getElementById(this.Id).style.transform = "rotate(-90deg)";
      //correct the rotation of the text
      document.getElementById(this.TextId).style.transform = "rotate(90deg)";

      //Set Default styles
      document.getElementById(this.TextId).style.position = "relative";
      document.getElementById(this.TextId).style.fontSize = 23;
      document.getElementById(this.TextId).style.textAlign = "center";
      document.getElementById(this.TextId).style.top = "-33px";
      document.getElementById(this.TextId).style.left = "-55%";

    }else{
      //Set default styles
      document.getElementById(this.TextId).style.position = "relative";
      document.getElementById(this.TextId).style.fontSize = "23";
      document.getElementById(this.TextId).style.textAlign = "center";
    }
  }

  //functions

  this.Handle = function(value, isNew){
    //handle
    this.Value = value;
    this.Update();

  }

}

function DeclareStraightMeter(Name,  Id,  NetKey, Orientation = true, Min, Max, Value, Good, Low, High, MeterStyleId , TextStyleId ,CustomText = "Value:"){

  try{
    //check name
    /*if (Name == null || index.hasOwnProperty(Name) || typeof Name != 'string'){
      //has name already registered
      throw "Error, /'" + Name + "/' Already Is registered, Learn How To Use My API!";
    }*/

    //Checks for Name
    if (name == null){
      //name is null
      throw "Error, Name is set to null, It should be a string."
    }else if(index.hasOwnProperty(Name)){
      //Name Already Registered
      throw "Error, '" + Name + "' Already Is registered, Learn How To Use My API!";
    }else if (typeof Name != 'string'){
      //Name not string
      throw "Error, Name is not a string, It should be a STRING!"
    }

    //Check Id
    if (Id == null){
      throw "Error, Id is set to null, It should be a string."

    }else if (typeof Id != 'string'){
      throw "Error, Id is not a string, It should be a STRING!"

    }

    //Check NetKey
    if (name == null){
      //name is null
      throw "Error, NetKey is set to null, It should be a string."
    }else if (typeof Name != 'string'){
      //Name not string
      throw "Error, NetKey is not a string, It should be a STRING!"
    }

    //Check Orientation
    if (Orientation == null){

      throw "Error, orientation is set to null, It should be a Boolean."

    }else if (typeof Orientation != 'boolean'){
      throw "Error, Orientation is not a Boolean, It should be a Boolean!"
    }
    //need to add handler for the rest of the varibles and possibly add handeling for min max good
  }catch(err){
    //throw the Error
    window.alert(err);
  }
  //declare a new object
  var TempObj = new StraightMeterObject(Name,  Id,  NetKey, Orientation, Min, Max, Value, Good, Low, High, MeterStyleId,TextStyleId,CustomText);
  index[Name] = TempObj; //adds to index of elements
  TempObj.Update();

}
