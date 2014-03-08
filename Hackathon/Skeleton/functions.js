function ReverseString(string)
{
	//10 points
	/*
You must reverse the string passed into this function.

Example:
ReverseString(hello) -> olleh
ReverseString(lots of words) -> sdrow fo stol
	*/
return "";
}

function Fashion(you, date)
{
	//12 points
	/*
You and your date are trying to get a table at a restaurant. The parameter "you" is the stylishness 
of your clothes, in the range 0..10, and "date" is the stylishness of your date's clothes. 
The result getting the table is encoded as an int value with 0=no, 1=maybe, 2=yes. If either of you is 
very stylish, 8 or more, then the result is 2 (yes). With the exception that if either of you has style 
of 2 or less, then the result is 0 (no). Otherwise the result is 1 (maybe). 

Example:
date_fashion(5, 10) → 2
date_fashion(5, 2) → 0
date_fashion(5, 5) → 1
	*/
	return 0;

}
function NearTen(num)
{
	//15 points
	/*
Given a non-negative number "num", return True if num is within 2 of a multiple of 10. 
Note: (a % b) is the remainder of dividing a by b, so (7 % 5) is 2.

near_ten(12) → True
near_ten(17) → False
near_ten(19) → True
	*/
	return false;
	
}
function FixTeen(a)
{
	//18 points
	//This function might be helfpul to implement for NoTeenSum, below.  You don't have to use this function though.
	//If you do choose to use it, you might want to do something like fixing the number to match the rules
	//given in NoTeenSum.  This would be so you don't have to write the same logic 3 different times, once for a, b, and c
	return a;
}
function NoTeenSum(a, b, c)
{
	//21 points
/*
Given 3 int values, a b c, return their sum. However, if any of the values is a teen -- in the 
range 13..19 inclusive -- then that value counts as 0, except 15 and 16 do not count as a teens. 

no_teen_sum(1, 2, 3) → 6
no_teen_sum(2, 13, 1) → 3
no_teen_sum(2, 1, 14) → 3
*/

	return a + b + c;

}
function LoneSum(a, b, c)
{
	//24 points
/*
Given 3 int values, a b c, return their sum. 
However, if one of the values is the same as another of the values, it does not count towards the sum. 

lone_sum(1, 2, 3) → 6
lone_sum(3, 2, 3) → 2
lone_sum(3, 3, 3) → 0
*/

	return a + b + c;

}
function IsPrime(number)
{
	//25 points
	/*
You must determine if number is a prime or not.  If it is, return true.  If it's not, return false

Example:
	IsPrime(2) -> true
	IsPrime(8) -> false
	IsPrime(11) -> true
	*/
	return false;
}