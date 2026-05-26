//125 Valid Palindrome

const isPalindrome = function(string) {
    string = string.toLowerCase().replace(/[^a-z0-9]/g, '');
    let l = 0;
    let r = string.length - 1;

    while(l < r) {
        if (string[l] !== string[r]) return false;

        l++;
        r--;
    }
    return true;
}