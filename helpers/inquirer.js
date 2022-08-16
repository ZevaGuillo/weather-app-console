const inquirer = require('inquirer');
require('colors');

const listOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Opciones: ',
        choices: [
            {
                value: 1,
                name: `${'1'.green}. Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2'.green}. Historial`
            },
            {
                value: 0,
                name: `${'0'.red}. Salir`
            }
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear();
    console.log('*************************'.green);
    console.log('  Seleccione una opción'.red);
    console.log('*************************'.green);   

    const {opcion} = await inquirer.prompt( listOptions )

    return opcion;
}

const pause = async() => {
    
    console.log('\n');

    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.green} para continuar`,   
        }
    ])
}

const readInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const  {desc}  = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async( tareas = [] )=> {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar:',
            choices
        }
    ]

    const {id} = await inquirer.prompt( preguntas )

    return id;
}

const confirmar = async(message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt( pregunta )

    return ok;

}

const mostrarListadoCheckList = async( tareas = [] )=> {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn )? true : false,
        }
    });


    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones:',
            choices
        }
    ]

    const {ids} = await inquirer.prompt( preguntas )

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}