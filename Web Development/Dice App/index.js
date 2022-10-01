var randomNumber1 = Math.floor(Math.random()*6)+1;
var newLocal = "images/dice"+randomNumber1+".png";
document.querySelector("img").setAttribute("src", newLocal);


var randomNumber2 = Math.floor(Math.random()*6)+1;
var newLocal2 = "images/dice"+randomNumber2+".png";
document.querySelector("img.img2").setAttribute("src", newLocal2);

if(randomNumber1>randomNumber2)
{
    document.querySelector("h1").textContent="🚩 Player 1 wins!!!";
}
else if(randomNumber1<randomNumber2)
{
    document.querySelector("h1").textContent="Player 2 wins!!! 🚩";
}
else{
    document.querySelector("h1").textContent="Draw !!!";
}