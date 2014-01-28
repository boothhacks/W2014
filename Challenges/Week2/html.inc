<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Booth Hacks Week 1 Challenge</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      img {border-width: 0}
      * {font-family:'Lucida Grande', sans-serif;}
    </style>
  </head>
  <body>
    <h2>Booth Hacks Week 1 password challenge #1</h2>
    <p>Your mission: to find the password.  It's somewhere on this page.  Good luck!</p>
    <form action="index.php" method="post" name="form">
      <table>
        <tr>
          <td>
            password: <input type="text" name="pw1">
          </td>
        </tr>
        <tr>
          <td>
            <!-- checking the source code is always a good first move!  look here for the password: https://xkcd.com/936/ -->
            <input type="submit" name="submit" value="submit">
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" name="clear" value="start over">
          </td>
        </tr>
      </table>
    </form>
  </body>
</html>
