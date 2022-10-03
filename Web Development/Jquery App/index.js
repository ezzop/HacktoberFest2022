// $(document).ready(function(){
//     $("h1").css("color","red");
// });

// $("h1").css("color","blue");

$("h1").text("BYE");
$("h1").addClass("big-title");
$("a").attr("href","https://www.yahoo.com");
$("button").click(function(){
    $("h1").css("color","purple");
});


$("input").keypress(function(event){
    console.log(event.key);
});