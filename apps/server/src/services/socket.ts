import {Server} from 'socket.io';
import Redis from 'ioredis';

const pub = new Redis({
    host:"127.0.0.1",
    port:6379,
    // username:"hidraw",
    // password:"hidraw"
});
const sub = new Redis({
    host:"127.0.0.1",
    port:6379,
    // username:"hidraw",
    // password:"hidraw"
});

class SocketService{
    private _io:Server

    constructor(){
        console.log("Init Socket Service...")
        this._io=new Server({
            cors:{
                allowedHeaders:['*'],
                origin: '*'
            }
        });
        sub.subscribe("MESSAGES");
        sub.subscribe("DRAWING")
    
    }

    public initListeners(){
        const io=this._io;
        console.log("Init Socket Listeners...")
        io.on("connect",(socket)=>{
            console.log(`New socket connected`, socket.id);
            socket.on('event:message', async ({message}:{message: string})=>{
                console.log("New meassage Rec.", message);

                await pub.publish('MESSAGES', JSON.stringify({message}))

            })
            socket.on('event:draw', async(drawingData) => {
                // Handle drawingData here
                console.log('Received drawing data:', drawingData);
                await pub.publish('DRAWING', JSON.stringify({drawingData}))
            });

        
        })
        sub.on('message',(channel, message)=>{
            if(channel==="MESSAGES"){
                console.log("New msg from redis", message);
                io.emit("message", message);
            }
            if(channel==="DRAWING"){
                console.log("New msg from redis", message);
                io.emit("drawing", message);
            }
        })

    }

    get io(){
        return this._io;
    }
}

export default SocketService;