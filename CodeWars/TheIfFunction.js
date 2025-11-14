/*Create a function that takes three arguments:
1) a value to be evaluated for truthiness.
2) a function to execute if the first argument is truthy.
3) a function to execute if the first argument is falsy.
If the first argument evaluates to truthy, call the second argument (a function).
If it evaluates to falsy, call the third argument instead (also a function).

In statically-typed languages, the first argument will be a boolean.
In dynamically-typed languages that attribute a truth value to all expressions,
it may be of any type.*/

function _if(bool, func1, func2){
    (bool) ? func1() : func2();
}