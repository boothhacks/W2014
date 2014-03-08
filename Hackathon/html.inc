<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Booth Hacks Hackathon Challenge</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      img {border-width: 0}
      * {font-family:'Lucida Grande', sans-serif;}
    </style>
  </head>
  <body>
    <h2>Booth Hacks Hackathon Challenge</h2>
    <p>Complete the following.  Good luck!</p>
    <p>You have currently completed the following correctly:</p>
    <p><?php if(isset($_SESSION['pw1'])) { echo "ReverseString()"; } ?></p>
    <p><?php if(isset($_SESSION['pw2'])) { echo "Fashion()"; } ?></p>
    <p><?php if(isset($_SESSION['pw3'])) { echo "NearTem()"; } ?></p>
    <p><?php if(isset($_SESSION['pw4'])) { echo "NoTeenSum()"; } ?></p>
    <p><?php if(isset($_SESSION['pw5'])) { echo "LoneSum()"; } ?></p>
    <p><?php if(isset($_SESSION['pw6'])) { echo "IsPrime()"; } ?></p>

    <form action="index.php" method="post" name="form">
      <table>
        <tr>
          <td>
            Your Name: <input type="text" name="name" value=<?php if(isset($_SESSION['name'])) { echo $_SESSION['name']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            Reverse String: <input type="text" name="pw1" value=<?php if(isset($_SESSION['pw1'])): ?>"nice work!"<?php else: ?><?php endif;?>>
          </td>
        </tr>
        <tr>
          <td>
            Fashion: <input type="text" name="pw2" value=<?php if(isset($_SESSION['pw2'])) { echo $_SESSION['pw2']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            NearTen: <input type="text" name="pw3" value=<?php if(isset($_SESSION['pw3'])) { echo $_SESSION['pw3']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            NoTeenSum: <input type="text" name="pw4" value=<?php if(isset($_SESSION['pw4'])) { echo $_SESSION['pw4']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            LoneSum: <input type="text" name="pw5" value=<?php if(isset($_SESSION['pw5'])) { echo $_SESSION['pw5']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            IsPrime: <input type="text" name="pw6" value=<?php if(isset($_SESSION['pw6'])) { echo $_SESSION['pw6']; } ?>>
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" name="submit" value="submit">
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" name="clear" value="clear and start over">
          </td>
        </tr>
      </table>
    </form>
  </body>
</html>
