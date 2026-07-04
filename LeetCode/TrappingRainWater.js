// 42. Trapping rain water

var trap = function(height) {
    if (height.length < 3) return 0;

    let l = 0;
    let r = height.length-1;

    let left = 0;
    let right = 0;
    let result = 0;

    while (l < r) {
        if (height[l] < height[r]){
            if (height[l] > left){
                left = height[l];
            } else {
                result += left - height[l];
            }
            l++;
        } else {
            if (height[r] > right){
                right = height[r];
            } else{
                result += right - height[r];
            }
            r--;
        }
    }
    return result;
};