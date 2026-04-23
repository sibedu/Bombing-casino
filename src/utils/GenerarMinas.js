export function generarMinas(size, minas) {
    const totalCasillas = size * size;
    const array = new Array(totalCasillas).fill(0);
  
    // Elegir posiciones aleatorias únicas
    const posiciones = new Set();
    while (posiciones.size < minas) {
      const rand = Math.floor(Math.random() * totalCasillas);
      posiciones.add(rand);
    }
  
    // Poner las minas
    posiciones.forEach((pos) => {
      array[pos] = 1;
    });
  
    return array;
  }