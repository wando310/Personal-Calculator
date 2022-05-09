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

//Funções gerais
//Função para recebimento dos números
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
    console.log(`Resultado: ${result}`); 
    showResults()
}

//Função para apagar equação e resultados
function clickClearAll(){
    pointController = true;
    resultToString = '';
    equationToCalc = '';
    console.log(`Equação zerada! ${equationToCalc}`);
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
    console.log(`equationToCalc: ${equationToCalc}`);
    console.log(`equationToShow: ${equationToShow}`);
    generalEquation.innerHTML = equationToShow;
    generalResult.innerHTML = resultToString;
}

