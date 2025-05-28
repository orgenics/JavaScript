<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Check Positive or Negative</title>
</head>
<body>
  <h2>Check if a Number is Positive or Negative</h2>

  <input type="number" id="numberInput" placeholder="Enter a number">
  <button onclick="checkNumber()">Check</button>

  <p id="result"></p>

  <script>
    function checkNumber() {
      const num = parseFloat(document.getElementById("numberInput").value);
      const result = document.getElementById("result");

      if (isNaN(num)) {
        result.textContent = "Please enter a valid number.";
      } else if (num > 0) {
        result.textContent = "The number is positive.";
      } else if (num < 0) {
        result.textContent = "The number is negative.";
      } else {
        result.textContent = "The number is zero.";
      }
    }
  </script>
</body>
</html>
