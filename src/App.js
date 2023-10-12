import { useEffect, useState } from 'react';
import './css/App.css';



function App() {
  const [conteudo, setconteudo] = useState(<h2>Carregando..</h2>)
  
  async function carregarTodososPersonagens(){
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const result = await fetch(
      'https://rickandmortyapi.com/api/character?',
      requestOptions
    )
      .then(response => response.text)
      .then(result => {return result})
      .catch(error => console.log('erro aqui', error))

    const personagens = JSON.parse(result)

    return personagens.results
  }

  async function montarListaPersonagens(){
    const personagens = await carregarTodososPersonagens()

    return personagens.map(personagem =>
      <div className='card char' key={personagem.id}>

        <img src= {personagem.image} alt= {personagem.name}>
        </img>

        <h2>{personagem.name}</h2>

        <div ClassName='char-info'>
          <span><b>Especie:</b>{personagem.species}</span>
          <span><b>Genero:</b>{personagem.gender}</span>
        </div>

        <div ClassName='lista-secundaria'>
          <b>Participações</b>
        </div>
        <h5><b>Status:</b>{personagem.status}</h5>
      </div>  
    )
  }
  useEffect(() => {
    async function pegarConteudo() {
      setconteudo(await montarListaPersonagens())
    }
    pegarConteudo()
  }, [])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick morty API</h1>
        <h2><a href='/'>Personagens</a></h2>
      </header>
      <div className='lista-principal'>
        { conteudo }
      </div>
    </div>
  );
}

export default App;
