import { create } from "zustand";

 const useMinasStore = create(set =>({
    Minas:1,
    setMinas: (casillas,nroMinas) => set((state) =>
        nroMinas> 0 && nroMinas<=casillas-1
          ? { Minas: nroMinas }
          : casillas-1
      )

}))

export default useMinasStore

