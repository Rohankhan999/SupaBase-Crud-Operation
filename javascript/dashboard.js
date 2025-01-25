import { supabaseConfig } from "./config.js";


const Userpost = document.getElementById('post');
const button = document.getElementById('btn');
button.addEventListener('click', async () => {
    try {
        // console.log(Userpost.value);
        const { error } = await supabaseConfig
            .from('data')
            .insert({  post:Userpost.value , name: "user" });
            
        if (error) {
            console.log("error-->", error.message);
        } else {
            console.log("data add successfully!");
        }
        Userpost.value = "";
    }
    catch (err) {
        console.log(err);

    }
});


