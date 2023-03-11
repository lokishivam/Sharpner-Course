//add the script tag at the end of the the body section
//So first html elements will be loaded, for user to see something instead of blank

function formSubmitHandler(event) {
  event.preventDefault();
  console.log(event.target.name.value);
  console.log(event.target.email.value);
  console.log(event.target.phone.value);
  console.log(event.target.date.value);
  console.log(event.target.time.value);
}
