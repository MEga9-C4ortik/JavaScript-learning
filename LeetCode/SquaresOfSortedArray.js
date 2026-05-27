//977. Squares of sorted array

var sortedSquares = function(nums) {
    let l = 0;
    let r = nums.length - 1;
    let wr = nums.length - 1;
    let result = new Array(nums.length);

    while (l <= r) {
        if (Math.abs(nums[l]) > Math.abs(nums[r])) {
            result[wr] = Math.pow(nums[l], 2);
            l++;
        } else {
            result[wr] = Math.pow(nums[r], 2);
            r--;
        }
        wr--;
    }
    return result;
};