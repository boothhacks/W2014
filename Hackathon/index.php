<?php

/* Load required lib files. */
session_start();

if(isset($_POST['clear']))
{
	unset($_POST['pw1']);
	unset($_POST['pw2']);
	unset($_POST['pw3']);
	unset($_POST['pw4']);
	unset($_POST['pw5']);
	unset($_POST['pw6']);
	unset($_POST['name']);
	unset($_SESSION['pw1']);
	unset($_SESSION['pw2']);
	unset($_SESSION['pw3']);
	unset($_SESSION['pw4']);
	unset($_SESSION['pw5']);
	unset($_SESSION['pw6']);
	unset($_SESSION['name']);
}

$pw1 = "nice work!";
$pw2 = "1750";
$pw3 = "905";
$pw4 = "3.1415926535897932384626";
$pw5 = "2212766944032912623";
$pw6 = "1011110110101010100";


if(isset($_POST['name']))
{
	$_SESSION['name'] = $_POST['name'];
}
$name = $_SESSION['name'];

if(isset($_POST['pw1']) && $_POST['pw1'] == $pw1)
{
	if(!isset($_SESSION['pw1']))
	{
		file_put_contents("pw1.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw1'] = $pw1;
	}
}
if(isset($_POST['pw2']) && $_POST['pw2'] == $pw2)
{
	if(!isset($_SESSION['pw2']))
	{
		file_put_contents("pw2.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw2'] = $pw2;
	}
}
if(isset($_POST['pw3']) && $_POST['pw3'] == $pw3)
{
	if(!isset($_SESSION['pw3']))
	{
		file_put_contents("pw3.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw3'] = $pw3;
	}
}
if(isset($_POST['pw4']) && $_POST['pw4'] == $pw4)
{
	if(!isset($_SESSION['pw4']))
	{
		file_put_contents("pw4.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw4'] = $pw4;
	}
}
if(isset($_POST['pw5']) && $_POST['pw5'] == $pw5)
{
	if(!isset($_SESSION['pw5']))
	{
		file_put_contents("pw5.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw5'] = $pw3;
	}
}
if(isset($_POST['pw6']) && $_POST['pw6'] == $pw6)
{
	if(!isset($_SESSION['pw6']))
	{
		file_put_contents("pw6.txt", $name." ".date('m/d/Y h:i:s a', time())."\n", FILE_APPEND);
		$_SESSION['pw6'] = $pw3;
	}
}
include('html.inc');


