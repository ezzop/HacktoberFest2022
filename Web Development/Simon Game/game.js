gamePattern=[];


for(var i =0;i<5;i++)
{
    var randomNumber= Math.floor(Math.random()*4);
    buttonColours=["red","blue","green","yellow"];
    gamePattern.push(buttonColours[randomNumber]);
}

console.log(gamePattern);

