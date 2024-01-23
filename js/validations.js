const validateName = (name) => {
    const regex = /^([a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{1}[a-záéíóúüñÁÉÍÓÚÜÑ]{2,9})?$/;
    return regex.test(name);
};

const validateLastName = (apellido) => {
    const regex = /^([a-zA-ZáéíóúüñÁÉÍÓÚÜÑ']{2,20})?$/;
    return regex.test(apellido);
};

const validateAddress = (address) => {
    const regex =
        /^[\w\dáéíóúüñÁÉÍÓÚÜÑàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛçÇ,.\-\s'"/°()]{10,200}$/;
    return regex.test(address);
};

const validateDNI = (dni) => {
    const regex = /^(\d{1,2}\.\d{3}\.\d{3}|\d{3}\.\d{3}\.\d{2}|\d{7,8})$/;
    return regex.test(dni);
};

const validateCUIL = (cuil) => {
    const regex = /^(\d{2}-\d{8}-\d{1}|\d{11})$/;
    return regex.test(cuil);
};

const validateAge = (age) => {
    if (age === "" || (age >= 0 && age <= 100)) {
        return true;
    } else return false;
};

const validateZipCode = (zipCode) => {
    const regex = /^\d{4}$/;
    if (zipCode === "" || regex.test(zipCode)) {
        return true;
    } else return false;
};

const validateEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || regexEmail.test(email)) {
        return true;
    } else {
        return false;
    }
};
