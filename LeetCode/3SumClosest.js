// 16. 3sum Closest

var threeSumClosest = function(nums, target) {
    nums.sort((a,b) => a-b);
    let closest = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length; i++) {
        let l = i + 1;
        let r = nums.length - 1;

        while (l < r) {
            let sum = nums[i] + nums[l] + nums[r];
            if (sum === target) {
                return target
            } else if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            if (sum < target) {
                l++;
            } else {
                r--;
            }
        }
    }
    return closest;
}