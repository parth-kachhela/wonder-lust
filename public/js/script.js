// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

let tax = document.getElementById("flexSwitchCheckDefault");
tax.addEventListener("click", (event) => {
  let tax_info = document.getElementsByClassName("tax");
  for (info of tax_info) {
    if (event.target.checked) {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
    // console.log(event.target.checked);
  }
});
