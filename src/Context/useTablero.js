import { create } from 'zustand'



const useTableroStore = create((set) => ({
  mapa:[],

  // Función para cambiar tamaño y número de minas
  setMapa: (mapaGenerado) =>
    set(() => ({
      mapa:mapaGenerado
    }))
}))

export default useTableroStore
