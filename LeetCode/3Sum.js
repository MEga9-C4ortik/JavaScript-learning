// 15. 3Sum

var threeSum = function(nums) {
    nums = nums.sort((a,b) => a-b);
    let result = [];

    for (let i = 0; i < nums.length; i++) {
        if(i > 0 && nums[i] === nums[i-1]) continue;
        let l = i+1;
        let r = nums.length-1;

        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                result.push([nums[i], nums[l], nums[r]]);

                while(nums[l] === nums[l+1]) l++;
                while(nums[r] === nums[r-1]) r--;
                r--;
                l++;
            } else if (sum < 0) {
                l++;
                if (nums[l] === nums[l-1]) l++;
            } else {
                r--;
                if (nums[r] === nums[r+1]) r--;
            }
        }
    }
    return result;
};