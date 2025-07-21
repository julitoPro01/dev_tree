import { Chart } from 'chart.js/auto'; // Auto-registra todo lo necesario

import { useEffect, useRef } from "react";


export const Grafig=({data:value}:any)=>{
    const canva = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    if (!canva.current) return;

    const chartInstance = new Chart(canva.current, {
      type: 'bar',
      data: {
        labels: ['Total visitas','Visitas por Día', 'Ultimas visitas'],
        datasets: [
          {
            label: 'Vistas',
            data: [value.total,Object.values(value.porDia)[0],value.ultimas.length],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chartInstance.destroy(); 
    };
  }, []); 

  return <canvas ref={canva} id="grafig" />;
}
