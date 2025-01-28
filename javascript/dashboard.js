import { supabaseConfig } from "./config.js";


const Username = document.getElementById('name');
const description = document.getElementsByTagName('textarea')[0];
const button = document.getElementById('btn');
const main = document.getElementById('content');
// insert method
button.addEventListener('click', async () => {
    try {
        // console.log(Userpost.value);
        const { error } = await supabaseConfig
            .from('data')
            .insert({ name: Username.value,  description: description.value});

        if (error) {
            console.log("error-->", error.message);
        } else {
            console.log("data add successfully!");
        }
        Username.value="";
        description.value="";
    }
    catch (error) {
        console.log("Error Aaya hai",error);

    }
});

// Fetch Method
const fetchData = (async () => {
    try {
        const { data, error } = await supabaseConfig
            .from('data')   
            .select()

        if (error) {
            console.log("error -->", error.message);
        }
        else {
            console.log("data add successfully!");
            console.log(data);
            data.forEach(post => {
                main.innerHTML += `<div class="subpost">
                <h3>${post.name}</h3>
                <p>${post.description}</p>
                <div id=buttonarea>
                <button id="delete">Delete</button>
                <button id="Update">Update</button>
                </div>
                </div>`;
            });
        }
    }
    catch (error) {
        console.log(error);

    }
});
fetchData();

// Delete Method




