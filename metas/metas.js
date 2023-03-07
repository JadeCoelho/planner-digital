'use strict'

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setBanco = (bancoDados) => localStorage.setItem('todoList',JSON.stringify(bancoDados))

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <span class="material-symbols-outlined" data-indice=${indice}>delete</span>`

    document.querySelector('#todoList').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.querySelector('#todoList')
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const bancoDados = getBanco()
    bancoDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}


const inserirItem = (e) => {
    const tecla = e.key
    const texto = e.target.value
    if(tecla === 'Enter') {
        const bancoDados = getBanco()
        bancoDados.push({'tarefa': texto, 'status':''},)
        setBanco(bancoDados)
        atualizarTela()
        e.target.value = ''
    }
    
}

const removerItem = (indice) => {
    const bancoDados = getBanco()
    bancoDados.splice(indice,1)
    setBanco(bancoDados)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const bancoDados = getBanco()
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : ''
    setBanco(bancoDados)
    atualizarTela()
}

const clicarItem = (e) => {
    const elemento = e.target
    console.log(elemento);
    if(elemento.localName === 'span'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
}
document.querySelector('#newItem').addEventListener('keypress',inserirItem)
document.querySelector('#todoList').addEventListener('click',clicarItem)

atualizarTela()


//pra enviar o banco pro localstorage, transforme ele em string (json.stringfy)
//pra pegar o banco, transforme ele em array (json.parse)