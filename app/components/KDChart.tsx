import { useEffect, useRef } from "react";

export default function KDCart(props: {value: number}) {
    const canvasRef = useRef(null);
    const getColors = (val: number) => {
        if (val > 80) return '#EF4444'
        else if (val > 65) return '#F97316'
        else if (val > 50) return '#F59E0B'
        else if (val > 35) return '#EAB308'
        else if (val > 20) return '#84CC16'
        else return '#22C55E'
    }
    const render = () => {
        const canvas: HTMLCanvasElement | any = canvasRef.current;
        if (canvas) {

            var ctx = canvas.getContext("2d");
            const color = getColors(props.value);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var angle = 0.9 * Math.PI + props.value / 100 * 1.2 * Math.PI;
      
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height - 30, 80, 0.9 * Math.PI, 2.1 * Math.PI, false);
            ctx.strokeStyle = "#E2E9E7"; 
            ctx.lineWidth = 25; 
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height - 30, 80, 0.9 * Math.PI, angle, false);
            ctx.strokeStyle = color; 
            ctx.lineWidth = 25; 
            ctx.stroke();
        }
    }

    useEffect(() => {
        render();
    }, [props])

    return <div className="flex justify-center align-center relative">
        <canvas width={200} height={130} ref={canvasRef}></canvas>
        <div className="absolute bottom-1 w-full flex flex-col justify-center text-center">
            <span className="text-3xl font-semibold">{props.value}</span>
            <span className="text-sm font-medium">Simple</span>
        </div>
    </div>
}
