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
    <p>
     <table>
      <pre>
        <?php $keys = array_keys($followers); for($y = 0; $y < count($followers); $y++) {echo '<div style=\"color:blue;opacity:0.7;width:'.(intval($followers[$keys[$y]]) * 800 / $maxfollow).'px\">'.$followers[$keys[$y]].'</div>'; } ?>
      </pre>
     </table>
    </p>

  </body>
</html>
