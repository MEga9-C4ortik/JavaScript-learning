//167. Two Sum II - Input Array Is Sorted

const twoSum = function(nums, target){
    let l = 0;
    let r = nums.length-1;

    while (l < r){
        const sum = nums[l]+nums[r];

        if(sum === target) return [l+1,r+1];
        else if(sum > target) r--;
        else l++;
    }
}