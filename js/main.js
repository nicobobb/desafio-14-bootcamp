const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const dniRadio = document.getElementById("dni");
const cuilRadio = document.getElementById("cuil");
const documentIdInput = document.getElementById("documentId");
const addressInput = document.getElementById("address");
const ageInput = document.getElementById("age");
const zipCodeInput = document.getElementById("zipCode");
const emailInput = document.getElementById("email");
const photoInput = document.getElementById("photo");
const btnReset = document.getElementById("btnReset");
const errorSection = document.getElementById("errorSection");

const nameError = document.getElementById("nameError");
const lastNameError = document.getElementById("lastNameError");
const dniError = document.getElementById("dniError");
const cuilError = document.getElementById("cuilError");
const documentIdError = document.getElementById("documentIdError");
const addressError = document.getElementById("addressError");
const ageError = document.getElementById("ageError");
const zipCodeError = document.getElementById("zipCodeError");
const emailError = document.getElementById("emailError");
const photoError = document.getElementById("photoError");

const updateErrorSection = () => {
    errorSection.innerHTML = "";

    const cantidadErrores = Object.values(errors).filter(
        (value) => value !== ""
    ).length;

    const h3Element = document.createElement("h3");
    cantidadErrores === 1
        ? (h3Element.textContent = `Se encontró ${cantidadErrores} error`)
        : (h3Element.textContent = `Se encontraron ${cantidadErrores} errores`);

    errorSection.appendChild(h3Element);

    const ulElement = document.createElement("ul");

    for (const key in errors) {
        if (errors[key] !== "") {
            const liElement = document.createElement("li");
            liElement.textContent = `${errors[key]}`;
            ulElement.appendChild(liElement);
        }
    }

    errorSection.appendChild(ulElement);
};

const errors = {
    name: "",
    lastName: "",
    document: "",
    address: "",
    age: "",
    zipCode: "",
    email: "",
    photo: "",
};

form.addEventListener("input", () => {
    // Restablece los errores en cada iteración
    for (const key in errors) {
        errors[key] = "";
    }

    // Nombre
    if (validateName(nameInput.value) === true) {
        nameInput.setAttribute("aria-invalid", false);
        nameError.innerText = "";
    } else {
        nameInput.setAttribute("aria-invalid", true);
        nameError.innerText = "Nombre inválido";
        errors.name = "Nombre inválido";
    }

    // Apellido
    if (validateLastName(lastNameInput.value) === true) {
        lastNameInput.setAttribute("aria-invalid", false);
        lastNameError.innerText = "";
    } else {
        lastNameInput.setAttribute("aria-invalid", true);
        lastNameError.innerText = "Apellido inválido";
        errors.lastName = "Apellido inválido";
    }

    // Valida tipo de documento
    if (dniRadio.checked || cuilRadio.checked) {
        documentIdInput.setAttribute("aria-invalid", false);
        documentIdError.innerText = "";
    } else {
        documentIdInput.setAttribute("aria-invalid", true);
        documentIdError.innerText = "Seleccione un tipo de documento";
        errors.document = "Seleccione un tipo de documento";
    }

    // Valida el documento
    const selectedDocumentType = dniRadio.checked ? "DNI" : "CUIL";
    const documentNumber = documentIdInput.value.trim();

    if (selectedDocumentType === "DNI") {
        if (validateDNI(documentNumber)) {
            documentIdInput.setAttribute("aria-invalid", false);
            documentIdError.innerText = "";
        } else {
            documentIdInput.setAttribute("aria-invalid", true);
            documentIdError.innerText = "Formato inválido del Documento";
            errors.document = "Formato inválido del Documento";
        }
    } else if (selectedDocumentType === "CUIL") {
        if (validateCUIL(documentNumber)) {
            documentIdInput.setAttribute("aria-invalid", false);
            documentIdError.innerText = "";
        } else {
            documentIdInput.setAttribute("aria-invalid", true);
            documentIdError.innerText = "Formato inválido del Documento";
            errors.document = "Formato inválido del Documento";
        }
    }

    if (addressInput.value.trim() !== "") {
        if (validateAddress(addressInput.value) === true) {
            // Dirección válida
            addressInput.setAttribute("aria-invalid", false);
            addressError.innerText = "";
        } else {
            // Dirección inválida
            addressInput.setAttribute("aria-invalid", true);
            addressError.innerText = "Dirección inválida";
            errors.address = "Dirección inválida";
        }
    } else {
        // El campo de dirección está vacío, no se realiza la validación
        addressError.innerText = "";
        addressInput.setAttribute("aria-invalid", false);
    }

    // Valida Edad
    const age = ageInput.value.trim();
    if (validateAge(age)) {
        ageInput.setAttribute("aria-invalid", false);
        ageError.innerText = "";
    } else {
        ageInput.setAttribute("aria-invalid", true);
        ageError.innerText = "Edad inválida";
        errors.age = "Edad inválida";
    }

    // Valida Código Postal
    const zipCode = zipCodeInput.value.trim();

    if (validateZipCode(zipCode)) {
        zipCodeInput.setAttribute("aria-invalid", false);
        zipCodeError.innerText = "";
    } else {
        zipCodeInput.setAttribute("aria-invalid", true);
        zipCodeError.innerText = "Código postal inválido";
        errors.zipCode = "Código postal inválido";
    }

    // Valida Correo Electrónico
    const email = emailInput.value.trim();
    if (validateEmail(email)) {
        emailInput.setAttribute("aria-invalid", false);
        emailError.innerText = "";
    } else {
        emailInput.setAttribute("aria-invalid", true);
        emailError.innerText = "Correo electrónico inválido";
        errors.email = "Correo electrónico inválido";
    }

    // Valida Foto
    const photo = photoInput.value.trim();
    if (photo === "") {
        photoInput.setAttribute("aria-invalid", true);
        photoError.innerText = "Seleccione una foto";
        errors.photo = "Seleccione una foto";
    } else {
        photoInput.setAttribute("aria-invalid", false);
        photoError.innerText = "";
    }

    updateErrorSection();
});

form.addEventListener("submit", (event) => {
    const hasValue = Object.values(errors).some((value) => value !== "");

    if (hasValue) {
        event.preventDefault();
        const errorMessage = Object.values(errors)
            .filter((value) => value !== "")
            .join(", ");
        displayToast(
            "Faltan completar algunos campos: " + errorMessage,
            "Revisa los campos marcados"
        );
    } else {
        event.preventDefault();
        displayToast("Todo salió bien ;) ", "Estamos en contacto");
        form.reset();
    }
});

btnReset.addEventListener("click", () => {
    form.reset();

    // Vacío los mensajes de error
    for (const key in errors) {
        errors[key] = "";
    }

    const errorElements = [
        nameError,
        lastNameError,
        dniError,
        cuilError,
        documentIdError,
        addressError,
        ageError,
        zipCodeError,
        emailError,
        photoError,
    ];

    errorElements.forEach((errorElement) => {
        errorElement.innerText = "";
    });
    updateErrorSection();
});
