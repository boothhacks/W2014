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
    <h2>Booth Hacks Week 1 password challenge #2</h2>
    <p>Well done! This one's a bit harder- but not that hard, if you did the assignment from last week</p>
    <form action="index.php" method="post" name="form2">
      <table>
        <tr>
          <td>
            password: <input type="text" name="pw2">
          </td>
        </tr>
        <tr>
          <td>
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
    <p><?php if(isset($_POST['pw2'])) { echo $_POST['pw2']; } ?></p>
    <script type="text/javascript">
    function swap(array, i, j)
    {
      var x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
      var pwdarray = new Array();
      pwdarray[0] = String.fromCharCode(104);
      pwdarray[1] = String.fromCharCode(54);
      pwdarray[2] = String.fromCharCode(116);
      pwdarray[3] = String.fromCharCode(56);
      pwdarray[4] = String.fromCharCode(58);
      pwdarray[5] = String.fromCharCode(109);
      pwdarray[6] = String.fromCharCode(47);
      pwdarray[7] = String.fromCharCode(99);
      pwdarray[8] = String.fromCharCode(107);
      pwdarray[9] = String.fromCharCode(99);
      pwdarray[10] = String.fromCharCode(100);
      pwdarray[11] = String.fromCharCode(46);
      pwdarray[12] = String.fromCharCode(120);
      pwdarray[13] = String.fromCharCode(111);
      pwdarray[14] = String.fromCharCode(47);
      pwdarray[15] = String.fromCharCode(47);
      pwdarray[16] = String.fromCharCode(112);
      pwdarray[17] = String.fromCharCode(48);
      pwdarray[18] = String.fromCharCode(116);
      pwdarray[19] = String.fromCharCode(47);

      for(var a = 0; a < pwdarray.length/2; a++)
      {
        if(a %2)
          {
            swap(pwdarray, a, pwdarray.length - a -1);
          }
      }
      var password_hint = pwdarray.join('');
    </script>
    <!-- hmmm... I wonder what's in that variable... -->
  </body>
</html>
