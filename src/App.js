import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);

  const [input, setInput]  = useState(['']);

  useEffect(()=>{
    // como deixei o segundo parametro vazio ele executa assim que o componente inicia
    // essa função busca o que está guardado no local storage e adiciona dentro do array de tarefas
      const tarefasStorage = localStorage.getItem('tarefas');
      if(tarefasStorage){
        setTarefas(JSON.parse(tarefasStorage));
      }
  }, []);

  useEffect(()=> { // sempre que tarefas sofrer alteração chama uma função
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas])

  const handleAdd = useCallback(() =>{ // so chama a função quando adicionar a tarefa, nao chama sempre que digita no input
    setTarefas([...tarefas, input])
    setInput('');
  }, [tarefas, input]);

  const totalTarefas = useMemo (() => tarefas.length, [tarefas]); // useMemo retorna valor unico 1 parametro o que quer retornar e segundo de onte quer retornar
  
  return (
    <div>

      <ul>
        {tarefas.map(tarefa =>
          <li key={tarefa}>{tarefa}</li>)
        }
      </ul>
      <br/>
      <strong>Você tem {totalTarefas} tarefas</strong>
      <br/>
      
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button type="button" onClick={handleAdd}> Adicionar</button>

    </div>
  );
}

export default App;
