import { create } from "zustand";

 const useBetStore = create(set =>({
    apuesta:0,
    aumentar:()=>set((state)=>({apuesta:state.apuesta+10})),
    disminuir: () => set((state) =>
        state.apuesta> 0
          ? { apuesta: state.apuesta - 10 }
          : state 
      )

}))

export default useBetStore

