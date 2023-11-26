const signUpButton = document.getElementById("signUpButton");
const inputValue = document.getElementById("inputValue");
const inputEmail = document.getElementById("inputEmail");
const inputPassword = document.getElementById("inputPassword");
const form = document.getElementById("form");

signUpButton.addEventListener("click", function (event) {
  emailValidate();
  if (!passwordValidate()) {
    event.preventDefault();
  }

  if (!inputValue.value || !inputEmail.value || !inputPassword.value) {
    alert("Please fill out all fields!");
  } else {
    let userData = {
      username: inputValue.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };

    const allUserData = JSON.parse(localStorage.getItem("allUserData")) || [];

    const usernameExists = allUserData.some(
      (user) => user.username === inputValue.value
    );

    if (usernameExists) {
      alert("User already exists");
      nameField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signInButton.classList.remove("disable");
      signUpButton.classList.add("disable");
      form.reset();

      signInButton.addEventListener("click", function () {
        const enteredEmail = inputEmail.value;
        const enteredPassword = inputPassword.value;
        if (!inputEmail.value || !inputPassword.value) {
          alert("please, fill all form!");
        }
        if (inputEmail.value && inputPassword.value) {
          const userExists = allUserData.some(
            (user) =>
              user.email === enteredEmail && user.password === enteredPassword
          );

          if (userExists) {
            const targetUrl = "http://127.0.0.1:5500/cabinet.html";
            window.location.href = targetUrl;
          } else {
            alert("Invalid password or email");
            form.reset();
          }
        }
      });
    } else {
      allUserData.push(userData);
      localStorage.setItem("allUserData", JSON.stringify(allUserData));

      form.reset();

      const targetUrl = "http://127.0.0.1:5500/cabinet.html";
      window.location.href = targetUrl;
    }
  }
});
function emailValidate() {
  const inputedEmail = inputEmail.value;

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (inputedEmail.match(validRegex)) {
    //   alert("Valid email address!");

    //   document.form1.text1.focus();

    return true;
  } else {
    alert("Invalid email address!");

    document.form1.text1.focus();

    return false;
  }
}

function passwordValidate() {
  const inputedPassword = inputPassword.value;

  if (inputedPassword.length < 8) {
    alert("Password length should be min 8 character");
    return false;
  } else {
    return true;
  }
}
