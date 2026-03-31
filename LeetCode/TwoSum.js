//1. Two Sum
// Complexity should be < O(n²)
// Complexity is O(n)
// Map uses O(1) for searching, getting and adding an element

let twoSumMap = function(nums, target) {
    let map = new Map();

    for (let i = 0; i < nums.length; i++) {
        let needed = target - nums[i];
        if (map.has(needed)) {
            return [map.get(needed),i];
        } else {
            map.set(nums[i], i);
        }
    }
};

let twoSum = function(nums, target) {
    nums.sort((a,b) => a-b);

    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
        const currSum = nums[l] + nums[r];

        if (currSum === target) {
            return [l,r];
        } else if (currSum > target) {
            r--;
        } else {
            l++;
        }
    }
    return [-1,-1];
}

console.log("Map: " + twoSumMap([2,3,6,1,3], 3));
console.log("two index: " + twoSum([2,3,6,1,3], 3));