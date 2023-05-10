//Martin Delbueno Api D&D
//------------------------------------------------------------------------

import readline from 'readline';

function nombre (){

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
  rl.question('ingrese su nombre: ', (nombre) => {
    console.log(`tu nombre es ${nombre}.`);
    rl.close();
  });
  
}


import inquirer from 'inquirer';

const baseUrl = 'http://www.dnd5eapi.co/api';


async function getData(endpoint) {
  console.log (endpoint);
  const url = "${baseUrl}/${endpoint}";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


async function showClasesMenu() {
  const options = [
    {
      name: 'barbarian',
      value: 'barbarian',
    },
    {
      name: 'bard',
      value: 'bard',
    },
    {
      name: 'cleric',
      value: 'cleric',
    },
    {
      name: 'druid',
      value: 'druid',
    },
    {
      name: 'fighter',
      value: 'fighter',
    },
    {
      name: 'monk',
      value: 'monk',
    },
    {
      name: 'paladin',
      value: 'paladin',
    },
    {
      name: 'ranger',
      value: 'ranger',
    },
    {
      name: 'rogue',
      value: 'rogue',
    },
    {
      name: 'sorcerer',
      value: 'sorcerer',
    },
    {
      name: 'warlock',
      value: 'warlock',
    },
    {
      name: 'wizard',
      value: 'wizard',
    },
    ];
  
  
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'selecciona una clase:',
    choices: options,
  });

  return answers.option;
}
async function promptNombre() {
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'Nombre',
    message: 'ingresa un nombre a tu personaje:',
  });
  return answers.searchTerm;
}


async function getSubClases(clase) {
  const response = await fetch('https://www.dnd5eapi.co/api/classes/'+clase+'/subclasses');
  const data = await response.json();
  console.log(data);
  return data;

}

async function showRazasMenu() {
  const options = [
  {
    name: 'dragonborn',
    value: 'dragonborn',
  },
  {
    name: 'dwarf',
    value: 'dwarf',
  },
  {
    name: 'elf',
    value: 'elf',
  },
  {
    name: 'gnome',
    value: 'gnome',
  },
  {
    name: 'half-elf',
    value: 'half-elf',
  },
  {
    name: 'half-orc',
    value: 'half-orc',
  },
  {
    name: 'halfling',
    value: 'halfling',
  },
  {
    name: 'human',
    value: 'human',
  },
  {
    name: 'tiefling',
    value: 'tiefling',
  },
  ];
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'r',
    message: 'selecciona una Raza:',
    choices: options,
  });

  return answers.option;
}


async function getSubrazas(raza) {
  const response = await fetch('https://www.dnd5eapi.co/api/races/'+raza+'/subraces');
  const data = await response.json();
  console.log(data);
  return data;


}

async function showLevlMenu(levels) {
  const response = await fetch('https://www.dnd5eapi.co/api/classes/'+levels+'/levels');
  const data = await response.json();
  console.log(data);
  return data;

}

async function showspellsMenu(spells) {
  const response = await fetch('https://www.dnd5eapi.co/api/classes/'+spells+'/spells');
  const data = await response.json();
  console.log(data);
  return data;

}

async function showFeaturesMenu(feat) {
  const response = await fetch('https://www.dnd5eapi.co/api/classes/'+feat+'/features');
  const data = await response.json();
  console.log(data);
  return data;

}

async function showProficienciesMenu(proficiencies) {
  const response = await fetch('https://www.dnd5eapi.co/api/classes/'+proficiencies+'/proficiencies');
  const data = await response.json();
  console.log(data);
  return data;

}



// Función principal que ejecuta la aplicación <<<
async function main() {
  try {
    
    const nombre = await promptNombre();
    // Mostrar el menú de opciones al usuario y obtener su selección  <<<
    const razas = await showRazasMenu();
    const Subrazas= await getSubrazas();

    const option = await showClasesMenu();

    console.log(option);
    // Obtener el término de búsqueda del usuario <<<<
    const searchTerm = await getSubClases(option);

    const levels = await showLevlMenu(option);

    const spells = await  showspellsMenu(option);

    const feat = await  showFeaturesMenu(option);

    const proficiencies = await  showProficienciesMenu(option);


    // Hacer una solicitud a la API con el término de búsqueda y mostrar los resultados <<<
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar la función principal
main();
