// 35. Search Insert Position
// speed O(logN) | memory O(n)

var searchInsert = function(nums, key) {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        let mi = Math.floor(lo + (hi - lo) / 2);
        if(nums[mi] === key)
            return mi;
        else if (nums[mi] > key)
            hi = mi - 1;
        else if (nums[mi] < key)
            lo = mi + 1;
    }
    return lo;
};

console.log(searchInsert([1,2,3,4,5,6,7,8], 6)); //5
console.log(searchInsert([1,2,3,4,5,6,7,8], 1)); //0
console.log(searchInsert([1,2,3,4,5,6,7,8], 9)); //8