# NODE_num7
num7 - SUPREME PRECISION GENERAL PURPOSE ARITHMETIC-LOGIC DECIMAL LIBRARY PACKAGE FOR JAVASCRIPT LANGUAGE 

                       > num7 = require("./num7"); Num = num7.Num; calc = num7.Num; //IMPORT num7 LIBRARY 
    ADDITION:          > calc.add('-5.3', '2.1').toString()    //new Num('-3.2')  
    SUBTRACTION:       > calc.sub('-5.3', '2.1').toString()    //new Num('-7.4')  
    MULTIPLICATION:    > calc.mul('-5.3', '2.1').toString()    //new Num('-11.13')  
    DIVISION:          > calc.div('-5.3', '2.1').toString()    //new Num('-2.52380952380952380952380952380952380952380952380952380952380952380952380952380952')  
    M+:                > M = new calc('0.0'); M.Inc('3.0'); M.Inc('3.3'); M.Inc('3.7'); console.log(M.toString()) //10.0  
    M-:                >                  M.Dec('5.0'); M.Dec('3.3'); M.Dec('1.5'); console.log(M.toString()) //0.2  
    MC:                > M.Clear(); console.log(M.toString())  //0.0  
    INT   DIV AND REM: > calc.divmod('5.0', '3.0').toString()  //'1.0,2.0' => Array()  
    FLOAT DIV AND REM: > calc.divmod('5.2', '3.1').toString()  //'1.0,2.1' => Array()  
    POWER:             > calc.pow('-5.3', '2.0').toString()    //new Num('28.09')  
    SQRT:              > calc.sqrt('2.0').toString()           //new Num('1.41421356237309504880168872420969807856967187537694807317667973799073247846210703')  
    ROOT_ith           > calc.root_i('1.860867', 3).toString() //new Num('1.23')  
    ROUND:             > calc.sqrt('2.0').Round(2).toString()  //new Num('1.41')  
    ABSOLUTE VALUE     > calc.abs('-3.0').toString()           //new Num('3.0')  
    SUM:               > cart = ['19.32','18.37','15.13']; calc.sum(cart).toString()     	   //Num('52.82')  
    MEAN:              > cart = ['19.32','18.37','15.13']; calc.mean(cart).Round().toString() //Num('17.61')  
    MIN:               > cart = ['19.32','18.37','15.13']; calc.min(cart).toString()   //Num('15.13')  
    MAX:               > cart = ['19.32','18.37','15.13']; calc.max(cart).toString()  //Num('19.32')  
    EXP:               > calc.mul('-5.3e1024', '2.1e1024').Num2exp()                 //'-1.113e2049'  
    REPL:              > a = new calc('0.1'); b = new calc('0.2'); calc.add(a, b).toString() //0.3
  
