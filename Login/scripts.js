let button=document.getElementsByTagName("button")[0];
button.addEventListener("click",(event)=>{
    event.preventDefault();
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    let allUsers=JSON.parse(localStorage.getItem("users"));
    let flag=checkIfUserExsist(email,password,allUsers);
    if(flag){
        alert("Email or password did not match")
    }else{
        //redirect to shopping
        window.location.pathname="../Shop/index.html"
    }
})


function checkIfUserExsist(email,password,allUsers){
    let user=allUsers.filter((element)=>{
        if(element.email==email.value && element.password==password.value){
            sessionStorage.setItem("loggedInUser",JSON.stringify(element))
            localStorage.setItem("currentUser",`${element.email}`)
            return true
        }
    })
    return false;
}   



function onload(){
    if(localStorage.getItem("currentUser")){
        window.location.pathname="../Shop/index.html"
    }
}
onload();