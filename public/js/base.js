const greetSpanElement = document.getElementById("greet");
function showGreeting() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting;

  if (hours < 12) {
    greeting = "Hello Friend, Good morning!";
  } else if (hours < 18) {
    greeting = "Hello Friend, Good afternoon!";
  } else {
    greeting = "Hello Friend, Good evening!";
  }

  greetSpanElement.textContent = greeting;
}
showGreeting();
