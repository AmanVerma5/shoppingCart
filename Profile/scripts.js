let inputs=document.querySelectorAll('#container input')

let currentUser=localStorage.getItem('currentUser');
let allUsers=JSON.parse(localStorage.getItem('users'));
let user;
let position;
for(let i=0;i<allUsers.length;i++){
    if(allUsers[i].email==currentUser){
        user=allUsers[i];
        position=i;
        break;
    }
}

inputs[0].value=user.firstName;
inputs[1].value=user.lastName;

const buttons=document.getElementsByTagName('button');
buttons[0].addEventListener("click",()=>{
    user.firstName=inputs[0].value
    user.lastName=inputs[1].value
    allUsers[position]=user;
    console.log(allUsers)
    localStorage.setItem('users',JSON.stringify(allUsers))
})

buttons[1].addEventListener("click",()=>{
    if(inputs[2].value!==user.password){
        inputs[2].value=''
        alert("Your old password didnot match")
    }else{
        console.log("a")
        if(inputs[3].value==''){
            alert("New password cannot be empty")
        }else if(inputs[3].value!==inputs[4].value){
            inputs[3].value='';
            inputs[4].value='';
            alert("Passwords do not match")
        }else{
            allUsers[position].password=inputs[3].value;
            localStorage.setItem('users',JSON.stringify(allUsers))
            inputs[3].value='';
            inputs[4].value='';
            inputs[2].value=''
        }
    }
})

buttons[2].addEventListener('click',()=>{
    localStorage.removeItem('currentUser');
    window.location.pathname="../index.html"
})