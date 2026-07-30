//promises for asynchronous
//js single threaded programming language

let msg = true;

const promiseOne = new Promise((resolve, reject) => {

    if (!msg == true) {
        console.log("message using promises failed");
        reject("Error");
    } else {
        console.log("error.........");

        setTimeout(() => {
            resolve("Promise resolved successfully");
        }, 2000);
    }

});

promiseOne.then((result) => {
    console.log(result);
});
//Asynch/Await
async function test(){
    console.log("1");

}
test();
console.log()

const login = new Promise((resolve, reject) => {
    let username = "Pari";
    let password = "12345";

    let enteredUsername = "Pari";
    let enteredPassword = "12345";

    if (enteredUsername === username && enteredPassword === password) {
        resolve("Username and Password are correct!");
    } else {
        reject("ERROR: Invalid Username or Password!");
    }
});

login
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
   
async function test() {
    console.log("message1");
    const response=await fetch("./student.json");
    console.log(response.status);
    const stdn=await response.json();
    return stdn;
    console.log("Message 3");
    
}

test().then((res)=>{
    console.log(res);
}).catch((err)=>{

})
console.log("message4");
