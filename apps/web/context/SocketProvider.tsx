'use client'
import React, {MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[];
    sendDraw: () => any;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket,setSocket]=useState<Socket>();
    const [messages, setMessages]=useState<string[]>([]);

//     // let socket:any=undefined;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isdrawing, setIsDrawing] = useState(false);
    const [brushWidth, setBrushWidth] = useState<any>(2);
    const [selectedTool, setSelectedTool] = useState<string>("pointer");
    const [selectedColor, setSelectedColor] = useState<string>("white");
    const [prevMouseX, setPrevMouseX] = useState<number | null>(null);
    const [prevMouseY, setPrevMouseY] = useState<number | null>(null);
    const [snapshot, setSnapshot] = useState<any>(undefined);
    // const [offsetX, setOffsetX] = useState<number | undefined>(undefined);
    // const [offsetY, setOffsetY] = useState<number | undefined>(undefined);
    // const [isDragging, setIsDragging] = useState(false);

    const [currentMouseX, setCurrentMouseX] = useState<number | null>(null);
    const [currentMouseY, setCurrentMouseY] = useState<number | null>(null);

    // -----------------------------------------------------
    let btnTools: NodeListOf<Element> | null;
    let fillColor: HTMLInputElement | null;
    let sizeSlider: HTMLInputElement | null;
    let colorPicker: HTMLInputElement | null;
    let colorBtns: NodeListOf<Element> | null;
    let clearCanvas:HTMLElement;
    let saveImg:HTMLElement;
    if (typeof document !== 'undefined') {
        fillColor = document.getElementById("fill-color") as HTMLInputElement;
        btnTools = document.querySelectorAll(".tool");
        sizeSlider = document.getElementById("size-slider") as HTMLInputElement;
        colorPicker = document.getElementById("color-picker") as HTMLInputElement;
        colorBtns = document.querySelectorAll(".colors")
        clearCanvas = document.querySelector(".clear-canvas") as HTMLElement
        saveImg = document.querySelector(".save-img") as HTMLElement
    }
    

    useEffect(() => {
        

        const ctx = canvasRef.current?.getContext("2d");

        const setCanvasBackground=()=>{
            if(ctx){
            ctx.fillStyle='black';
            if(canvasRef.current)
            ctx.fillRect(0,0,canvasRef.current.width,canvasRef.current.height);
            ctx.fillStyle=selectedColor;
            }
        }
        window.addEventListener('load', () => {
            if(canvasRef.current){
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            }
            setCanvasBackground();
        });

        const drawRect = (e: MouseEvent) => {
            if (ctx && prevMouseX && prevMouseY) {
                if (!fillColor?.checked) {
                    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
                }
                ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
            }

        }

        const drawTriangle = (e: MouseEvent) => {
            if (ctx && prevMouseX && prevMouseY) {
                ctx.beginPath();
                ctx.moveTo(prevMouseX, prevMouseY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
                ctx.closePath();
                (!fillColor?.checked) ? ctx.stroke() : ctx.fill();
            }
        }
        const drawCircle = (e: MouseEvent) => {
            if (ctx && prevMouseX && prevMouseY) {
                ctx.beginPath();
                let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2))
                ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
                (!fillColor?.checked) ? ctx.stroke() : ctx.fill();
            }
        }


        const drawing = (e: MouseEvent) => {
            if (isdrawing && ctx) {
                setCurrentMouseX(e.offsetX);
                setCurrentMouseY(e.offsetY);
                // ctx?.putImageData(snapshot, 0, 0);//**** */
                ctx.strokeStyle = selectedColor;
                ctx.fillStyle = selectedColor;
                if (selectedTool === 'brush' || selectedTool === 'eraser') {
                    ctx.strokeStyle = selectedTool === 'eraser' ? "black" : selectedColor;
                    if(prevMouseX&&prevMouseY)
                    ctx.moveTo(prevMouseX,prevMouseY);
                    if(currentMouseX&&currentMouseY)
                    ctx.lineTo(currentMouseX, currentMouseY);
                    ctx.stroke();
                    setPrevMouseX(currentMouseX);
                    setPrevMouseY(currentMouseY);
                    // ctx.fillStyle=selectedColor;
                    // ctx.beginPath();
                    // if(prevMouseX&&prevMouseY)
                    // ctx.arc(prevMouseX,prevMouseY,2,0,2*Math.PI);
                    // ctx.fill()
                }
                else if (selectedTool === 'rectangle') {
                    drawRect(e);
                }
                else if (selectedTool === 'circle') {
                    drawCircle(e);
                }
                else if (selectedTool === 'triangle') {
                    drawTriangle(e);
                }
                else {

                }

            }
        }
        const startdraw = (e: MouseEvent) => {
            // setPrevMouseX(e.offsetX);
            // setPrevMouseY(e.offsetY);
            
            if (selectedTool === 'pointer') return;
            setIsDrawing(true);
            if (ctx && canvasRef.current) {
                setPrevMouseX(e.offsetX);
                setPrevMouseY(e.offsetY);
                setCurrentMouseX(e.offsetX);
                setCurrentMouseY(e.offsetY);
                ctx.beginPath();
                ctx.lineWidth = brushWidth;
                // setSnapshot(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));//******* */
            }

        }

        canvasRef.current?.addEventListener('mousemove', drawing)
        canvasRef.current?.addEventListener('mousedown', startdraw)
        canvasRef.current?.addEventListener('mouseup', () => { setIsDrawing(false)})
    


        btnTools?.forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelector(".active")?.classList.remove('active');
                btn.classList.add('active');
                setSelectedTool(btn.id);
                // console.log(selectedTool);
            })
        
        })
        colorBtns?.forEach((btn) => {
            btn.addEventListener('click', () => {
                document.querySelector(".selected")?.classList.remove('selected');
                btn.classList.add('selected');
                setSelectedColor(btn.id);
            })
        
        })
        sizeSlider?.addEventListener('change',()=>{
            setBrushWidth(sizeSlider?.value);
        })
        colorPicker?.addEventListener('change',()=>{
            if(colorPicker?.parentElement){
            colorPicker.parentElement.style.background=colorPicker?.value;
            colorPicker.parentElement.click();
            setSelectedColor(colorPicker.value);
            }
        })

    return () => {
        canvasRef.current?.removeEventListener('mousemove', drawing)
        canvasRef.current?.removeEventListener('mousedown', startdraw)
        canvasRef.current?.removeEventListener('mouseup', () => { setIsDrawing(false)})


        btnTools?.forEach((btn) => {
            btn.removeEventListener('click', () => {
                document.querySelector(".active")?.classList.remove('active');
                btn.classList.add('active');
                setSelectedTool(btn.id);
            })
        
        })
        colorBtns?.forEach((btn) => {
            btn.removeEventListener('click', () => {
                document.querySelector(".selected")?.classList.remove('selected');
                btn.classList.add('selected');
                setSelectedColor(btn.id);
            })
        
        })
        sizeSlider?.removeEventListener('change',()=>{
            setBrushWidth(sizeSlider?.value);
        })
        colorPicker?.removeEventListener('change',()=>{
            if(colorPicker?.parentElement){
            colorPicker.parentElement.style.background=colorPicker?.value;
            colorPicker.parentElement.click();
            setSelectedColor(colorPicker.value);
            }
        })
    }
}, [isdrawing, brushWidth, selectedTool, selectedColor, prevMouseX, prevMouseY, currentMouseX, currentMouseY
    //  snapshot,
    //  fillColor, btnTools, colorBtns, sizeSlider, colorPicker
])


