const form = document.querySelector(".login form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-text");

form.onsubmit = (e) => {
    e.preventDefault(); // preventing form from submitting
}

continueBtn.onclick = () => {
    // starting Ajax
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/login.php");
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                console.log(data);
                if (data === "success") {
                    location.href = "users.php";
                } else {
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    }
    // sending the form data to php through ajax
    let formData = new FormData(form)   // creating new formData object
    xhr.send(formData); // sending the form data
}