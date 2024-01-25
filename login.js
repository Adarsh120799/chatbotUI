$(document).ready(function () {
    $("#loginBtn").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();

        // Simulate API call (replace with actual API endpoint)
        $.ajax({
            url: "https://api.example.com/login",
            method: "POST",
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                if (response.success) {
                    // Redirect to index.html on success (replace with your actual page)
                    window.location.href = "index.html";
                } else {
                    $("#error-message").text("Invalid credentials. Please try again.");
                }
            },
            error: function () {
                $("#error-message").text("An error occurred during the login process. Please try again.");
            }
        });
    });
});
