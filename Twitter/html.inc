<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Booth Hacks Twitter Competition</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      img {border-width: 0}
      * {font-family:'Lucida Grande', sans-serif;}
    </style>
  </head>
  <body>
    <h2>Booth Hacks Twitter Competition</h2>
    <a href="http://www.boothhacks.com/W2014/Twitter/Following.php">See following data</a>
    <div style="position:absolute;left:50px">
     <table>
      <pre>
        <?php if(isset($followers) && isset($maxfollow)){$keys = array_keys($followers); for($y = 0; $y < count($followers); $y++) {echo '<tr><td><div style="white-space:nowrap;background-color:#40B3DF;opacity:0.7;width:'.(round(intval($followers[$keys[$y]]) * 800 / $maxfollow)).'px">'.$keys[$y].' - '.$followers[$keys[$y]].'</div></td></tr>'; }} ?>
      </pre>
     </table>
   </div>
      <p>
        <pre>
        <?php if(isset($content)){echo $content;} ?>
      </pre>
</p/
  </body>
</html>
