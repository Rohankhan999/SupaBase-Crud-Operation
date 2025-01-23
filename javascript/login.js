import { supabaseConfig } from "./config.js";

const btn = document.getElementById('login');

btn.addEventListener("click", async () => {
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;

    // Input validation
    if (!Email || !Password) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Email and Password fields cannot be empty.",
        });
        return;
    }

    try {
        const { data, error } = await supabaseConfig.auth.signInWithPassword({
            email: Email,
            password: Password,
        });

        if (error) {
            console.error("Login error:", error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Invalid email or password.",
            });
            return;
        }

        console.log("Login successful:", data);

        // Success message and redirect after login
        Swal.fire({
            title: "Welcome Back!",
            text: "Login successful. Redirecting to your dashboard...",
            icon: "success",
        }).then(() => {
            window.location.href = "dashboard.html";  // Redirect to your dashboard or another page
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        Swal.fire({
            icon: "error",
            title: "An error occurred",
            text: "Something went wrong. Please try again later.",
        });
    }
});
