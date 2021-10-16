import './style.css';
import lixo from "../assets/lixo.svg";
import editar from "../assets/editar.svg";


function Tabela({item,setConfirmDel, setMostrarModalEdit}){
    return(
        <div key={item.id} className="tabela-geral">
            <div  key={item.id} className="tabela-interna">
                <ul key={item.id} className="tabela-ul">
                    <li className="tabela-li" >
                        {item.date}
                    </li>
                    <li className="tabela-li">
                        {item.week_day}
                    </li>
                    <li className="tabela-li">
                        {item.descryption}
                    </li>
                    <li className="tabela-li">
                        {item.category}
                    </li>
                    <li className = {`tabela-li  ${ item.type === 'credit'? 'color-credit': 'color-debit'}`}>
                        {item.value}
                    </li>                          
                </ul>
                <div key={item.id} className="linhaGrande"></div>
            </div>  
            <div className="btn-tabela">                     
            <img className="btn-left"  key= {item.id}  src={editar} onClick={()=> setMostrarModalEdit(item)}/>
            <img className="btn-right" key= {item.id}  src={lixo}   onClick={()=> setConfirmDel(item.id)}/>                     
            </div>
            
        </div>                   

    );
}
export default Tabela;