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
$DH =      $connection->get('users/lookup', array('screen_name' => 'DoerHub'));
$BHList =  $connection->get('lists/list', array('screen_name' => 'DoerHub', 'user_id' => $DH[0]->id_str));
/*$BHID = 0;
for($x = 0; $x <= count($BHList); $x++)
{
	if($BHList[$x]->name == "BH")
		$BHID = $BHList[$x]->id_str;
}
$Members =  $connection->get('lists/list', array('list_id' => $BHID));
*/
/*1431716216
'lists/list'
103277668
'lists/members'
'followers/ids'
users[$x]->id;
for($x; $x <= count($content->ids); $x++)
{

}
$content->ids[0];
*/

/* Some example calls */
//$connection->get('users/show', array('screen_name' => 'nocontxtquotes')));
//$connection->post('statuses/update', array('status' => date(DATE_RFC822)));
//$connection->post('statuses/destroy', array('id' => 5437877770));
//$connection->post('friendships/create', array('id' => 9436992)));
//$connection->post('friendships/destroy', array('id' => 9436992)));

/* Include HTML to display on the page */
include('html.inc');
