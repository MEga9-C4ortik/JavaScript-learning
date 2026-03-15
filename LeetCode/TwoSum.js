//1. Two Sum
// Complexity should be < O(n²), did O(n)
//runtime  4ms(beats 51.82%) | memory 55.31mb(beats 41.65%)

let twoSum = function(nums, target) {
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

console.log(twoSum([2,3,6,1,3], 3));