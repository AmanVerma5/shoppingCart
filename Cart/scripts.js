function displayName(){
    let name=document.getElementById("name")
    let currentUser=localStorage.getItem("currentUser")
    let allUsers=JSON.parse(localStorage.getItem("users"));
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].email==currentUser){
            name.innerText=`${allUsers[i].firstName} ${allUsers[i].lastName}`;
            break;
        }
    }
}
displayName();