<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
function generateRandomFile($targetString, $targetName, $stringDivisor, $nameDivisor){
	$fileName = generateRandomString(10);
	if(rand(0, $nameDivisor) == 0)
	{
		$filename = substr_replace($fileName, $targetName, rand(0, $fileName.length - $targetName.length));
	}
	file_put_contents($filename, generateRandomString(10), FILE_APPEND);
}
function createRandomFileStructure($filePath = "../Searchme", $maxDepth = 6, $maxBredth = 5, $maxFiles = 6, $targetString = "Job", $targetName="Apply", $stringDivisor = 10, $nameDivisor = 15) {
    if($maxDepth <= 0)
    {
    	return true;    	
    }

    $bredth = rand(0, $maxBredth);
    $files = rand(0, $maxFiles);

    for($i = 0; $i < $files $i++)
    {
		createRandomFile($targetString, $targetName, $stringDivisor, $nameDivisor);
	}

    for($i = 0; i < $bredth; $i++)
    {
		$depth = rand(1, $maxDepth - 1);
		$folderName = generateRandomString(10);
		if(rand(0, $nameDivisor) == 0)
		{
			$foldername = substr_replace($folderName, $targetName, rand(0, $folderName.length - $targetName.length));
		}
		createRandomFileStructure($filePath."/".$folderName, $maxBredth, $depth, $maxFiles, $targetString, $targetName, $stringDivisor, $nameDivisor);
	}
}

$file = 'people.txt';
// Open the file to get existing content
$current = file_get_contents($file);

// Append a new person to the file
$current .= "John Smith\n";

// Write the contents back to the file
file_put_contents($file, $current);
