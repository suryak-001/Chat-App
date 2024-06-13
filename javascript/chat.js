const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e) => {
    e.preventDefault(); // preventing form from submitting
}

sendBtn.onclick = () => {
    // starting Ajax
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/insert-chat.php");
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                inputField.value = "";  // clearing the input field once the message is sent
                scrollToBottom();
            }
        }
    }
    // sending the form data to php through ajax
    let formData = new FormData(form)   // creating new formData object
    xhr.send(formData); // sending the form data
}

chatBox.onmouseenter = () => {
    chatBox.classList.add("active");
}
chatBox.onmouseleave = () => {
    chatBox.classList.remove("active");
}

setInterval(() => {
    // starting Ajax
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/get-chat.php");
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                chatBox.innerHTML = data;
                if (!chatBox.classList.contains("active")) {
                    scrollToBottom();
                }
            }
        }
    }
    // sending the form data to php through ajax
    let formData = new FormData(form)   // creating new formData object
    xhr.send(formData); // sending the form data

}, 500);

function scrollToBottom() {
    if (chatBox) {
        // Using setTimeout to ensure that the DOM has updated with new messages
        setTimeout(() => {
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 100);
    }
}