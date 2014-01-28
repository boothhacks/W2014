<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    //echo $randomString;
    return $randomString;
}


function generateRandomFile($filePath, $targetString, $targetName, $stringDivisor, $nameDivisor)
{
    $fileName = generateRandomString(10);
    $fileString = generateRandomString(1000);
	if(rand(0, $nameDivisor) == 0)
	{
		$fileName = substr_replace($fileName, $targetName, rand(0, strlen($fileName) - strlen($targetName)), 0);
	}
    if(rand(0, $stringDivisor) == 0)
    {
        $fileString = substr_replace($fileString, $targetString, rand(0, strlen($fileString) - strlen($targetString)), 0);
    }
	file_put_contents($filePath."/".$fileName.".txt", $fileString, 0);
    //echo "FileName: ".$filename."\r\n";
    return $fileName;
}

function createRandomFileStructure($filePath = "../Searchme", $maxDepth = 6, $maxBredth = 5, $maxFiles = 6, $targetString = "Job", $targetName="Apply", $stringDivisor = 10, $nameDivisor = 15) {
    
    mkdir($filePath);

    echo $maxDepth;
    if($maxDepth <= 0)
    {
        //echo "maxDepth below threshold";
    	return true;    	
    }

    $bredth = rand(0, $maxBredth);
    $files = rand(0, $maxFiles);

    for($i = 0; $i < $files; $i++)
    {
		generateRandomFile($filePath, $targetString, $targetName, $stringDivisor, $nameDivisor);
	}

    for($i = 0; $i < $bredth; $i++)
    {
		$depth = rand(0, $maxDepth - 1);
		$folderName = generateRandomString(10);
        //echo "foldername: ".$folderName."\n\r";
		createRandomFileStructure($filePath."/".$folderName, $depth, $maxBredth, $maxFiles, $targetString, $targetName, $stringDivisor, $nameDivisor);  
    }
}

createRandomFileStructure("../Searchme", 10, 10, 10, "Job", "apply", 5, 5);
