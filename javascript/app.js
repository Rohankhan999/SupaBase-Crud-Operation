import { supabaseConfig } from "./config.js";

const btn = document.getElementById('Signup');

btn.addEventListener("click", async () => {
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;
    const username = document.getElementById('name').value;


    if (!Email || !Password || !username) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }

    try {
        const { error, user } = await supabaseConfig.auth.signUp({
            email: Email,
            password: Password,
        });

        if (error) {
            console.error("Sign-up error:", error);
            Swal.fire({
                icon: "error",
                title: "Sign-up Failed",
                text: error.message,
            });
            return;
        }

        console.log("User added successfully:", user);


        Swal.fire({
            title: "Congratulations!",
            text: "You have successfully signed up!",
            icon: "success",
        }).then(() => {

            window.location.href = "login.html";
        });

    } catch (error) {
        console.error("Error occurred:", error);
        Swal.fire({
            icon: "error",
            title: "An error occurred",
            text: error.message,
        });
    }
});


