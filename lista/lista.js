console.log('Bienvenido 😍')

const formulario = document.getElementById('formulario')
const listaTarea = document.getElementById('lista-tarea')
const input = document.getElementById('input')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}

listaTarea.addEventListener('click', e => {
    btnAccion(e)
})

formulario.addEventListener('submit', e => {
    //evitar el comportamiento de cualquier elemento html
    e.preventDefault()

    //console.log(input.value)

   setTarea(e)
})

const setTarea = e => {
    if(input.value.trim() === ''){
        console.log('vacio')
        input.focus()
        return
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea

    //console.log(tareas)
    formulario.reset()
    input.focus()

    pintarTareas()
}

const pintarTareas = () => {
    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)

        if(tarea.estado){
            clone.querySelector('.alert').classList.remove('alert-warning')
            clone.querySelector('.alert').classList.add('bg-secondary')
            clone.querySelector('.alert').classList.add('bg-opacity-50')
            clone.querySelector('.succe').classList.add('text-decoration-line-through')
            
        }

        clone.querySelector('p').textContent = tarea.texto
        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTarea.appendChild(fragment)
}

const btnAccion = e => {
    if(e.target.classList.contains('fa-circle-minus')){
        Object.values(tareas).forEach(tarea => {
            if(e.target.dataset.id == tarea.id){
                delete tareas[e.target.dataset.id]
                pintarTareas()
            }
            
        })
    }else if(e.target.classList.contains('fa-circle-check')){
        Object.values(tareas).forEach(tarea =>{
            if(e.target.dataset.id == tarea.id){
                if(tarea.estado){
                    tarea.estado = false
                    pintarTareas()
                    return
                }
                tarea.estado = true
                pintarTareas()
            }
        })
    }
    e.stopPropagation()
}

