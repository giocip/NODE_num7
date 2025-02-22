# num7 - SUPREME PRECISION GENERAL PURPOSE ARITHMETIC-LOGIC DECIMAL LIBRARY PACKAGE FOR JAVASCRIPT LANGUAGE
## _DESCRIPTION AND DOC_

- _**`Num`**_ is a lightweight floating point numeric class for arbitrary precision results with always supreme precision.

Easy to use like school math and WITHOUT IEEE754 ISSUES or -0 FAILURES, it can be deployed  
for web e-commerce developing, accounting apps and general math programs included financial ones.  
Fairly portable to Python one (and vice-versa) also a Node.js system can work with almost num7 capability.  

---

## Installation num7 package

### Using ...

- To install _**`num7 package`**_ using `...`, enter the following:

  ```javascript
  ...  //win
  ... //linux
  ```

- Ok!

---

## HOW TO USE (integer numeric strings (ex. '2.0') MUST BE SUFFIXED WITH .0): 

  --- CALCULATOR MODE ---   

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
    SUM:               > cart = ['19.32','18.37','15.13']; calc.sum(cart).toString()     	   //new Num('52.82')  
    MEAN:              > cart = ['19.32','18.37','15.13']; calc.mean(cart).Round().toString() //new Num('17.61')  
    MIN:               > cart = ['19.32','18.37','15.13']; calc.min(cart).toString()   //new Num('15.13')  
    MAX:               > cart = ['19.32','18.37','15.13']; calc.max(cart).toString()  //new Num('19.32')  
    EXP:               > calc.mul('-5.3e1024', '2.1e1024').Num2exp()                 //'-1.113e2049'  
    REPL:              > a = new calc('0.1'); b = new calc('0.2'); calc.add(a, b).toString() //0.3

## CODING:  
	> num7 = require("./num7"); Num = num7.Num; calc = num7.Num; //IMPORT num7 LIBRARY 
 
(=) assignment:  

	> a = new Num('3.0'); b = new Num('5.0'); c = new Num('0.0'); //
	> console.log('a =', a.toString(), 'b =', b.toString(), 'c =', c.toString()) //a = 3.0 b = 5.0 c = 0.0 

(+) adding:  

	> R = a.Add(b).Add(c); console.log(R.toString()) //8.0  
	> a = new Num('0.1'); b = new Num('0.2'); c = new Num('0.0'); console.log(a.Add(b).Add(c).toString()) //0.3  
 
(-) subtracting:  

	> a = new Num('0.1'); b = new Num('0.2'); c = new Num('0.3');  
	> console.log(a.Add(b).Sub(c).toString()) //0.0  
	> R = new Num('-3.99').Sub(new Num('-5.20')).Sub(new Num('+3.01')); console.log(R.toString()) //-1.8  

(*) multiplying:  

	> new Num('-3.99').Mul(new Num('-5.20')).Mul(new Num('+3.01')) //-3.99 * (-5.20) * (+3.01 ) = new Num('62.45148')

(/) dividing (80 decimal digits default gets only for division operation):  

	> new Num('3.0').Div(new Num('5.7')) //3 : 5.7 = new Num('0.52631578947368421052631578947368421052631578947368421052631578947368421052631578')  

Division precision (ex. 128 decs) may be specified as parameter after numeric string as: 
 	    
	> new Num('3.0', 128).Div(new Num('5.7', 128)) //3 : 5.7 = new Num('0.52631578947368421052631578947368421052631578947368421052631578947368421052631578947368421052631578947368421052631578947368421052')  

