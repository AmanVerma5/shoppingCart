
const button=document.getElementsByTagName("button")[0];
button.addEventListener("click",(event)=>{
    event.preventDefault();
    const inputs=document.getElementsByTagName("input");
    const fname=inputs.firstName.value;
    const lname=inputs.lastName.value;
    const email=inputs.email.value;
    const password=inputs.password.value;
    const confirmPassword=inputs.confirmPassword.value;

    if(fname.trim()==''||lname.trim()==''||email.trim()==''||password.trim()==''||confirmPassword.trim()==''){
        alert("all fields are required")
    }else{
        if(password.trim()!==confirmPassword.trim()){
            alert("passwords do not match");
            password.value='';
            confirmPassword.value='';
        }else{
            if(localStorage.getItem("users")){
                if(checkIfUserExists(email)){
                    alert("User already exsists")
                }else{
                    saveUser(fname,lname,email,password)
                }
            }else{
                saveUser(fname,lname,email,password)
            }
        }
    }
})


function checkIfUserExists(email){
    let users=JSON.parse(localStorage.getItem("users"));
    console.log(users);
    let obj= users.find((user)=>{
        return user.email===email;
    });
    if(obj) return true;
    return false;
}

function saveUser(fname,lname,email,password){
    let newUser={
        firstName:fname,
        lastName:lname,
        email:email,
        password:password
    }
    let users=JSON.parse(localStorage.getItem("users"))||[];
    users.push(newUser);
    localStorage.setItem("users",JSON.stringify(users))
    alert('Sign up successfull');
    window.location.href="../Login/index.html";
}