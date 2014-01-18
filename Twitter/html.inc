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
    <div>
      <h2>Booth Hacks Twitter Competition</h2>

      <hr />
      <?php if (isset($menu)) { ?>
        <?php echo $menu; ?>
      <?php } ?>
    </div>
    <?php if (isset($status_text)) { ?>
      <?php echo '<h3>'.$status_text.'</h3>'; ?>
    <?php } ?>
    <p>
      <pre>
        <?php echo 'DH ID: '.$DH[0]->id_str; ?>
        <?php echo 'BHList: '.count($BHList); ?>
        <?php echo 'BHList: '.$BHList[0]->id_str; ?>
        <?php echo 'BHID: '.$BHID; ?>
        <?php print_r($Members->users) ?>
        <?php print_r($followers) ?>
        <?php echo 'followers: '.$followers; ?>
      </pre>
      <pre>
        <?php print_r($content); ?>
      </pre>
    </p>

  </body>
</html>
