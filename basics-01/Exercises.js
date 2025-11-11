//FreeCodeCamp ifElse
/*
Rewrite if..else using multiple ternary operators '?'.

let message;
if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
 */

let message;
let login = "Employee";

message = (login == "Employee") ? "Hello" :
    (login == "Director") ? "Greetings" :
        (login == '') ? "No login" : '';

console.log(message);