(// % operators by divmod function) integer division and remainder:  

	> a = new Num('14.0'); b = new Num('4.0') //  
	> QR = Num.divmod(a, b); console.log('Quotient =', QR[0].toString(), 'Remainder =', QR[1].toString())   //Quotient = 3.0 Remainder = 2.0  

(divmod function) floating division and remainder:  

	> a = new Num('10.123456789'); b = new Num('2.0') // 
	> QR = Num.divmod(a, b); console.log('Quotient =', QR[0].toString(), 'Remainder =', QR[1].toString())   //Quotient = 5.0 Remainder = 0.123456789  
 
(sqrt) square root function: 

	> a = new Num('123_456_789.1234567890123456789'); root = a.Sqrt() // new Num('11111.11106611111096998611053449930232404576951925017079015206589094347963821409843324')  
	> console.log('result digits number Array =>', root.Len()) //result digits number Array => (5, 80)  


(**) power pow function:  

	> a = new Num('2.22123').Pow(64); console.log(a.toString()) //# 15204983311631674774944.65147209888660757554174463321311015807893679105748958794491681177995203669698667160837739445605536688871012507194541849848681968140805876570485027380472936734094801420552285940765338219588362327695177798251793912104057999943308320501195784173135380826413054938730768027747418766018606636039075568645106645889100039914241  
	> console.log(a.Len().toString())           //(23, 320) digits len Array  
	> console.log(new Num(Num.pi).toString())  //3.141592654  
	> console.log(Num.pow(new Num(Num.pi), 8).toString()) //Num('9488.531025982131642534428505085353941520356351078169077371202330414440366336')  

logic in, not in, is, is not, LT, LE, GT, GE, EQ, NE and relational operators (and, or, not).  

(in):  

	> L = [new Num('0.1'), new Num('1.0'), new Num('5.5'), new Num('-3.0'), new Num('-2.9'), new Num('-3.0001'), new Num('2.2')]   
	> Num.in(L, new Num('-3.0001'))   //true
 	> Num.in(L, new Num('-3.00001')) //false
  	> new Num('-3.0001').In(L)	//true

(not_in):

 	> Num.not_in(L, new Num('-3.0001'))   //false
  	> Num.not_in(L, new Num('-3.00001')) //true
   	> new Num('-3.0001').Not_in(L)	    //false

(is, is_not):

	> M = new calc('0.0'); Num.is(new Num('0.0'), M)    //false
 	> M = new calc('0.0'); Num.is_not(M.Inc('0.1'), M) //false
  	> M; N = M; N.Dec('0.1'); Num.is(N, M) 	   	  //true
   	> N.Is(M) 	//true  
    > N.Is_not(M)  //false
  
 LT, LE, GT, GE, EQ, NE (< <= > >= == !=)

	> a = new Num('0.0'); b = new Num('0.1'); c = new Num('-0.2') 
 	> a.LT(b); a.LT(c); b.LT(c)    //true false false 
  	> a.LE(b); a.LE(c); b.LE(c)   //true false false 
   	> a.GT(b); a.GT(c); b.GT(c)  //false true true 
    > a.GE(a); a.GE(c); b.GE(c) //true true true 
    > c.EQ(new Num('-2.0').Mul(b)); a.EQ(c.Add(b.Mul('2.0'))); a.NE(a.Add(b).Add(c)) //true true true 
    > a.And(b); a.Or(b); a.Not() //false true true 
	> a.And(b) ? true : false   //false
 	> a.Or(b)  ? true : false  //true

  (+ - unary operators)

	> new Num('+2.5521') 			       //Num('2.5521')  
	> new Num('-3.3321') 			      //Num('-3.3321')  
	> new Num('+2.5521').Add(new Num('-3.3321')) //Num('-0.78')  

 On a given variable the following arithmetic methods are available:

	//variable arithmetics  
	num7 = require("./num7"); Num = num7.Num; 
	
	a = new Num('10.25')  
	console.log(a.toString())       //10.25  
	a.Inc()        //increment (default) by one  
	console.log(a.toString())       //11.25   
	a.Dec(2)       //decrement (optional) 2 units  
	console.log(a.toString())       //9.25  
	a.Incmul()     //multiply (default) 10 times  
	console.log(a.toString())       //92.5  
	a.Decdiv(100)  //x100 (optional) division  
	console.log(a.toString())       //0.925  
	a.Clear()      //a variable set to zero   
	console.log(a.toString())       //0.0    

EVEN ODD numbering methods:
	
	num7 = require("./num7"); Num = num7.Num; 
	
	a = new Num(6); b = new Num(3); c = new Num('3.14')  
	console.log(a, 'INTEGER =>', a.Is_numint(), 'EVEN =>', a.Is_numeven())   //6.0 INTEGER => true EVEN => true  
	console.log(b, 'INTEGER =>', b.Is_numint(), 'ODD  =>', b.Is_numodd())   //3.0 INTEGER => true ODD  => true 
	console.log(c, 'FLOAT  =>', c.Is_numfloat())                           //3.14 FLOAT  => true     
	
# Advanced logic programming snippet

LOOP EXAMPLE >

	num7 = require("./num7"); Num = num7.Num; 
	i = new Num(0) 
	while (i.LT(new Num('1.0'))) {
	    i.Inc('0.1')                //i += Num('0.1')
	    if (i.LE(new Num('0.5'))) continue
	    console.log(i.toString()) //0.6, 0.7, 0.8, 0.9, 1.0  
	} 
	while (i.Is_true()) {
	    i.Dec('0.1')                //i -= Num('0.1') 
	    if (i.GE(new Num('0.5'))) continue
	    console.log(i.toString()) //0.4 0.3 0.2 0.1 0.0  
	} 

ROUNDING AND ACCOUNTING >

	num7 = require("./num7"); Num = num7.Num; 
	p = new Num('11.19')                          //PRICE -Toslink cable for soundbar  
	pd = Num.round(p.F_price_over(-7))           //PRICE DISCOUNTED 7%
	d = Num.round(p.Sub(pd))                    //DISCOUNT
	p_noTAX = Num.round(p.F_price_spinoff(22)) //ITEM COST WITHOUT TAX 22%  
	TAX = Num.round(p.Sub(p_noTAX))           //TAX 22% 
	console.log('price=' + pd.toString() + ' discount=' + d.toString() + ' COST=' + p_noTAX.toString() + ' TAX=' + TAX.toString()) //price=10.41 discount=0.78 COST=9.17 TAX=2.02

