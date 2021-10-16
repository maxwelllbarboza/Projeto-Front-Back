import './style.css';

function Abrimodaldelete({handleDeleteUser, setConfirmDel,confirmeDel}){    
    return(             
        <div className="modal-confirm">
            <h5>Apagar Ítem</h5>
            <div className= "btn-del">
                <button className= "btn-sim" onClick={()=> handleDeleteUser(confirmeDel)}>Sim</button>
                <button className= "btn-nao" onClick={()=> setConfirmDel(false)}>Não</button>
            </div>
        </div>
    );
}
export default Abrimodaldelete;