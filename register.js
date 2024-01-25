$(document).ready(function () {
    $("#submitBtn").click(function () {
        // Validate form fields
        if (!validateForm()) {
            return;
        }

        // Prepare registration data
        var registrationData = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            state: $("#state").val(),
            city: $("#city").val(),
            pincode: $("#pincode").val(),
            password: $("#password").val(),
            confirmPassword: $("#confirmPassword").val()
        };

        // Simulate API call (replace with actual API endpoint)
        $.ajax({
            url: "https://api.example.com/register",
            method: "POST",
            data: registrationData,
            success: function (response) {
                if (response.success) {
                    $("#error-message").text("Registration successful!");
                } else {
                    $("#error-message").text("Registration failed. Please try again.");
                }
            },
            error: function () {
                $("#error-message").text("An error occurred during the registration process. Please try again.");
            }
        });
    });
});

function validateForm() {
    var isValid = true;

    // Reset previous error messages
    $("#error-message").text("");

    // Validate password strength
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (password.length < 6) {
        $("#error-message").text("Password must be at least 6 characters long.");
        isValid = false;
    } else if (password !== confirmPassword) {
        $("#error-message").text("Passwords do not match.");
        isValid = false;
    }

    // Validate other required fields
    $("form input[required]").each(function () {
        if ($(this).val() === "") {
            $("#error-message").text("All fields are required.");
            isValid = false;
            return false; // Exit the loop early
        }
    });

    return isValid;
}
