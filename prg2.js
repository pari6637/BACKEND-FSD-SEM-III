//addEventListener-,on()
//dispatchEvent-,emit()
const EventEmitter=require('events');
const emitter=new EventEmitter();
emitter.on("click",()=>{
    console.log("Click event triggered");
    console.log(`hello cse 24 ${name}`)
});
emitter.on("mouseover",()=>{
    console.log("Mouseover event triggered");
});
emitter.emit('click');
emitter.emit('mouseover');

