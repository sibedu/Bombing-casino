import Casilla from './Casilla'
import useCasillaStore from '../Context/useNroCasilla';
import { generarMinas } from '../utils/GenerarMinas';
import useMinasStore from '../Context/useMinas';
import useTableroStore from '../Context/useTablero';
import useMultStore from '../Context/useMultiplicador';

export default function Tablero() {

  const {nroCasillas}=useCasillaStore()
  const totalCasillas = nroCasillas * nroCasillas;
  const {Minas,setMinas} =useMinasStore()
  const {mapa,setMapa}=useTableroStore()
  const { multiplicador, setMultiplicador, volteadas, setVolteadas } =useMultStore()

  
  const mapaMinas=generarMinas(nroCasillas,Minas)

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-green-400 text-xl font-bold drop-shadow-md">
        💰 Multiplicador: x{multiplicador.toFixed(2)}
      </h2>

      <div
        className="grid"
        style={{
          width: '600px',
          height: '600px',
          boxSizing: 'border-box',
          display: 'grid',
          padding: '8px',
          gap: '10px',
          gridTemplateColumns: `repeat(${nroCasillas}, 1fr)`,
          gridTemplateRows: `repeat(${nroCasillas}, 1fr)`,
          margin: '0 auto',
          borderRadius: '8px',
        }}
      >
        {
          Array.from({ length: totalCasillas }, (_, i) => (
            <Casilla key={i} mina={mapa[i]} />
          ))
        }
      </div>
    </div>
  );
}