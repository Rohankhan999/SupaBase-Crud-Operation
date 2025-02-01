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
            .insert({ name: Username.value, description: description.value });

        if (error) {
            console.log("error-->", error.message);
        } else {
            console.log("data add successfully!");
        }
        Username.value = "";
        description.value = "";
    }
    catch (error) {
        console.log("Error Aaya hai-->", error);

    }
});



// Delete Method
const DeleteData = (async (postId) => {
    try {
        const response = await supabaseConfig
            .from('data')
            .delete()
            .eq('id', postId)

        if (error) {
            console.log("error -->", error.message);
        }
        else {
            console.log("data add successfully!");
            console.log(response);
        }
    }
    catch (error) {
        console.log(error);

    }
});


// Update Method
const UpdateData = (async (postId) => {
    let newTitle = prompt("add new title");
    let newDescription = prompt("add new Description");
  
    try {
        const { error } = await supabaseConfig
        .from('data')
        .update({name: newTitle, description: newDescription}) 
        .eq('id', postId)      

        if (error) {
            console.log("error -->", error.message);
        }
        else {
            console.log("data add successfully!");
            console.log(data);
            fetchData();
        }
    }
    catch (error) {
        console.log(error);

    }
});


// Event Handlers
const eventlistner = () => {
let UpdateButtons = document.querySelectorAll('#Update');
let DeleteButtons = document.querySelectorAll('#delete');
UpdateButtons.forEach((Update) =>{
    Update.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        UpdateData(id);
    });

    DeleteButtons.forEach((del) =>{
        del.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            DeleteData(id);
        });
    
});
})
};



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
            main.innerHTML = ""; 
            data.forEach(post => {
                main.innerHTML += `<div class="subpost">
                <h3>${post.name}</h3>
                <p>${post.description}</p>
                <div id=buttonarea>
                <button id="delete" data-id="${post.id}">Delete</button>
                <button id="Update" data-id="${post.id}">Update</button>
                </div>
                </div>`;
            });
            eventlistner();
        }
    }
    
    catch (error) {
        console.log(error);

    }
});

const realTimeData = () => {
    supabaseConfig
      .channel("realtime_posts") //unique name
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "data" },
        (payload) => {
          console.log("Change received!", payload);
          fetchData();
        }
      )
      .subscribe();
  };
fetchData();
realTimeData();
