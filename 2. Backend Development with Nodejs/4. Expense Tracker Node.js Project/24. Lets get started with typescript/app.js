//you get a general HTMLElemt as type because you are getting element using id.
var num1Element = document.getElementById("number1"); //type-casting
var num2Element = document.getElementById("number2");
var buttonElement = document.querySelector("button"); //the HTMLButtonElement can be null, if no button exist so !
// let num3 = 10; //you dont need to specify the type here, ts will detect it.
// num3 = 'ram'; //error shown by ts
var numArray = [];
var textArray = [];
function addition(num1, num2) {
    //uninon
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    if (typeof num1 === "string" && typeof num2 === "string") {
        return num1 + num2;
    }
}
function printResult(resultObj) {
    //way to specify the type of the object
    console.log(resultObj.val);
}
buttonElement.addEventListener("click", function () {
    var num1 = num1Element.value;
    var num2 = num2Element.value; //the value will be string
    var result = addition(+num1, +num2);
    var stringRes = addition(num1, num2); //string inputs
    //const stringBool = addition(true, false);
    console.log(result);
    numArray.push(result);
    textArray.push(stringRes);
    console.log(numArray);
    printResult({ val: 23, timestamp: new Date() });
});
//console.log(addition("1", "5")); error
