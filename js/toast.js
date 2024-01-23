const toast = document.getElementById("toast");

function displayToast(title, description) {
    const toastTitle = document.createElement("h4");
    toastTitle.className = "toast__title";
    toastTitle.innerText = title;

    const toastDescription = document.createElement("p");
    toastDescription.className = "toast__description";
    toastDescription.innerText = description;

    const toastButton = document.createElement("button");
    toastButton.className = "btn__toast--acept";
    toastButton.innerText = "Aceptar";
    toastButton.onclick = () => {
        toast.classList.remove("fade-in");
    };

    toast.innerHTML = "";
    toast.appendChild(toastTitle);
    toast.appendChild(toastDescription);
    toast.appendChild(toastButton);

    if (toast.classList.contains("fade-in")) {
        toast.classList.remove("fade-in");
    } else {
        toast.classList.add("fade-in");

        setTimeout(() => {
            toast.classList.remove("fade-in");
        }, 4000);
    }
}
