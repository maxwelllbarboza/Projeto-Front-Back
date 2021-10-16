import './style.css';

function Tabelaresumo({creditoResumo, debitoResumo, totalResumo}){
    return(
        <main  className="container-modal">
            <h3 className= "textoModal fonteGrande">Resumo</h3>
            <div className= "resumoModal textoModal fontePequena">
                <span className= "color-escura">Entradas</span>
                <span className="color-credit">{creditoResumo}</span>
            </div>          
            <div className= "resumoModal textoModal fontePequena">
                <span className= "color-escura">Saídas</span>
                <span className= "color-debit">{debitoResumo}</span>
            </div>          
            <div className="linhaPequena"></div>          
            <div className= "resumoModal textoModal fonteMedia">
                <span className= "color-escura">Total</span>
                <span className= "color-total">{totalResumo}</span>
            </div>                          
        </main>
    );
}
export default Tabelaresumo;