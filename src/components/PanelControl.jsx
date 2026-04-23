import useCasillaStore from '../Context/useNroCasilla'
import useBetStore from '../Context/useCantApuesta'
import { generarMinas } from '../utils/GenerarMinas'
import useMinasStore from '../Context/useMinas'
import useGameStore from '../Context/useJuego'
import useTableroStore from '../Context/useTablero'
import useMoneyStore from '../Context/useMoney'
import Bomba from '../pictures/bomb.png'
import coin from '../pictures/coin.png'

export default function PanelControl() {

    const {nroCasillas,cambiarNroCasillas}=useCasillaStore()
    const {aumentar,disminuir,apuesta} =useBetStore()
    const {Minas,setMinas} =useMinasStore()
    const {jugando,setJugando,reiniciar,setTableroVolteado}=useGameStore()
    const {mapa,setMapa}=useTableroStore()
    const { setDineroApostado, descontarApuesta,setDineroGanado,dinero } = useMoneyStore();


    const handleJuego=()=>{
        setMapa(generarMinas(nroCasillas,Minas))
        setJugando(true)
        setDineroApostado(apuesta);
        descontarApuesta()
         
    }

    const handleCasilla = (nro)=>{

        cambiarNroCasillas(nro)
        setMinas(nro*nro,opcionesMinas[nro][0])

    }

    const handleRetiro = () => {
        setJugando(false)
        setTableroVolteado(false)
        reiniciar()
        setDineroGanado();
        setTimeout(() => {
            setMapa(generarMinas(nroCasillas, Minas))
        }, 1000);
        
      };

    const opcionesMinas = {
        3: [1, 2, 3, 4],
        5: [1, 3, 5, 7],
        7: [1, 5, 10, 15],
        9: [5, 10, 15, 20]
      };
    
    
  return (
    <div className='flex flex-col  w-96 h-4/5 bg-black text-white rounded-2xl p-3' style={{boxShadow:'0 0 6px 3px rgb(45, 147, 44)',overflow:'hidden'}}>
        <div className='grow flex flex-col text-texto-gris flex-nowrap items-center p-3  bg-black'>
            <p className='font-bold text-2xl text-gray-400'>Casillas</p>
            <div className='flex flex-nowrap items-center p-3 justify-around bg-black w-full'>
                <button className='btn' onClick={jugando?null:()=>handleCasilla(3)}>3x3</button>
                <button className='btn' onClick={jugando?null:()=>handleCasilla(5)}>5x5</button>
                <button className='btn' onClick={jugando?null:()=>handleCasilla(7)}>7x7</button>
                <button className='btn' onClick={jugando?null:()=>handleCasilla(9)}>9x9</button>
           </div>
        </div>
        <div className='flex flex-col grow bg-black text-texto-gris gap-2 items-center '>
            <p className='font-bold text-2xl text-gray-400'>Cantidad de minas</p>
            <div className=' flex flex-nowrap items-center p-3 justify-around bg-black w-full'>
                {opcionesMinas[nroCasillas].map(m=> <button className='btn'  onClick={jugando?null:()=>setMinas(nroCasillas*nroCasillas,m)}>{m}</button>)}
                <button className='btn' >personalizado</button>
            </div>
            <div>
                <input type="number" className='' />
            </div>
        </div>
        <div className='flex flex-col items-center justify-around grow mt-4'>
            <div className='flex gap-6 items-center'>
                <img src={Bomba} alt="bomba" className='w-8 h-8 filter drop-shadow-lg-red-500' />
                <p>{Minas}</p>
            </div>
            <div className='flex gap-6 items-center'>
                <img src={coin} alt="coin" className='w-8 h-8' />
                <p>$ {dinero}</p>

            </div>
            <p className='font-bold text-2xl text-gray-400'>apuesta</p>
            <div className='flex  gap-6 items-center' >
                <div className='flex gap-5 '>
                    <button className='btn-contador btn-disminucion' onClick={disminuir}>-</button>
                    <button className='btn-contador btn-aumento' onClick={aumentar} >+</button>
                </div>
                <h2 className='p-6 m-2 rounded-3xl bg-amber-200/10'style={{boxShadow:'0 0 6px 3px rgb(235, 198, 67)'}}>$ {apuesta}</h2>
            </div>
            {!jugando?<button className='btn-jugar' onClick={handleJuego}>Juega</button>:<button className='btn-retiro' onClick={handleRetiro}>Retirarse</button>}
        </div>
    </div>
  )
}
