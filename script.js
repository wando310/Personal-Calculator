//Variáveis de Controle de interface
let generalResult = document.querySelector('.previous-operand');
let generalEquation = document.querySelector('.current-operand');

//Variáveis de controle geral
//Variáveis para cálculo, recebimento e demonstração na tela
let result = '';
let resultToString = '';
let equationToCalc = '';
let equationToShow = '';

//Variáveis para posição e formatação do ponto '.'
let pointController = true;

//Funções para receber eventos do teclado

//Monitorador do teclado

document.body.addEventListener('keyup', (e)=>{
    //Condicionais para botões pressionados - Cor e funcionamento
    if((e.key === '1' ) || (e.key === '2') || (e.key === '3') || (e.key === '4') || (e.key === '5') ||
    (e.key === '6') || (e.key === '7') || (e.key === '8') || (e.key === '9') || (e.key === '0')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickNumber(e.key);
    } if((e.key === '/') || (e.key === '*') || (e.key === '-') || (e.key === '+') || (e.key === '%')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickOperator(e.key);
    } if((e.key === '.')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickPoint(e.key);
    } if((e.key === 'Delete')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickClearAll();
    } if((e.key === 'Backspace')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickDelete();
    } if((e.key === '=') || (e.key === 'Enter')){
        let keyElement = document.querySelector(`button[data-key='=']`);
        colorButton(keyElement); 
        clickResult(); 
    }
});

//Funções gerais
//Função para recebimento dos números

function colorButton(keyElement){
    keyElement.classList.add('active');
    setTimeout(() =>{
        keyElement.classList.remove('active');
    }, 300);
}

//Função para recebimento de números de 0 a 1
function clickNumber(n){
    equationToCalc = equationToCalc + n;
    showResults();
}

//Função para recebimento do ponto '.'
function clickPoint(p){
    if(pointController === true){
        equationToCalc = equationToCalc + p;
        pointController = false;
        showResults();
    }
}

//Função para recebimento dos operadores
function clickOperator(o){
    //Condicionais para caso o operador seja deletado
    //As duas equação toShow e Tocalc são síncronas, ou seja, basta ser verificada uma nesta situação
    if(((equationToCalc[equationToCalc.length-1] !== o) || (equationToCalc[equationToCalc.length-1] === o))&&((equationToCalc[equationToCalc.length-1] !== '0')&&(equationToCalc[equationToCalc.length-1] !== '1')
    &&(equationToCalc[equationToCalc.length-1] !== '1')&&(equationToCalc[equationToCalc.length-1] !== '2')&&(equationToCalc[equationToCalc.length-1] !== '3')&&(equationToCalc[equationToCalc.length-1] !== '4')
    &&(equationToCalc[equationToCalc.length-1] !== '5')&&(equationToCalc[equationToCalc.length-1] !== '6')&&(equationToCalc[equationToCalc.length-1] !== '7')&&(equationToCalc[equationToCalc.length-1] !== '8')
    &&(equationToCalc[equationToCalc.length-1] !== '9'))){
    
        equationToCalc = equationToCalc.substring(0, equationToCalc.length -1);
        equationToCalc = equationToCalc + o;
        pointController = true;
        showResults();
    } else{
        equationToCalc = equationToCalc + o;
        pointController = true;
        showResults();
    }

}

//Função para apagar números
function clickDelete(){
    //Filtro caso o '.' seja apagado
    if(equationToCalc[equationToCalc.length - 1] === '.'){
        pointController = true;
    }else if((equationToCalc[equationToCalc.length - 1] === '%') || (equationToCalc[equationToCalc.length - 1] === '/') || (equationToCalc[equationToCalc.length - 1] === '*') || (equationToCalc[equationToCalc.length - 1] === '-') 
    || (equationToCalc[equationToCalc.length - 1] === '+')){
        pointController = false;
    }
    equationToCalc = equationToCalc.substring(0, equationToCalc.length -1);
    showResults();
}

//Função para cálcula e mostrar resultado
function clickResult(){
    result = eval(equationToCalc); //A função eval retornará como string
    resultToString = result.toString();
    //console.log(`Resultado: ${result}`); 
    showResults()
}

//Função para apagar equação e resultados
function clickClearAll(){
    pointController = true;
    resultToString = '';
    equationToCalc = '';
    //console.log(`Equação zerada! ${equationToCalc}`);
    showResults();
}

//Função para mostrar os resultados
function showResults(){ 
    let equationToShow = '';
    for(let i = 0; i <= (equationToCalc.length -1); i++){
        if(equationToCalc[i] === '/'){
            equationToShow = equationToShow + '÷';
        }else{
            equationToShow = equationToShow + equationToCalc[i];
        }
    }
    //console.log(`equationToCalc: ${equationToCalc}`);
    //console.log(`equationToShow: ${equationToShow}`);
    generalEquation.innerHTML = equationToShow;
    generalResult.innerHTML = resultToString;
}

