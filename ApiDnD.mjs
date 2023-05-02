//fetch('http://www.dnd5eapi.co/swagger/openapi.json')

//.then(response => response.json())

//let nombre = window.prompt("Por favor, ingresa tu nombre:");
//console.log('Hola ${nombre}! Bienvenido a mi aplicación');

// Pedir al usuario que ingrese su nombre
//let nombre = window.prompt("Escriba el nombre de su personaje:");

// Mostrar una alerta con el nombre ingresado
//alert("Hola, " + nombre + "!");

// Imprimir el nombre en la consola del navegador
//console.log("Nombre: " + nombre);


const fetch = require('node-fetch');
import inquirer from 'inquirer';

const baseUrl = 'http://www.dnd5eapi.co/api';

// Función que hace una solicitud a la API de D&D 5e
async function getData(endpoint) {
  const url = "${baseUrl}/${endpoint}";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Función que muestra las opciones al usuario
async function showMenu() {
  const options = [
    {
      name: 'Buscar información de una clase',
      value: 'classes',
    },
    {
      name: 'Buscar información de un hechizo',
      value: 'spells',
    },
    {
      name: 'Buscar información de un monstruo',
      value: 'monsters',
    },
  ];

  const answers = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: '¿Qué información deseas buscar?',
    choices: options,
  });

  return answers.option;
}

// Función que solicita al usuario el nombre de la clase, hechizo o monstruo
async function getSearchTerm() {
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'searchTerm',
    message: 'Ingresa el nombre de la clase, hechizo o monstruo que deseas buscar:',
  });

  return answers.searchTerm;
}

// Función principal que ejecuta la aplicación
async function main() {
  try {
    // Mostrar el menú de opciones al usuario y obtener su selección
    const option = await showMenu();

    // Obtener el término de búsqueda del usuario
    const searchTerm = await getSearchTerm();

    // Hacer una solicitud a la API con el término de búsqueda y mostrar los resultados
    const endpoint = "${option}/?name=${searchTerm}";
    const data = await getData(endpoint);
    console.log(data.results);
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar la función principal
main();
