let backgroundSound = new Audio()
backgroundSound.src = "./background.mp3"
backgroundSound.level = 0.3

backgroundSound.play()

let randomNumber = Math.floor(Math.random() * 15) + 1;

let attempts = 3;

const taskElement = document.querySelector(".task");
const attemptsElement = document.createElement("p");
attemptsElement.textContent = `អ្នកមានឱកាស ${attempts} ដង`;
taskElement.after(attemptsElement);

const retryButton = document.createElement("button");
retryButton.textContent = "ព្យាយាមម្តងទៀត";
retryButton.style.display = "none";
retryButton.addEventListener("click", () => {
  window.location.reload(); 
});
taskElement.after(retryButton);

const numberElements = document.querySelectorAll(".number");

numberElements.forEach((numberElement) => {
  numberElement.addEventListener("click", () => {
    const chosenNumber = parseInt(numberElement.textContent);
    attempts--;

    if (chosenNumber === randomNumber) {
      attemptsElement.textContent = "🥇អបអរសារទរអ្នកឈ្នះហើយ🥇";
      disableNumbers();
      showRetryButton();
      changeBackgroundColor("green");
      backgroundSound.pause();
    } else if (attempts > 0 && chosenNumber < randomNumber) {
      attemptsElement.textContent = `អ្នកនៅសល់ ${attempts} ដងទៀត`;
      markInvalidNumbers(chosenNumber, "less");
      changeBackgroundColor("orange"); 
    } else if (attempts > 0 && chosenNumber > randomNumber) {
      attemptsElement.textContent = `អ្នកនៅសល់ ${attempts} ដងទៀត`;
      markInvalidNumbers(chosenNumber, "greater");
      changeBackgroundColor("orange"); 
    } else {
      attemptsElement.textContent = `អ្នកចាញ់ហើយ,លេខដែលត្រឹមត្រូវគឺលេខ: ${randomNumber}`;
      disableNumbers();
      showRetryButton();
      changeBackgroundColor("red"); 
      backgroundSound.pause();
    }
  });
});

function disableNumbers() {
  numberElements.forEach((numberElement) => {
    numberElement.style.pointerEvents = "none";
  });
}

function showRetryButton() {
  retryButton.style.display = "block"; 
}

function markInvalidNumbers(number, condition) {
  numberElements.forEach((numberElement) => {
    const num = parseInt(numberElement.textContent);
    if (
      (condition === "less" && num <= number) ||
      (condition === "greater" && num >= number)
    ) {
      numberElement.style.pointerEvents = "none";
      numberElement.style.backgroundColor = "red";
      numberElement.innerHTML = `${num}<span style='color: black; font-size: 24px; position: absolute;'>❌</span>`;
      numberElement.style.position = "relative";
    }
  });
}

function changeBackgroundColor(color) {
  const body = document.body;
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = color;
  overlay.style.opacity = "0.5"; 
  overlay.style.zIndex = "9999"; 
  body.appendChild(overlay);

  setTimeout(() => {
    body.removeChild(overlay);
  }, 250); 
}
