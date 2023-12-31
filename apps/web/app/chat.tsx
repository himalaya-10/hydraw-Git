"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Chat(){
  const {sendMessage, messages}=useSocket()
  const [message,setMessage]=useState('')
  return (
    <div className="absolute border border-[rgb(54,54,54)] bg-[rgb(31,31,32)] h-[420px] w-[300px] right-1 top-[200px] rounded-lg flex-row justify-center items-center">
      <h1 className=" text-white font-light text-center text-lg">Chat Here</h1>
      <div className="h-[80%] w-[90%] bg-[rgb(54,54,54)] m-auto mt-2 rounded-sm overflow-auto">
        {messages.map((e, index)=>
        (<div key={index} className="m-2  text-white font-light border-2 rounded-md border-black">{e}</div>
        ))}
      </div>
      <div>
        <input className="bg-[rgb(54,54,54)] rounded m-4 text-white" onChange={e=>{setMessage(e.target.value)}}placeholder=""/>
        <button className=" text-white font-light border-2 rounded-md border-[rgb(54,54,54)] w-14 hover:bg-[rgb(54,54,54)]" onClick={e=>{sendMessage(message)}}>send</button>

      </div>
    </div>
    
  );
}
