<?php
/**
 * @file
 * User has successfully authenticated with Twitter. Access tokens saved to session and DB.
 */

/* Load required lib files. */
session_start();
require_once('twitteroauth/twitteroauth.php');
require_once('config.php');

/* If access tokens are not available redirect to connect page. */
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location: ./clearsessions.php');
}
/* Get user access tokens out of the session. */
$access_token = $_SESSION['access_token'];

/* Create a TwitterOauth object with consumer/user tokens. */
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

/* If method is set change API call made. Test is called by default. */
//$content = $connection->get('account/verify_credentials');
//$content = $connection->get('followers/ids', array('screen_name' => 'YaoYaoHacks'));
$BHList =  $connection->get('lists/list', array('screen_name' => 'DoerHub'));
$BHID = 0;
for($x = 0; $x <= count($BHList); $x++)
{
	if($BHList[$x]->name == "BH")
		$BHID = $BHList[$x]->id_str;
}
$Members =  $connection->get('lists/members', array('list_id' => $BHID));


for($x = 0; $x <= count($Members->users); $x++)
{
	array_push($followers, $Members->users[$x]->screen_name);
}
// = $Members->users[$x]->followers_count);

/* Include HTML to display on the page */
include('html.inc');
