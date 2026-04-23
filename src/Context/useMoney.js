import { create } from "zustand";

const useMoneyStore = create((set) => ({
  dinero: 10000,
  apuesta: 0,
  dineroJugando: 0,

  // Establece la apuesta actual
  setDineroApostado: (apostado) =>
    set(() => ({
      apuesta: apostado,
      dineroJugando: apostado, // actualiza también dineroJugando al iniciar la jugada
    })),

  // Resta la apuesta al dinero total (al iniciar la jugada)
  descontarApuesta: () =>
    set((state) => ({
      dinero: state.dinero - state.apuesta,
    })),

  // Multiplica lo jugado (apuesta) por el multiplicador actual
  setDineroMultiplicado: (multiplicador) =>
    set((state) => ({
      dineroJugando: state.apuesta * multiplicador,
    })),

  // Suma el dinero ganado al total
  setDineroGanado: () =>
    set((state) => ({
      dinero: state.dinero + state.dineroJugando,
      dineroJugando: 0,
      apuesta: 0,
    })),

  // En caso de perder: no se suma nada, solo se limpia
  setDineroPerdido: () =>
    set(() => ({
      dineroJugando: 0,
      apuesta: 0,
    })),
}));

export default useMoneyStore;