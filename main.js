
let url = "https://66e7e6a5b17821a9d9da6f39.mockapi.io/login";

let blogUrl = "https://66e7e6a5b17821a9d9da6f39.mockapi.io/blogs";


let name = document.getElementById("name");
let email = document.getElementById("exampleInputEmail");
let pass = document.getElementById("exampleInputPassword");
let submit = document.getElementById("submit");

//

let newBlogBtn = document.getElementById("newBlog");

if (newBlogBtn) {
    newBlogBtn.addEventListener('click', () => {
        let blogTitle = document.getElementById('blogtitle').value;
        let blogImg = document.getElementById('blogimg').value;
        let blogContent = document.getElementById("blogcontent").value;  

        fetch(`${blogUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: blogTitle,
                image: blogImg,
                content: blogContent  
            })
        })
        .then(response =>  response.json())
        
        .then(data => {

            console.log('Blog added:', data);
            alert('Blog added successfully!');


            document.getElementById('blogtitle').value = '';
            document.getElementById('blogimg').value = '';
            document.getElementById('blogcontent').value = '';

            let modalElement = document.getElementById('exampleModal');
            let modal = bootstrap.Modal.getInstance(modalElement);
            
            modal.hide();
        })
    });
}


document.addEventListener("DOMContentLoaded", () => {
    // const blogUrl = "https://66e7e6a5b17821a9d9da6f39.mockapi.io/blogs";
    
    fetch(blogUrl)
        .then(res => res.json())
        .then(data => {
            let blogContainer = document.getElementById('blogContainer');
            
            data.forEach(blog => {
                let card = document.createElement('div');
                card.className = 'card text-center'; 

                let img = document.createElement('img');
                img.className = 'card-img-top img-fluid blogCardImage'; 
                img.src = blog.image;
                img.alt = blog.title;

                let cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                let title = document.createElement('h3');
                title.className = 'card-title';
                title.textContent = blog.title;

                cardBody.appendChild(title);

                card.appendChild(img);
                card.appendChild(cardBody);

                blogContainer.appendChild(card);
            });
        })

});





let nameContainer = document.getElementById("nameDisplayed")


// sign in
if (submit) {
    submit.addEventListener('click', (event) => {
        event.preventDefault();


        if (!ValidateName(name) || !ValidateEmail(email) || !ValidatePassword(pass)) {
            return;
        }


        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                pass: pass.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            localStorage.setItem('userName', json.name); 
            localStorage.setItem('email', json.email);   
            localStorage.setItem('pass', json.pass);    
            window.location.href = "mainPage.html";
        })
    });
}


//login 
let loginSubmit = document.getElementById("submit1");
let loginEmail = document.getElementById("exampleInputEmail1");
let loginPass = document.getElementById("exampleInputPassword1");


if (loginSubmit) {
    loginSubmit.addEventListener('click', (event) => {
        event.preventDefault();

        let emailValue = loginEmail.value;
        let passValue = loginPass.value;


        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                let check = data.find(item =>
                    item.email === emailValue && item.pass === passValue
                );
                if (check) {
                    localStorage.setItem('userName', check.name);  
                    window.location.href = "mainPage.html";
                } else {
                    alert("Login failed: Invalid email or password");
                }
            })

    });
}



document.addEventListener("DOMContentLoaded", () => {
    let userName = localStorage.getItem('userName');
    
    if (userName) {
        document.getElementById("nameDisplayed").textContent = `Hello, ${userName}`;
        // document.getElementById("infoName").textContent = `Your Registered Name : ${userName}` 
    } else {
        document.getElementById("nameDisplayed").textContent = "Hello in Bloggy!";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let userName = localStorage.getItem('userName');
    let userEmail = localStorage.getItem('email');
    let userPass = localStorage.getItem('pass');

    if (userName) {
        document.getElementById("infoName").textContent = userName;
    }

    if (userEmail) {
        document.getElementById("infoEmail").textContent = userEmail;
    }

    if (userPass) {
        document.getElementById("infoPass").textContent = userPass;
    }
});







function ValidateName(name) {
    if (name.value.length >= 5) {
        return true;
    } else {
        alert("Name must be at least 5 characters long.");
        name.focus();
        return false;
    }
}

function ValidateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(validRegex)) {
        return true;
    } else {
        alert("Invalid email address!");
        email.focus();
        return false;
    }
}

function ValidatePassword(pass) {
    if (pass.value.length >= 8) {
        return true;
    } else {
        alert("Password must be at least 8 characters long.");
        pass.focus();
        return false;
    }
}
