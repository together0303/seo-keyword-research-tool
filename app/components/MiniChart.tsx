import { useEffect, useRef } from "react";

export default function MiniChart({values= [], width= 120, height= 21}: {values: number[], width?: number, height?: number}) {
    const canvasRef = useRef(null);

    const render = () => {
        const canvas: HTMLCanvasElement | any = canvasRef.current;
        if (canvas && values.length > 0) {

            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const maxTraffic = Math.max(...values);
            const minTraffic = Math.min(...values);
            
            const topOffset = 2;
            const bottomOffset = 4;
            const graphHeight = canvas.height - topOffset - bottomOffset;
            const graphWidth = canvas.width;
            const dataLength = values.length;
            const stepX = graphWidth / (dataLength - 1);
            const stepY = graphHeight / (maxTraffic - minTraffic);

            ctx.beginPath();
            ctx.moveTo(0, graphHeight + topOffset  - (values[0] - minTraffic) * stepY);
            for (let i = 1; i < dataLength; i++) {
                const y = graphHeight + topOffset - (values[i] - minTraffic) * stepY;
                const x = i * stepX;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = '#2085de';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.lineTo(graphWidth, graphHeight + topOffset + bottomOffset);
            ctx.lineTo(0, graphHeight + topOffset + bottomOffset);
            ctx.closePath();
            ctx.fillStyle = '#e5edfc';
            ctx.fill();            
            // var angle = 0.9 * Math.PI + props.value / 100 * 1.2 * Math.PI;
      
            // ctx.beginPath();
            // ctx.arc(canvas.width / 2, canvas.height - 30, 80, 0.9 * Math.PI, 2.1 * Math.PI, false);
            // ctx.strokeStyle = "#E2E9E7"; 
            // ctx.lineWidth = 25; 
            // ctx.stroke();
            
            // ctx.beginPath();
            // ctx.arc(canvas.width / 2, canvas.height - 30, 80, 0.9 * Math.PI, angle, false);
            // ctx.strokeStyle = color; 
            // ctx.lineWidth = 25; 
            // ctx.stroke();
        }
    }

    useEffect(() => {
        render();
    }, [values])

    return <div className="flex justify-end align-center relative">
        <canvas width={width} height={height} ref={canvasRef}></canvas>
    </div>
}
