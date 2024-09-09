import React, { useState } from "react";
import './TodoList.css'

function TodoList(){

    const [lista, setLista] = useState([]);
    const [novoItem, setNovoItem] = useState("");

    function adicionaItem(form){
        form.preventDefault();
        if (!novoItem){
            alert("vazio")
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false }]);
        setNovoItem("");
        console.log(lista)
        document.getElementById("inputEntrada").focus
    }

    function clicou(index){
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux)
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux)
    }

    function deletAll(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                    id="inputEntrada"
                    placeholder="Adicione uma tarefa"
                    type="text"
                    value={novoItem}
                    onChange={(e)=>{setNovoItem(e.target.value)}}
                ></input>
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listaTarefas">
                <div>
                    {
                    lista.length < 1 
                    ?
                    <img
                        id="imagemPlaceholder"
                        src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png" 
                        alt="imagem quebrada"
                    ></img>
                    :   
                    lista.map((item, index)=>(
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                           <span onClick={()=>{clicou(index)}}>{item.text}</span>
                           <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                       </div>
                    ))
                    }
                </div>
                {
                    lista.length > 0 && 
                    <button onClick={()=>{deletAll()}} className="deleteAll">Deletar Todas</button>
                }
            
            </div>
        </div>
    )
}

export default TodoList