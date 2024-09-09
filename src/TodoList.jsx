import React, { useState, useEffect } from "react";
import './TodoList.css'

function TodoList(){

    const listaStorage = localStorage.getItem('lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect( ()=>{
        localStorage.setItem('lista', JSON.stringify(lista) ); 
    }, [lista] )

    function adicionaItem(form){
        form.preventDefault();
        if (!novoItem){
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
        if(window.confirm("Quer deletar o item [" + listaAux[index].text + "]")){
            // action you want to perform
            listaAux.splice(index, 1);
            setLista(listaAux)
         }

        
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
                    lista.length > 0 
                    ?
                    <div>               
                        <p className="tip">Você pode pressionar uma tarefa para marca-la ou desmarca-la</p>
                        <button onClick={()=>{deletAll()}} className="deleteAll">Deletar Todas</button>        
                    </div>
                    :
                    console.log("")
                }
            
            </div>
        </div>
    )
}

export default TodoList