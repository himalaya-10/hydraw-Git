import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketProvider';

export default function Canvas() {

    const{ canvasRef, sendDraw }=useSocket();


    return (
        <div>
            <div id='canva' className='canva boardstyle border border-[rgb(54,54,54)] bg-black h-[730px] w-[930px] rounded-sm absolute top-16 left-[200px] overflow-hidden z-10'>
            {/* <div className="text-item drag" style={{ position: 'absolute', top: '0px', left: '0px', backgroundColor: 'rgba(20, 205, 25, 0)', zIndex: '0', width: '100%' }}>
            <p className='text-item text-white'>Hello World</p>
        </div> */}
        
                <canvas ref={canvasRef} height='730px' width='930px' id='canvas' onMouseMove={sendDraw}>
                </canvas>
            
            </div>
        </div>
      );
}
    