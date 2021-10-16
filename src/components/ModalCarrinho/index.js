import { useState, useEffect} from 'react';
import './style.css';

function ModalCarrinho({setMostrarModal,setMostrarModalEdit, mostrarModalEdit ,totalResumo, mostrarModal, loadTransaction}) { 
  const [mudarBtnCredito, setMudarBtnCredito] = useState('btn-claro');
  const [mudarBtnDebito, setMudarBtnDebito]   = useState('btn-claro');  
  const [credeb, setCredeb] = useState({tipo:''});  
  const [itemDados, setItemDados] = useState([]);
  const [valorTrans, setValorTrans] = useState('');
  const [dataTrans, setDataTrans] = useState('');
  const [categoriaTrans, setCategoriaTrans] = useState('');
  const [descricaoTrans, setDescricaoTrans] = useState('');
  
 
  useEffect(()=> {
    if(mostrarModalEdit){  
       setCategoriaTrans(mostrarModalEdit.category);
       setDataTrans(mostrarModalEdit.date);
       setDescricaoTrans(mostrarModalEdit.descryption);
       setValorTrans(mostrarModalEdit.value); 
       return;  
    }
      setCategoriaTrans('');
      setDataTrans('');
      setDescricaoTrans('');
      setValorTrans(''); 
  },[mostrarModalEdit]);

  
  useEffect(() => {
    handleRegisterUser()    
  }, []); 

 
  function handleSubmit(event){
    event.preventdefault();
  }    
  function handletipo({target}){
    setCredeb({...credeb, [target.name]: target.value});        
    const mudarCorCredito = target.value === 'credit'? 'btn-entrada' : 'btn-claro'  
    const mudarCorDebito  = target.value === 'debit' ? 'btn-saida': 'btn-claro'     
    setMudarBtnCredito(mudarCorCredito);
    setMudarBtnDebito(mudarCorDebito);
  } 
  async function  handleRegisterUser(){ 
    try{
     if(!categoriaTrans || !descricaoTrans || !valorTrans || !categoriaTrans || !credeb.tipo){
       return;
     }
     const diaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
     const new_week = new Date(dataTrans);
     const week = new_week.getDay();        
     const body =
     {
       date: dataTrans,
       week_day: diaSemana[week],
       descryption: descricaoTrans,
       value: valorTrans,
       category: categoriaTrans,
       type: credeb.tipo
     };    
     const response = await fetch('http://localhost:3333/transactions',
     {
         method:'POST',
         headers:{
           'Content-Type': 'application/json',          
         },
         body: JSON.stringify(body),
     });
      const responseData = await response.json(); 
      await loadTransaction()       
    } catch(error){
      console.log(error)
    }
  }  
   
  async function handleEditarUser(){
   try{
    if(!categoriaTrans || !descricaoTrans || !valorTrans || !categoriaTrans || !credeb.tipo){
      return;
    }
    const diaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
    const new_week = new Date(dataTrans);
    const week = new_week.getDay();    
    const body =
    {
      date: dataTrans,
      week_day: diaSemana[week],
      descryption: descricaoTrans,
      value: valorTrans,
      category: categoriaTrans,
      type: credeb.tipo
    };    
    const response = await fetch(`http://localhost:3333/transactions/${mostrarModalEdit.id}`,
    {
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify(body),
    });
     await response.json();
     await loadTransaction()   
   } catch(error){
     console.log(error)
   }
  }
  return (
      <div className='modal'>        
        <div className='modal-content backdrop'>        
          <div className = "titulo-modal modal-container"> 
            <h1>{mostrarModalEdit ? 'Editar': 'Adicionar'} Registro</h1>
            <span className="close-icon"  onClick= {()=> mostrarModalEdit ?setMostrarModalEdit(false) : setMostrarModal(false)}>X</span> 
          </div>            
          <div className="form-label">
              <div className="btn-ent-sai">
                <button className={`btn-ent ${mudarBtnCredito}`} id= "credit-button" name="tipo" onClick={handletipo} value="credit">Entrada</button>               
                <button className={`btn-sai ${mudarBtnDebito}`} id= "debit-button" name="tipo" onClick={handletipo} value="debit">Saída</button>
              </div>             
            <form className="form-input" onSubmit={handleSubmit}>             
              <div className="form-label">
                <label htmlFor="valor">Valor</label>
                <input 
                  type="number"
                  id="valor" 
                  name="valor" 
                  value={valorTrans} 
                  onChange={(e) => setValorTrans(e.target.value)} 
                  className="input-modal"
                />              
              </div>                   
              <div className="form-label">
                <label htmlFor="categoria">Categoria</label>       
                <input 
                  type="text" 
                  id="categoria" 
                  name="categoria" 
                  value={categoriaTrans} 
                  onChange={(e)=> setCategoriaTrans(e.target.value)} 
                  className="input-modal"
                />              
              </div>                     
              <div className="form-label">       
                <label htmlFor="data">Data</label>       
                <input 
                  type="date" 
                  id="data"                  
                  name="data" 
                  value={dataTrans} 
                  onChange={(e) => setDataTrans(e.target.value)} 
                  className="input-modal"
                  placeholder="dd/mm/aaa"
                />              
              </div>             
              <div className="form-label">
                <label htmlFor="descricao">Descrição</label>        
                <input 
                  type="text" 
                  id="descricao" 
                  name="descricao" 
                  value={descricaoTrans} 
                  onChange={(e)=> setDescricaoTrans(e.target.value)}
                  className="input-modal"
                />              
              </div>               
              <button type= "submit" onClick = {() =>
                 mostrarModalEdit ? handleEditarUser(): handleRegisterUser()}
                 className="btn-confirmar btn-insert">
                 {mostrarModalEdit ? 'Editar': 'Adicionar'} Registro
              </button>  
                       
            </form>  
          </div>        
      </div>
    </div>
  );
}  
export default ModalCarrinho;
  