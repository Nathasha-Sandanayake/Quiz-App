let level=1;
let sec=0;
let min=0;
let interval=null;
let operators=['+','-','*','/','%'];
let fNumber;
let lNumber;
let selectedOperator;
let answerData=[];
let inseretedAnswer;
let qNumber=0;

//-------------
const selectElement= document.getElementById('level-select');

const secElement= document.getElementById('sec');
const minElement= document.getElementById('min');

const fNumberElement=document.getElementById('f-number');
const lNumberElement=document.getElementById('l-number');
const operatorElement=document.getElementById('op');
const answerElement = document.getElementById('answer');
const qNumberElement = document.getElementById('qNumber');

const correctElement = document.getElementById('c');
const wrongElement = document.getElementById('w');
const skipElement = document.getElementById('s');

const startButtonElement = document.getElementById('start');
const bodyElement = document.getElementById('answer-body');


//-------------

selectElement.addEventListener("change",function(){
level = parseInt(selectElement.value);
});

//-------------
const start = () =>{
   startButtonElement.disabled=true;
   manageTime();
}

const manageTime = () =>{
    min=0;
    sec=0;

    qNumber++;
    if(qNumber>10){
        finalise();
    }

    else{
    qNumberElement.textContent=qNumber;
    sec.textContent='00';
    min.textContent='00';

    generateQuestion(level);

    clearInterval(interval);

   interval = setInterval(() =>{
    sec++;
    if(sec<10){
        //Set time with 0
        secElement.textContent='0'+sec;
    }
    else{
        secElement.textContent=sec +'';
    }
    if(sec==60){
        sec=0;
        min++;
        minElement.textContent='0'+min;
    }
    
    if(min==3){
        min=0;
        skipQuestion();
    }
    
   },1000);
}
}

const generateQuestion = (selectedLevel) =>{

    let maxNumber =10;

    if(selectedLevel==2){
        maxNumber=50;
    }
    else if(selectedLevel==3){
        maxNumber=100;
    }

    fNumber=Math.floor(Math.random()*maxNumber)+1;
    lNumber=Math.floor(Math.random()*maxNumber)+1;

    fNumberElement.textContent=fNumber;
    lNumberElement.textContent=lNumber;

    selectedOperator = operators[Math.floor(Math.random()*5)];
    operatorElement.textContent=selectedOperator;


}

const submitData = ()=>{
    inseretedAnswer = parseInt(answerElement.value);
    let correctAnswer;
    console.log(fNumber,lNumber,selectedOperator,inseretedAnswer);
   if(fNumber && lNumber && selectedOperator){
        switch(selectedOperator){
            case '+':
                correctAnswer=fNumber+lNumber;
                break;
            case '-':
                correctAnswer=fNumber-lNumber;
                break;
            case '*':
                correctAnswer=fNumber*lNumber;
                break;
            case '/':
                correctAnswer=fNumber/lNumber;
                break;
            case '%':
                correctAnswer=fNumber%lNumber;
                break;
            default:
                alert('Something went wrong!');
                break;
                return;
        }
        if(inseretedAnswer==correctAnswer){
           let obj={
            'qnumber':1,
            'time':min+':'+sec,
            'correctAnswer':correctAnswer,
            'userAnswer':inseretedAnswer,
            'firstNumber':fNumber,
            'lastNumber':lNumber,
            'isCorrect':true,
            'isSkipped':false
           }
           answerData.push(obj);
        }
            else{
                let obj={
                    'qnumber':1,
                    'time':min+':'+sec,
                    'correctAnswer':correctAnswer,
                    'userAnswer':inseretedAnswer,
                    'firstNumber':fNumber,
                    'lastNumber':lNumber,
                    'isCorrect':false,
                    'isSkipped':false
                   }
                   answerData.push(obj);
            }
           
            answerElement.value='';
            manageTime();
            statistics();
            console.log(answerData);
        }
     else{
        alert('Try again');
     }
}

const skipQuestion = () =>{
    if(qNumber>10){
        finalise();
        return;
    }else{let obj={
        'qnumber':1,
        'time':min+':'+sec,
        'correctAnswer':correctAnswer,
        'userAnswer':inseretedAnswer,
        'firstNumber':fNumber,
        'lastNumber':lNumber,
        'isCorrect':false,
        'isSkipped':true
       }
       
       answerData.push(obj);
       manageTime();
       statistics();
    }
    
}

const statistics=() => {
    let w=0;
    let c=0;
    let s=0;

    for(x=0;x<answerData.length;x++){
       let temp = answerData[x];
       if(temp.isCorrect){
        c++;
       }
       else{
        w++;
       }
       if(temp.isSkipped){
           s++;
       }
    }

    correctElement.textContent=c;
    wrongElement.textContent=w;
    skipElement.textContent=s;

}

const reset=()=>{
startButtonElement.disabled=false;
qNumber=0;
qNumberElement.textContent=qNumber;
answerData=[];
statistics();
selectedOperator=undefined;
clearInterval(interval);
minElement.textContent='00';
secElement.textContent='00';
fNumberElement.textContent='?';
lNumberElement.textContent='?';

}

const finalise=()=>{
    answerData.forEach(data => {
       const row =document.createElement('tr');
       
       const cell1=document.createElement('td');   
       cell1.textContent=data.firstNumber;
         row.appendChild(cell1);
       
       const cell2=document.createElement('td');
       cell2.textContent=data.lastNumber;
         row.appendChild(cell2);
       
       const cell3=document.createElement('td');
       cell3.textContent=data.correctAnswer;
         row.appendChild(cell3);
       
       const cell4=document.createElement('td');
       cell4.textContent=data.userAnswer;
         row.appendChild(cell4);
       
       const cell5=document.createElement('td');
       cell5.textContent=data.time;
         row.appendChild(cell5);
       
       const cell6=document.createElement('td');
       cell6.textContent=data.isCorrect;
         row.appendChild(cell6);
       
       const cell7=document.createElement('td');
       cell7.textContent=data.qNumber;
         row.appendChild(cell7);
       
       
       const cell8=document.createElement('td');
       cell8.textContent=data.isSkipped;    
         row.appendChild(cell8);

         bodyElement.appendChild(row);
    });
}