const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
    console.log("SendMessage", msg);
    
    if (socket) {
        console.log("alsdjflksdfhahah")
        socket.emit('event:message', { message: msg })
    }
    
}, [socket])

const sendDraw: ISocketContext['sendDraw'] = useCallback(() => {
    if (socket) {
        // console.log("sending..")
        const drawingData = {
            // canvasRef: canvasRef,
            isdrawing: isdrawing,
            brushWidth: brushWidth,
            selectedTool: selectedTool,
            selectedColor: selectedColor,
            prevMouseX: prevMouseX,
            prevMouseY: prevMouseY,
            currentMouseX: currentMouseX, // Include current mouse coordinates
            currentMouseY: currentMouseY,
            // snapshot:snapshot
        };
        // console.log(drawingData);
        socket.emit('event:draw', drawingData);
    }
}, [
    socket, isdrawing, brushWidth, selectedTool, selectedColor, prevMouseX, prevMouseY,currentMouseX, currentMouseY
])

const onMessageRec = useCallback((msg: string) => {
    console.log("From Server---", msg);
    const { message } = JSON.parse(msg) as { message: string }
    setMessages(prev => [...prev, message]);
}, [])

const onDrawingRec = useCallback((msg: string) => {
    
    // console.log("From Server---", msg);
    const { drawingData } = JSON.parse(msg) as { drawingData: { isdrawing: boolean, brushWidth: number, selectedTool: string, selectedColor: string, prevMouseX: number | null, prevMouseY: number | null, currentMouseX: number | null, currentMouseY: number | null } };
    // console.log(drawingData.isdrawing);

    const ctx = canvasRef.current?.getContext("2d");

    if (drawingData.isdrawing && ctx) {

        ctx.beginPath();
        ctx.lineWidth=drawingData.brushWidth;
        ctx.strokeStyle = drawingData.selectedTool === 'eraser' ? "black" : drawingData.selectedColor;
        if(drawingData.prevMouseX&&drawingData.prevMouseY)
        ctx.moveTo(drawingData.prevMouseX,drawingData.prevMouseY);
        if(drawingData.currentMouseX&&drawingData.currentMouseY)
        ctx.lineTo(drawingData.currentMouseX, drawingData.currentMouseY);
        ctx.stroke();
        // ctx.fillStyle=drawingData.selectedColor;
        // ctx.beginPath();
        // if(drawingData.prevMouseX&&drawingData.prevMouseY)
        // ctx.arc(drawingData.prevMouseX,drawingData.prevMouseY,2,0,2*Math.PI);
        // ctx.fill()
    }
}, [canvasRef]);

useEffect(() => {
    const _socket = io("http://localhost:8000");
    setSocket(_socket);
    // console.log(socket)
    _socket.on('message', onMessageRec);
    _socket.on('drawing', onDrawingRec);
    return () => {
        _socket.off('message', onMessageRec);
        _socket.off('drawing', onDrawingRec);
        _socket.disconnect();
        setSocket(undefined);
    }
}, [])

return (
    <SocketContext.Provider value={{ sendMessage, messages, sendDraw, canvasRef}}>
        {children}
    </SocketContext.Provider>
)
}