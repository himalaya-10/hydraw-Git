import React from 'react';
import Image from 'next/image';


export default function Drawer() {
    

    return (
        <div>
        <style jsx>{`
        .colors:hover::before{
            position: absolute;
            content:'';
            background:inherit;
            border-radius:inherit;
            border:solid 1.5px white;
            height:1rem;
            width:1rem;
            transform:translate(13%,11%);
        }
        .colors:first-child:hover::before{
            border:solid 1.5px black;
        }
        .selected::before{
            position: absolute;
            content:'';
            background:inherit;
            border-radius:inherit;
            border:solid 1.5px white;
            height:1rem;
            width:1rem;
            transform:translate(13%,11%);
        }
        .selected:first-child::before{
            border:solid 1.5px black;
        }
        .hov:is(:hover, .active){
            filter:invert(50%) sepia(50%) saturate(3000%) hue-rotate(922deg) brightness(100%) contrast(100%);
        }
        .fill-color:checked~label{
            color:rgb(48,155,255);
        }
        .bggradient{
            background: linear-gradient(to top right, #33ccff 0%, #ffccff 100%);
        }
        .clicked{
            background: rgb(54,54,54);
        }
        `}</style>
            <div className='absolute w-[180px] h-[630px] mt-[80px] ml-2 flex z-10 select-none'>
                <div className='w-[200px] h-[630px] bg-[rgb(31,31,32)] rounded-md flex flex-row justify-center border border-[rgb(54,54,54)] ' >
                    <div className='shapes w-[170px] h-[190px] rounded-sm flex-row cursor-default p-2'>
                        <div className='title text-white font-light h-6 flex'><Image className='mt-[3px] mr-[2px]' src="/icons8-shape-64.png" width={20}
                            height={20} alt="[]" />Shapes</div>
                        <div className='flex-row p-3 mb-3'>
                            <div className='rectangle text-white font-thin h-6 m-2 flex hov cursor-pointer tool option' id='rectangle'><Image className='m-[3px] mr-2' src="/icons8-rectangular-24.png" width={18}
                                height={18} alt="[]" />Rectangle</div>
                            <div className='triangle text-white font-thin h-6 m-2 flex hov cursor-pointer tool option' id='triangle'><Image className='m-[3px] mr-2' src="/icons8-triangle-24.png" width={18}
                                height={18} alt="[]" />Triangle</div>
                            <div className='circle text-white font-thin h-6 m-2 flex hov cursor-pointer tool option' id='circle'><Image className='m-[3px] mr-2' src="/icons8-circled-thin-50.png" width={18}
                                height={18} alt="[]" />Circle</div>
                            <input type='checkbox' id='fill-color' className='m-2 fill-color' /><label htmlFor="fill-color" className=' text-white font-thin  hov cursor-pointer'>Fill color</label>
                        </div>
                        <div className='brushes w-[170px] h-[130px] rounded-sm flex-row cursor-default'>
                            <div className='title text-white font-light h-5 flex'><Image className='mt-[3px] mr-[3px]' src="/icons8-options-24.png" width={20}
                                height={20} alt="[]" />Options</div>
                            <div className='flex-row p-3'>
                                <div className='pointer text-white font-thin h-6 m-2 flex hov cursor-pointer active tool option' id='pointer'><Image className='m-[3px] mr-2' src="/icons8-cursor-30.png" width={18}
                                    height={18} alt="[]" />Pointer</div>
                                <div className='brush text-white font-thin h-6 m-2 flex hov cursor-pointer  tool option' id='brush'><Image className='m-[3px] mr-2' src="/icons8-brush-64.png" width={18}
                                    height={18} alt="[]" />Brush</div>
                                <div className='Eraser text-white font-thin h-6 m-2 flex hov cursor-pointer tool option' id='eraser'><Image className='m-[3px] mr-2' src="/icons8-eraser-24.png" width={18}
                                    height={18} alt="[]" />Eraser</div>
                            </div>
                        </div>
                        <div className='range w-[170px] h-[35px] rounded-sm flex-row cursor-default'>
                            <input type='range' id='size-slider' className='size h-1' min="1" max="30" defaultValue={2}/>
                            <label htmlFor="size-slider" className='text-white font-thin'></label>

                        </div>
                        <div className='color w-[170px] h-[75px] rounded-sm flex-row cursor-default'>
                            <label className='title text-white font-light h-6 flex'><Image className='mt-[3px] mr-[3px]' src="/icons8-color-50.png" width={20}
                                height={20} alt="[]" />Colors</label>
                            <div className='flex p-3 justify-between'>
                                <div className='h-5 w-5 bg-white m-1 rounded-xl  colors selected cursor-pointer' id='rgb(255 255 255'></div>
                                <div className='h-5 w-5 bg-blue-600 m-1 rounded-xl colors cursor-pointer' id='rgb(37 99 235)'></div>
                                <div className='h-5 w-5 bg-red-600 m-1 rounded-xl colors cursor-pointer' id='rgb(220 38 38)'></div>
                                <div className='h-5 w-5 bg-green-600 m-1 rounded-xl colors cursor-pointer' id='rgb(22 163 74)'></div>
                                <div className='h-5 w-5 bggradient m-1 rounded-xl colors cursor-pointer '><input className='opacity-0 h-6 w-5' type="color" defaultValue="rgb(0 0 0)" id='color-picker'/></div>
                            </div>

                        </div>
                        <div className='w-[160px] h-[80px] rounded-sm grid cursor-default justify-center items-center'>
                            <button className='title text-white h-7 flex border rounded-md w-[110px] justify-center font-thin hover:bg-[rgb(54,54,54)] addtext' id='addtext'>Add Text</button>
                        </div>
                        <div className='w-[160px] h-[100px] rounded-sm grid cursor-default justify-center items-center'>
                            <button className='title text-white h-6 flex bg-blue-700 rounded-md w-[110px] justify-center font-thin clear-canvas hover:bg-blue-800'>Clear Canvas</button>
                            <button className='title text-white h-6 flex bg-blue-700 rounded-md w-[110px] justify-center font-thin save-img hover:bg-blue-800'>Save Drawing</button>
                            <button id='capture' className='title text-white h-6 flex bg-blue-700 rounded-md w-[110px] justify-center font-thin hover:bg-blue-800 capture'>Save as image</button>
                        </div>
                    </div>

                </div>

                {/* <div className='absolute left-[99%] top-1 w-[30px] h-[40px] bg-[rgb(31,31,32)] border border-r-[rgb(54,54,54)] border-t-[rgb(54,54,54)] border-b-[rgb(54,54,54)] rounded-r-md border-l-[rgb(31,31,32)]'>

                </div> */}
            </div>

        </div>
    );
}
