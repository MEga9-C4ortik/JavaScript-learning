// given an integer x, return true if x is a palindrome, and false otherwise.

function isPalindrome (num){
    let reverse = 0;
    let original = num;
    while(num > 0){
        reverse = reverse * 10 + (num % 10);
        num = Math.floor(num / 10);
    }
    return reverse === original;
}

number = 10;
console.log(isPalindrome(number));