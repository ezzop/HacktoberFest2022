<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://7a859ffcc3961df6e1c52d6dc93cf672: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@yourlibaasuae.myshopify.com/admin/api/2021-10/products.json",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

$response = json_decode($response, true); //because of 'true', it's in an array

//iterates through 'products'
foreach($response["products"] as $key ) {
	//iterates through each object in the key and prints value of 'title'
	echo $key["title"]. PHP_EOL; 
}
    

?>