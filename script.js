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

// Arrays de números, operadores e resultados (Não inclue o '.', backspace e delete)
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ['/','*','-','+','%'];
const results = ['=','Enter'];

//Funções para receber eventos do teclado

//Monitorador do teclado

document.body.addEventListener('keyup', (e)=>{
    //Condicionais para botões pressionados - Cor e funcionamento

    if(numbers.includes(e.key)){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickNumber(e.key);
    }if(operators.includes(e.key)){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickOperator(e.key);
    }if(results.includes(e.key)){
        let keyElement = document.querySelector(`button[data-key='=']`);
        colorButton(keyElement); 
        clickResult(); 
    }if((e.key === '.')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickPoint(e.key);
    }if((e.key === 'Backspace')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickDelete();
    }if((e.key === 'Delete')){
        let keyElement = document.querySelector(`button[data-key='${e.key}']`);
        colorButton(keyElement);
        clickClearAll();
}});

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
    equationToCalc += n;
    let pressedNumberButton = true;
    showResults();
}

//Função para recebimento do ponto '.'
function clickPoint(p){
    if(pointController === true){
        equationToCalc += p;
        pointController = false;
        showResults();
    }
}

//Função para recebimento dos operadores
function clickOperator(o){
    //Condicionais para caso o operador seja deletado
    //As duas equação toShow e Tocalc são síncronas, ou seja, basta ser verificada uma nesta situação
    
    if((operators.includes(equationToCalc[equationToCalc.length-1])) && (!numbers.includes(equationToCalc[equationToCalc.length-1]))){
        equationToCalc = equationToCalc.substring(0, equationToCalc.length -1);
        equationToCalc += o;
        pointController = true;
        showResults();
    }else if((equationToCalc[equationToCalc.length-1]) === '.'){
        showResults();
    }
    else{
        equationToCalc += o;
        pointController = true;
        showResults();
    }
}

//Função para apagar números
function clickDelete(){
    //Filtro caso o '.' seja apagado
    equationToCalc[equationToCalc.length - 1] === '.' ? pointController = true: ''
    
    operators.includes(equationToCalc[equationToCalc.length-1]) ? pointController = false : ''
    
    equationToCalc = equationToCalc.substring(0, equationToCalc.length -1);
    showResults();
}

//Função para cálcula e mostrar resultado
function clickResult(){
    result = Function("return " + equationToCalc)(); //Função eval() substituida pela Function() por questões de segurança.
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
