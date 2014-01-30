<?php
 
/* Load required lib files. */
session_start();

if(isset($_POST['clear']))
{
	unset($_POST['pw1']);
	unset($_POST['pw2']);
	unset($_POST['pw3']);
	unset($_SESSION['pw1']);
	unset($_SESSION['pw2']);
	unset($_SESSION['pw3']);
}

$pw1 = "correcthorsebatterystaple";
$pw2 = "shibboleet";
$pw3 = "IfYou'reTheFirstYouWin!";

if((isset($_POST['pw3']) && $_POST['pw3'] == $pw3) 
	|| isset($_SESSION['pw3']))
{
	if(!isset($_SESSION['pw3']))
	{
		file_put_contents("pw3.txt", session_id()."\n", FILE_APPEND);
		$_SESSION['pw3'] = $pw3;
	}
	include('html_password3.inc');
}
else if((isset($_POST['pw2']) && $_POST['pw2'] == $pw2) 
	|| isset($_SESSION['pw2']))
{
	if(!isset($_SESSION['pw2']))
	{
		file_put_contents("pw2.txt", session_id()."\n", FILE_APPEND);
		$_SESSION['pw2'] = $pw2;
	}
	//TODO: change this to html_password2.inc if you come up with another challenge
	include('html_password3.inc');
}
else if((isset($_POST['pw1']) && $_POST['pw1'] == $pw1) 
	|| isset($_SESSION['pw1']))
{
	if(!isset($_SESSION['pw1']))
	{
		file_put_contents("pw1.txt", session_id()."\n", FILE_APPEND);
		$_SESSION['pw1'] = $pw1;
	}
	include('html_password1.inc');
}
else
{
	include('html.inc');
}


