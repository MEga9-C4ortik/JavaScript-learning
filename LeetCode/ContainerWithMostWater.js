//11. Container With Most Water

var maxArea = function (height) {
    let result = 0;
    let l = 0;
    let r = height.length - 1;

    while (l < r) {
        const short = height[l] < height[r] ? height[l] : height[r];
        const distance = r - l;

        const area = distance * short;
        result = Math.max(result, area);
        if(height[l] > height[r]) {
            r--;
        } else {
            l++;
        }
    }
    return result;
};