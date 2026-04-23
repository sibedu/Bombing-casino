import { create } from "zustand";

 const useMultStore = create(set =>({
  multiplicador: 0,
  setMultiplicador: (nuevo) => set({ multiplicador: nuevo }),
  volteadas: 0,
  setVolteadas: (valor) => set({ volteadas: valor })
    

}))

export default useMultStore

