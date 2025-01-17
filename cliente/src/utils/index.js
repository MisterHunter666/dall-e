import FileSaver from 'file-saver';

import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * 
  surpriseMePrompts.length);


  const randomPrompt = surpriseMePrompts[randomIndex]; // evaluo el arreglo con el indice selecccionado.

  // evaluar es obtener lo que el arreglo tiene en esa posición, en ese índice.
  
  if(randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage( _id, photo ) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}


/* 
const arreglo = ["cocacola", "poroto", "albonfiga", "1,2,5,6,4,9,96"]

const indice  = Math.floor(Math.random() * arreglo.length )


console.log("la cantidad de elementos en el arreglo es de: " ,arreglo.length);
console.log("el indice es:  " ,  indice);
console.log("la infoprmacion guardada en el lugar señalado es: ", arreglo[indice]);
*/