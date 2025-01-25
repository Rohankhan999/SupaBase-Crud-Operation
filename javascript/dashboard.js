import { supabaseConfig } from "./config.js";
var Username = prompt("Enter your Name!");

const Userpost = document.getElementById('post');
const button = document.getElementById('btn');
// insert method
button.addEventListener('click', async () => {
    try {
        // console.log(Userpost.value);
        const { error } = await supabaseConfig
            .from('data')
            .insert({ post: Userpost.value, name: Username });

        if (error) {
            console.log("error-->", error.message);
        } else {
            console.log("data add successfully!");
        }
    }
    catch (err) {
        console.log(err);

    }
});


// const { error } = await supabase
//   .from('countries')
//   .update({ name: 'Australia' })
//   .eq('id', 1)


