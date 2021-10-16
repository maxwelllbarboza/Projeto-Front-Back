import "./app.css";
import Menu from "./components/Menu/index";
import Tabela from "./components/Tabela/index";
import TabelaOrdenar from "./components/TabelaOrdenar/index";
import  Abrimodaldelete from "./components/abrirModalDel/index";
import Tabelaresumo from "./components/Tabelaresumo/index";
import ModalCarrinho from "./components/ModalCarrinho/index";
import filtro from "./components/assets/filtro.svg";
import {useEffect, useState} from "react";

export default function App() { 
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false);    
  const [creditoResumo, setCreditoResumo] = useState(0);
  const [debitoResumo, setDebitoResumo]   = useState(0);
  const [totalResumo, setTotalResumo]   = useState(0);  
  const [userDados, setUserDados] = useState([]);  
  const [carregouCard, setCarregouCard] = useState(false);
  const [confirmeDel, setConfirmDel] = useState(false);
   



  useEffect(() => {
    loadTransaction();    
    setCarregouCard(true)
    setCreditoResumo()
    setDebitoResumo()
    setTotalResumo()
    setConfirmDel()       
  }, []);

  
  async function handleDeleteUser(userId){ 
    try{      
        const response = await fetch(`http://localhost:3333/transactions/${userId}`,
        {
          method:'DELETE'       
        });
        await loadTransaction();
        setConfirmDel(false)
      
    }catch(error){
      console.log(error)
    }         
  }
  async function loadTransaction(){
    try{
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
      });
      const dados = await response.json();
      setUserDados(dados)
      const parcialCredito = dados.filter(dado => dado.type === 'credit'); 
      const parsCredito = parcialCredito.map((user) => parseInt(user.value))       
      const totalCredito = parsCredito.reduce((total, element) => total + element);
      setCreditoResumo(totalCredito)      
      const parcialDebito = dados.filter(dado => dado.type === 'debit'); 
      const parsDebito = parcialDebito.map((user) => parseInt(user.value))       
      const totalDebito = parsDebito.reduce((total, element) => total + element);
      setDebitoResumo(totalDebito)
      const valorTotal = (totalCredito -totalDebito)
      setTotalResumo(valorTotal)      
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div className="container">
       <Menu/>
       <div className="container-filtro"></div>    
          <div className=""></div>
              <button className="filtro">
                <img className="btn-left" alt ="Filtro" src={filtro} /> 
                Filtrar
              </button>      
              <div className="div-ordenar"> 
                  <TabelaOrdenar/>
                <div>   
                    <Tabelaresumo creditoResumo={creditoResumo}
                    debitoResumo={debitoResumo} totalResumo={totalResumo}/>
                </div>        
                <div className="resumo-registro">
                    <button className="btn-registro" onClick={()=> setMostrarModal(true) } >Adicionar Registro</button>                          
                </div>               
              </div> 
        <div className = "tabela">           
            {carregouCard && userDados.map(item => (
            <Tabela setConfirmDel={setConfirmDel} setMostrarModalEdit={setMostrarModalEdit} item={item}/>
            
            ))}                                   
            {mostrarModal && <ModalCarrinho totalResumo={totalResumo} setMostrarModal={setMostrarModal} mostrarModal={mostrarModal} loadTransaction={loadTransaction}/>}


            
            {mostrarModalEdit && <ModalCarrinho mostrarModalEdit={mostrarModalEdit} setMostrarModalEdit={setMostrarModalEdit} totalResumo={totalResumo} setMostrarModal={setMostrarModal} mostrarModal={mostrarModal} loadTransaction={loadTransaction}/>}



            {confirmeDel && <Abrimodaldelete handleDeleteUser={handleDeleteUser} confirmeDel={confirmeDel} setConfirmDel={setConfirmDel} />}                         
           
        </div>           
  </div>    
  );    
}
