//344. Reverse String

var reverseString = function(s) {
    if(s.length < 2) return s;
    let l = 0;
    let r = s.length - 1;

    while (l < r) {
        let temp = s[l];
        s[l] = s[r];
        s[r] = temp;
        l++;
        r--;
    }
};

let str = "hello";
console.log(reverseString(str));