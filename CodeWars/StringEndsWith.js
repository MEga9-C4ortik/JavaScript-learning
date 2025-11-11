/*
Complete the solution so that it returns true
if the first argument(string) passed in ends with the 2nd argument (also a string).
 */

function solution(str, ending) {
    if (ending.length > str.length) return false;

    for (let i = str.length - 1 , j = ending.length - 1; j >= 0; i--,j--) {
        if (ending[j] != str[i]) {
            return false;
        }
    }
    return true;
}