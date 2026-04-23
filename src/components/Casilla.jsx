import React, { useEffect, useState } from 'react'
import useGameStore from '../Context/useJuego';
import useMultStore from '../Context/useMultiplicador';
import useMinasStore from '../Context/useMinas';
import useCasillaStore from '../Context/useNroCasilla';
import useMoneyStore from '../Context/useMoney';
import Bomba from '../pictures/bomb.png'
import coin from '../pictures/coin.png'


export default function Casilla({mina}) {
  const [volteada, setVolteada] = useState(false);
 const {jugando,setJugando,setTableroVolteado,tableroVolteado,reiniciarKey}=useGameStore()
 const { multiplicador, setMultiplicador, volteadas, setVolteadas } =useMultStore()
 const {Minas} =useMinasStore()
 const {nroCasillas}=useCasillaStore()
 const {setDineroPerdido,setDineroMultiplicado,setDineroGanado, descontarApuesta} = useMoneyStore();


 const totalCasillas = nroCasillas * nroCasillas;

 const calcularMultiplicador = (nuevasVolteadas) => {
  
  const totalSinMinas = totalCasillas - Minas;
  
  if (nuevasVolteadas === totalSinMinas) {
    
    return parseFloat((multiplicador * 1.2).toFixed(2));
  }
  
  if (nuevasVolteadas === 0) {
    return 1.0; 
  }
  
  const restantes = totalCasillas - nuevasVolteadas;
  const base = restantes - Minas;
  
  if (base <= 0) return multiplicador; 
  
  const factor = restantes / base;
  return parseFloat((nuevasVolteadas === 1 ? factor : multiplicador * factor).toFixed(2));
};

 const handleFlip = () => {
  if (jugando && !volteada) {
    setVolteada(true);

    if (mina === 1) {
      setJugando(false);
      setTableroVolteado(true);
      setMultiplicador(0);
      setVolteadas(0);
      setDineroPerdido()
      
    }
    else {
      const nuevasVolteadas = volteadas + 1;
        setVolteadas(nuevasVolteadas);
        
        // Calcula y establece el nuevo multiplicador
        const nuevoMultiplicador = calcularMultiplicador(nuevasVolteadas);
        setMultiplicador(nuevoMultiplicador);
        
        // Actualiza el dinero multiplicado con el nuevo valor
        setDineroMultiplicado(nuevoMultiplicador);
        
        // Si ya reveló todas las casillas seguras
        // if (nuevasVolteadas === totalCasillas - Minas) {
        //   setJugando(false);
        //   setDineroGanado(); // Victoria automática
          
        // }
    
    }
  }
};



  useEffect(() => {
    setTimeout(() => {
      if(tableroVolteado){
        setVolteada(false)
        setTableroVolteado(!tableroVolteado)
      }
    }, 1500);


  }, [tableroVolteado])
  
  useEffect(() => {
    setVolteada(false);
    setMultiplicador(0)
    setVolteadas(0)
  }, [reiniciarKey]);
  
  return (
    <div 
      className="casilla cursor-pointer w-full h-full"
      style={{
        perspective: '700px'
      }}
      onClick={handleFlip}
    >
      <div 
        className="relative w-full h-full transition-all duration-700"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: volteada ? 'rotateY(180deg)' : 'rotateY(0deg)',
         
        }}
      >
        {/* Cara frontal */}
        <div 
          className="absolute w-full h-full flex items-center justify-center rounded-3xl bg-verde-neon/10"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 0 6px 3px rgb(4, 255, 0)',
            width: '100%',
            height: '100%'
          }}
        >
          <span className="rotate-320 text-[1em] font-bold text-green-400 drop-shadow-lg">
            bombing
          </span>
        </div>
        
        {/* Cara posterior */}
        <div 
          className="absolute w-full h-full flex items-center justify-center rounded-3xl bg-black"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: volteada && mina==1?'0 0 6px 3px rgb(255, 0, 0)':'0 0 6px 3px rgb(4, 255, 0)',
            width: '100%',
            height: '100%',
            backgroundColor:volteada && mina==1?'rgb(125, 16, 52, 0.442)':'rgb(0, 255, 0,0.4)'
          }}
        >
          <span className="text-[1em] font-bold text-green-400 drop-shadow-lg">
            {mina==1?<img src={Bomba} alt="" />:<img src={coin} alt="" />}
          </span>
        </div>
      </div>
    </div>
  );
}



