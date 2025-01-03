const calculate = {
    arrayOfInputs : [], 
    operators : [],
    calculator : (inarr)=>{
        var numstoBeCalc = [];
        for (let i = 0; i < inarr.length; i++) {
            var eacharr = inarr[i];
            var concEacharr = '';
            for (let j = 0; j < eacharr.length; j++) {
                concEacharr = concEacharr + eacharr[j];
            }
            numstoBeCalc[i] = Number(concEacharr);            
        }
        console.log(numstoBeCalc, calculate.operators)
        var answer = numstoBeCalc[0];
        for (let i = 1; i < numstoBeCalc.length; i++) {
            if(calculate.operators[i - 1] === '+'){
                answer = answer + numstoBeCalc[i];
            }else if(calculate.operators[i-1] == '-'){
                answer = answer - numstoBeCalc[i];
            }else if(calculate.operators[i-1] == '*'){
                answer = answer * numstoBeCalc[i];
            }else if(calculate.operators[i-1] == '/'){
                answer = answer/numstoBeCalc[i];
            }else{
                console.log("unknown sign");
            }          
        }
        numstoBeCalc =[];
        return answer
    }
}


const view = {
    isFirst : true,
    inputarray : [],
    currentinpview : '',
    addview : (val , type)=>{
        if (type === 'number'){
            console.log(val, type, view.isFirst)
            if(view.isFirst){
                view.currentinpview = val;
                console.log(view.currentinpview)
                view.inputarray[0]= val;
                console.log(view.inputarray)
                view.isFirst = false;
            }else if(view.isFirst === false){
                view.inputarray.push(val);
                console.log(view.inputarray)
                view.currentinpview = view.currentinpview + val;
                
            }
        }else if (type == 'operator' && !view.isFirst){
            if(!view.isFirst){
                if(view.inputarray){
                    calculate.arrayOfInputs.push(view.inputarray);
                    calculate.operators.push(val);
                    console.log(calculate.operators)
                    view.inputarray = [];
                    view.currentinpview = view.currentinpview + " " + val + " ";
                }
            }else{
                return
            }
        }else if (type == 'equal'){
            calculate.arrayOfInputs.push(view.inputarray);
            console.log(calculate.arrayOfInputs, calculate.operators)
            view.currentinpview = calculate.calculator(calculate.arrayOfInputs);
            view.inputarray = String(view.currentinpview).split('');
            calculate.arrayOfInputs = [];
            calculate.operators = []
        }else if (type == 'delete'){
            if(view.currentinpview){
                view.currentinpview = '';
                calculate.arrayOfInputs =[];
                calculate.operators = [];
                view.inputarray = [];
                view.isFirst = true;
            }
        }
        var input = document.getElementById('input');
        input.innerHTML = view.currentinpview;
    }
}

clickhandler= (e)=>{
    const value = e.target.id;
    const type =whattype(value);
    console.log ('type of operator' + type)
    view.addview(value, type);
    console.log(calculate.arrayOfInputs)
}
whattype = (val)=>{
    const numbers = ['1', '2', '3', '4','5','6','7','8','9','0','+','-','*','/','=','<-'];
    const numindex = numbers.indexOf(val);
    console.log('index of button' + numindex)
    if (numindex >= 0 && numindex < 10){
        return 'number'
    }else if(numindex >= 10 && numindex < 14){
        return 'operator'
    }else if(numindex === 14){
        return 'equal'
    }else if (numindex === 15){
        return 'delete'
    }       
}