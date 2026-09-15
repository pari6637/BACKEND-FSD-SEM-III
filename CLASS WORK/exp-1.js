const EventEmitter=require('events');
class MyEvent extends EventEmitter{

}
const events=new EventEmitter();
events.on("greets",()=>{
    
    console.log(`hello cse24 my name is ${name}`);;//template liberals-${var}
})
events.on("exit",(name)=>{
})
events.emit("greet","pari");
events.emit("exit");

