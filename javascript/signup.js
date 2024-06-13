const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-text");

form.onsubmit = (e) => {
    e.preventDefault(); // preventing form from submitting
}

/**
 * Handle the click event of the continue button.
 * Sends an AJAX POST request to the signup.php file with form data.
 * If the request is successful and the response is 'success',
 * redirects the user to the 'users.php' page.
 * Otherwise, displays the response text in the error container.
 */
continueBtn.onclick = () => {
    // starting Ajax
    let xhr = new XMLHttpRequest(); // creating XML object

    // Opening an asynchronous POST request to the signup.php file
    xhr.open("POST", "php/signup.php");

    // Handling the response of the request
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;

                // If the response is 'success', redirect to the 'users.php' page
                if (data === "success") {
                    location.href = "users.php";
                } 
                // Otherwise, display the response text in the error container
                else {
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    }

    let formData = new FormData(form)   // creating new formData object
    xhr.send(formData); // sending the form data
}
