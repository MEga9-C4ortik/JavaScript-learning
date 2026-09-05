// 209. Minimum Size Subarray Sum

var minSubArrayLen = function(target, nums) {
    let l = 0;
    let r = 0;
    let minLen = +Infinity;

    let total = 0;

    while (r < nums.length) {
        total += nums[r];

        while (total >= target) {
            minLen = (minLen < r-l+1) ? minLen : r-l+1;

            total -= nums[l];
            l++;
        }
        r++;
    }
    return minLen === Infinity ? 0 : minLen;
};