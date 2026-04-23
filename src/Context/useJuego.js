import { create } from "zustand";

 const useGameStore = create(set =>({
    jugando:false,
    setJugando:(bool)=>set((state)=>({jugando:bool})),
    tableroVolteado:false,
    setTableroVolteado:(bool)=>set((state)=>({tableroVolteado:bool})),
    reiniciarKey: 0, 
    reiniciar: () => set((state) => ({ reiniciarKey: state.reiniciarKey + 1 })),

}))

export default useGameStore

