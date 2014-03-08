function test()
{

	//test string reverse function
	var stringsToReverse = ['hello!',
							'Welcome, Booth Hacks',
							'Your job is to figure out how to reverse',
							'You should reverse every letter in the whole string, not just the individual words',
							'When you\'ve finished, you need to copy the ouput tester.js will write', 
							'Paste that output into the appropriate field on boothacks and hit enter', 
							'If you get it correct, you\'ll then be asked to enter your name so we know the order', 
							'We\'ll keep a record of who submits when, as an omage to your excellence', 
							'Then someone will be declared the winner(s)!', 
							'Different problems have different numbers of points.  We will also declare an overall winner based on total points earned'];
	var ReverseStringOutput = "";
	for(var i = 0; i < stringsToReverse.length; i++)
	{
		ReverseStringOutput += ReverseString(stringsToReverse[i])[i];
	}
	document.getElementById("ReverseStringSpan").innerHTML = ReverseString(ReverseStringOutput);

	//test Fashion function
	var fashionArrayYou =  [3, 5, 8, 1, 2, 0, 3, 4, 5, 8, 9, 9, 1, 5, 2, 10, 10, 8, 4, 2, 4];
	var fashionArrayDate = [9, 1, 2, 9, 1, 3, 4, 9, 2, 3, 1, 9, 5, 6, 10, 10, 6, 0, 0, 8, 8];
	var fashionScore = 0;
	for(var i = 0; i < fashionArrayYou.length; i++)
	{
		var score = Fashion(fashionArrayYou[i], fashionArrayDate[i]);
		if(score > 0)
		{
			fashionScore += score;
			fashionScore *= score;
		}
		else
		{
			fashionScore += 3;
		}
	}
	document.getElementById("FashionSpan").innerHTML = fashionScore;

	//test NearTen function
	var seed = 11.6;
	var iter = 10;
	var current = seed;
	for(var i = 0; i < iter; i++)
	{
		var num = Math.round(Math.abs(1000 * current));
		if(NearTen(num))
		{
			current = Math.sin(current - 1);
		}
		else
		{
			current = Math.sin(current + 1);
		}
	}
	document.getElementById("NearTenSpan").innerHTML = Math.round(Math.abs(current * 1000));


	//test NoTeenSum
	var noTeenSumArraya = [1, 15, 5, 16, 1, 4, 17, 19, 7, 3, 16, 7, 16, 5];
	var noTeenSumArrayb = [9, 13, 4, 10, 1, 15, 8, 19, 13, 3, 16, 15, 15, 5];
	var noTeenSumArrayc = [4, 19, 14, 0, 3, 16, 18, 9, 14, 3, 17, 16, 15, 16];
	var NoTeenSumOutput = "3.";
	for(var i = 0; i < noTeenSumArraya.length; i++)
	{
		NoTeenSumOutput += NoTeenSum(noTeenSumArraya[i], noTeenSumArrayb[i], noTeenSumArrayc[i]);
	}
	document.getElementById("NoTeenSumSpan").innerHTML = NoTeenSumOutput;


	//test LoneSum
	var loneSumArraya = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	var loneSumArrayb = [1, 3, 5, 7, 5, 7, 9, 11, 9, 10, 1, 14, 6, 3];
	var loneSumArrayc = [2, 3, 4, 4, 6, 7, 7, 25, 9, 3, 17, 14, 13, 6];

	var LoneSumOutput = "";
	for(var i = 0; i < loneSumArraya.length; i++)
	{
		LoneSumOutput += LoneSum(loneSumArraya[i], loneSumArrayb[i], loneSumArrayc[i]);
	}
	document.getElementById("LoneSumSpan").innerHTML = LoneSumOutput;


	//test prime function
	var isPrimeArray = [2, 4, 5, 13, 101, 103, 43899, 25747, 92899, 567633, 104711, 8119118119, 126247697, 44444443, 99990001, 9375859372, 999999000001, 1234567876543, 5555555551];
	var IsPrimeOutput = "";
	for(var i = 0; i < isPrimeArray.length; i++)
	{
		if( IsPrime(isPrimeArray[i]))
		{
			IsPrimeOutput += "1";
		}
		else
		{
			IsPrimeOutput += "0";
		}
	}
	document.getElementById("IsPrimeSpan").innerHTML = IsPrimeOutput;
}