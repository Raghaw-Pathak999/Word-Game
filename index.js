const startButton = document.getElementById('start_button'); // Get the start button element

const coverScreen = document.querySelector('.cover_screen'); // Get the cover screen element

const result = document.getElementById('result'); // Get the result element

const conatainer = document.querySelector('.conatainer'); // Get the container element (note: there is a typo 'conatainer' should be 'container')

const wordDisplay = document.querySelector('.word_display'); // Get the word display element

const inputContainer = document.querySelector('.input_container'); // Get the input container element

const vaildWords = document.querySelector('.vaild_words'); // Get the valid words element (note: there is a typo 'vaild' should be 'valid')

const errMessage = document.getElementById('err_message'); // Get the error message element

const submitButton = document.getElementById('submit_button'); // Get the submit button element

let wordsObj = { // Object containing words and their valid substrings
    BOAT: [
        "TO", "BAT", "TAB", "BOAT"
    ],

    CARD: [
        "CARD", "ARC", "CAR"
    ],

    HOUSE: [
        "HOUSE", "HOSE", "SHOE", "USE"
    ],

    TABLE: [
        "TABLE", "BAT", "TEA", "LATE" // Note: 'TEA, LATE' should be split into two strings "TEA", "LATE"
    ],

    COMPUTER: [
        "COMPUTER", "CUTE", "CUP", "COME", "PUT"
    ]
};

let randomWord = "", // Variable for storing the randomly selected word
    currentWord = "", // Variable for storing the current word
    inputWord = ""; // Variable for storing the input word

let foundWords = [] // Array for storing the found words
let count = 0 // Counter for the number of found words

const randomValue = (arr, obj = false) => { // Function to get a random value from an array or object
    if (obj) {
        let keysArr = Object.keys(arr); // Get the keys of the object as an array
        return keysArr[Math.floor(Math.random() * keysArr.length)] // Return a random key
    } else {
        return arr[Math.floor(Math.random() * arr.length)] // Return a random element from the array
    }
};

submitButton.addEventListener("click", async () => { // Event listener for the submit button click
    errMessage.innerText = ""; // Clear error message
    inputContainer.innerText = ""; // Clear input container

    let expectedOutputs = wordsObj[currentWord]; // Get the valid words for the current word
    let expectedSection = document.querySelectorAll(".expected-section"); // Get all expected sections

    if (expectedOutputs.includes(inputWord) && !foundWords.includes(inputWord)) { // Check if input word is valid and not already found
        count += 1; // Increment count
        foundWords.push(inputWord); // Add input word to found words
        let index = expectedOutputs.indexOf(inputWord); // Get the index of the input word in expected outputs
        expectedSection[index].innerHTML = inputWord; // Display the input word in the corresponding section
    } else {
        if (foundWords.includes(inputWord)) { // Check if input word is already found
            errMessage.innerText = "Already Entered"; // Set error message for already entered word
        } else {
            errMessage.innerText = "Invalid-Word"; // Set error message for invalid word
        }
    }

    if (count == expectedOutputs.length) { // Check if all valid words are found
        coverScreen.classList.remove("hide"); // Show cover screen
        conatainer.classList.add("hide"); // Hide container (note: there is a typo 'conatainer' should be 'container')
        result.classList.remove("hide"); // Show result
        startButton.innerText = "Restart"; // Change start button text to 'Restart'
        submitButton.disabled = true; // Disable submit button
    }

    let letters = document.querySelectorAll(".letters"); // Get all letter buttons

    letters.forEach((button) => { // Enable and remove active class from all letter buttons
        button.classList.remove("active");
        button.disabled = false;
    });

    inputWord = ""; // Clear input word
});

const selectLetter = (e) => { // Function to handle letter button click
    e.preventDefault(); // Prevent default behavior
    errMessage.innerText = ""; // Clear error message
    inputWord += e.target.textContent; // Append letter to input word (change innerText to textContent)
    e.target.classList.add("active"); // Add active class to clicked letter button
    e.target.disabled = true; // Disable clicked letter button
};

const displayDashes = () => { // Function to display dashes for valid words
    let expectedOutputs = wordsObj[currentWord]; // Get the valid words for the current word
    expectedOutputs.forEach((element) => { // For each valid word, replace each character with a dash
        let displayItem = element.replace(/./g, `<span class="dashes">_</span>`);
        vaildWords.innerHTML += `<div class="expected-section">${displayItem}</div>`; // Display the dashes (change div/ to </div>)
    });
};

startButton.addEventListener('click', () => { // Event listener for the start button click
    conatainer.classList.remove("hide"); // Show container (note: there is a typo 'conatainer' should be 'container')
    coverScreen.classList.add('hide'); // Hide cover screen
    errMessage.innerText = ""; // Clear error message

    inputContainer.innerText = ""; // Clear input container
    wordDisplay.innerHTML = ""; // Clear word display
    inputWord = "" // Clear input word
    count = 0 // Reset count
    submitButton.disabled = false; // Enable submit button
    vaildWords.innerHTML = ""; // Clear valid words display

    currentWord = randomValue(wordsObj, true); // Get a random word from the object

    randomWord = currentWord.split("").sort(() => 0.5 - Math.random()); // Shuffle the letters of the current word

    displayDashes(); // Display dashes for valid words

    randomWord.forEach((letter) => { // For each letter, create a letter button and add to word display
        wordDisplay.innerHTML += `<button class="letters" onclick="selectLetter(event)">${letter}</button>`
    });

});

window.onload = () => { // Event listener for window load
    coverScreen.classList.remove("hide"); // Show cover screen
    conatainer.classList.add("hide"); // Hide container (note: there is a typo 'conatainer' should be 'container')
    result.classList.add("hide"); // Hide result
}
