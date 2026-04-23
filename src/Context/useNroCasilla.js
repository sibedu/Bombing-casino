import { create } from "zustand";

 const useCasillaStore = create(set =>({
    nroCasillas:3,
    cambiarNroCasillas:(nro)=>set({nroCasillas:nro})
}))

export default useCasillaStore