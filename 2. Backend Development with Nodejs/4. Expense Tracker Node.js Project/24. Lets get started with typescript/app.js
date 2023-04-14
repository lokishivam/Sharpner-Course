"use strict";
//you get a general HTMLElemt as type because you are getting element using id.
const num1Element = document.getElementById("number1"); //type-casting
const num2Element = document.getElementById("number2");
const buttonElement = document.querySelector("button"); //the HTMLButtonElement can be null, if no button exist so !
// let num3 = 10; //you dont need to specify the type here, ts will detect it.
// num3 = 'ram'; //error shown by ts
const numArray = [];
const textArray = [];
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
buttonElement.addEventListener("click", () => {
    let num1 = num1Element.value;
    let num2 = num2Element.value; //the value will be string
    const result = addition(+num1, +num2);
    const stringRes = addition(num1, num2); //string inputs
    //const stringBool = addition(true, false);
    console.log(result);
    numArray.push(result);
    textArray.push(stringRes);
    console.log(numArray);
    printResult({ val: 23, timestamp: new Date() });
});
//console.log(addition("1", "5")); error
