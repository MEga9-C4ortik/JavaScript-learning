/*
    283. Move Zeroes
    No need to return anything need to change in place
    Complexity O(n)
 */

let MoveZeroes = function(nums) {
    let sl = 0;

    for (let fs = 0; fs < nums.length; fs++) {
        if(nums[fs] !== 0){
            nums[sl] = nums[fs];
            sl++;
        }

        if(fs >= sl){
            nums[fs] = 0;
        }
    }
}