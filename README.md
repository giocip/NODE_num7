# num7 - SUPREME PRECISION GENERAL PURPOSE ARITHMETIC-LOGIC DECIMAL LIBRARY PACKAGE FOR JAVASCRIPT LANGUAGE
## _DESCRIPTION AND DOC_

- _**`Num`**_ is a lightweight floating point numeric class for arbitrary precision results with always supreme precision.

Easy to use like school math and WITHOUT IEEE754 ISSUES or -0 FAILURES, it can be deployed  
for web e-commerce developing, accounting apps and general math programs included financial ones.  
Fairly portable to Python one (and vice-versa) also a Node.js system can work with almost num7 capability.  

---

## Installation num7 package

### Using npm

- To install _**`num7 package`**_ using `npm`, enter the following:

  ```javascript
  npm install num7.js  //win
  npm install num7.js //linux
  ```

- Ok!

---

## HOW TO USE (integer numeric strings (ex. '2.0') MUST BE SUFFIXED WITH .0): 

  --- CALCULATOR MODE ---   

                       > num7 = require('num7.js'); Num = num7.Num; calc = num7.Num; //IMPORT num7 LIBRARY
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
	> num7 = require('num7.js'); Num = num7.Num; calc = num7.Num; //IMPORT num7 LIBRARY 
 
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

	> a = new Num('2.5521') //Num { type: 'Num', n2: '', n0: '2', n1: '5521', L_n0: 1, L_n1: 4, n: '2.5521', d: 80 }
	> console.log(a.toString());               //2.5521
	> console.log(a.Minus().toString());      //-2.5521
	> console.log(a.Plus().toString());      //2.5521
	> console.log(a.Invsign().toString());  //-2.5521
	> console.log(a.Invsign().toString()); //2.5521

  bitwise operators code:

 	num7 = require('num7.js'); Num = num7.Num;
	console.log('--- (&) AND ---')  
	op1 = new Num('3.0')  
	op2 = 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000011 3.0
	op1 = op1.Andb(op2)                                                         //AND
	console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2)            //00000101 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000001 1

	console.log('--- (|) OR  ---')  
	op1 = new Num('3.0')  
	op2 = 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000011 3.0
	op1 = op1.Orb(op2)                                                          //OR
	console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2)            //00000101 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000111 7
 
	console.log('--- (^) XOR ---')  
	op1 = new Num('3.0')  
	op2 = 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000011 3.0
	op1 = op1.Xorb(op2)                                                         //XOR
	console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2)            //00000101 5
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000110 6

	console.log('--- (<<) LEFT SHIFT -X10 MULTIPLIER ---')  
	op1 = new Num('1.0')  
	op2 = 2
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00000001 1.0
	op1 = op1.Shift(op2)                                                        //LEFT SHIFT -X10 MULTIPLIER
	console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2)            //00000010 2  
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //01100100 100.0 

	console.log('--- (>>) RIGHT SHIFT -X10 DIVIDER ---')  
	op1 = new Num('250.0')  
	op2 = -1
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //11111010 250.0  
	op1 = op1.Shift(op2)                                                        //RIGHT SHIFT -X10 DIVIDER  
	console.log(`${op2}`)                                                       //-1 (decimal)
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00011001 25.0

	console.log('--- (~) NOT ---')  
	op1 = new Num('10.0')  
	console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00001010 10.0   
	op2 = op1.Notb()                                                            //(~) NOT 
	console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2.toString()) //00000101 5.0  
  
 On a given variable the following arithmetic methods are available:

	//variable arithmetics  
	num7 = require('num7.js'); Num = num7.Num; 
	
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
	
	num7 = require('num7.js'); Num = num7.Num; 
	
	a = new Num(6); b = new Num(3); c = new Num('3.14')  
	console.log(a, 'INTEGER =>', a.Is_numint(), 'EVEN =>', a.Is_numeven())   //6.0 INTEGER => true EVEN => true  
	console.log(b, 'INTEGER =>', b.Is_numint(), 'ODD  =>', b.Is_numodd())   //3.0 INTEGER => true ODD  => true 
	console.log(c, 'FLOAT  =>', c.Is_numfloat())                           //3.14 FLOAT  => true     
	
# Advanced logic programming snippet

LOOP EXAMPLE >

	num7 = require('num7.js'); Num = num7.Num; 
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

	num7 = require('num7.js'); Num = num7.Num; 
	p = new Num('11.19')                          //PRICE -Toslink cable for soundbar  
	pd = Num.round(p.F_price_over(-7))           //PRICE DISCOUNTED 7%
	d = Num.round(p.Sub(pd))                    //DISCOUNT
	p_noTAX = Num.round(p.F_price_spinoff(22)) //ITEM COST WITHOUT TAX 22%  
	TAX = Num.round(p.Sub(p_noTAX))           //TAX 22% 
	console.log('price=' + pd.toString() + ' discount=' + d.toString() + ' COST=' + p_noTAX.toString() + ' TAX=' + TAX.toString()) //price=10.41 discount=0.78 COST=9.17 TAX=2.02

OUTPUT FORMATTING AND LOCALIZATION >

	num7 = require('num7.js'); Num = num7.Num; 
	
	const userLang = navigator.language || navigator.userLanguage; 
	console.log(userLang);  // e.g., 'it-IT' "en-US", "fr-FR" 
	//calculating banking loan 
	asset = new Num('100_000.0'); rate = new Num('6.5'); years = new Num('20.0')
	monthly_payment = Num.f_fund_fr(asset, rate, years).Round()
	
	const formatted_USD_it = new Intl.NumberFormat("en-US", {
	    style: 'currency',
	    currency: 'USD',
	}).format(monthly_payment);
	console.log(formatted_USD_it, ' (USD)');  //$756.30  (USD)
	
	const formatted_EUR_it = new Intl.NumberFormat('it-IT', {
	    style: 'currency',
	    currency: 'EUR',
	}).format(monthly_payment);
	console.log(formatted_EUR_it, '(EUR)'); //756,30 € (EUR)

ROUNDING TYPES >

	num7 = require('num7.js'); Num = num7.Num;
	
	//''' Num floor rounding '''  
	console.log(''.padStart(20, '-') + ' Num floor rounding')  
	n = new Num(Num.pi)                            // 3.141592654  
	console.log(n, n.Round_floor(2).toString())   // 3.14  
	n = new Num(Num.pi).Invsign()               //-3.141592654  
	console.log(n, n.Round_floor(2).toString()) //-3.15
	n = new Num(Num.pi).Sub(3)                     // 0.141592654  
	console.log(n, n.Round_floor(2).toString())   // 0.14  
	n = new Num(Num.pi).Invsign().Add(3)        //-0.141592654  
	console.log(n, n.Round_floor(2).toString()) //-0.15  
	
	//''' Num ceil rounding '''  
	console.log(''.padStart(20, '-')  + ' Num ceil rounding')  
	n = new Num(Num.pi)                          // 3.141592654  
	console.log(n, n.Round_ceil(2).toString())  // 3.15  
	n = new Num(Num.pi).Invsign()             //-3.141592654  
	console.log(n, n.Round_ceil(2).toString())//-3.14  
	n = new Num(Num.pi).Sub(3)                    // 0.141592654  
	console.log(n, n.Round_ceil(2).toString())   // 0.15  
	n = new Num(Num.pi).Invsign().Add(3)       //-0.141592654  
	console.log(n, n.Round_ceil(2).toString()) //-0.14  
	
	//''' Num standard rounding '''  
	console.log(''.padStart(20, '-') + ' Num standard rounding')  
	n = new Num(Num.pi)                      // 3.141592654  
	console.log(n, n.Round().toString())    // 3.14  
	n = new Num(Num.pi).Invsign()         //-3.141592654  
	console.log(n, n.Round().toString())  //-3.14  
	n = new Num(Num.pi).Sub(3)               // 0.141592654  
	console.log(n, n.Round(4).toString())   // 0.1416  
	n = new Num(Num.pi).Invsign().Add(3)  //-0.141592654  
	console.log(n, n.Round(4).toString()) //-0.1416  
	
	//''' Num half even rounding '''  
	console.log(''.padStart(20, '-') + ' Num half to even rounding (statistic, zero symmetric)')  
	n = new Num(Num.pi).Round_floor(4)              // 3.1415  
	console.log(n, n.Round_bank(3).toString())     // 3.142  
	n = new Num(Num.pi).Round_floor(4).Invsign() //-3.1415  
	console.log(n, n.Round_bank(3).toString())   //-3.142  
	n = new Num(Num.pi).Sub(3).Round_floor(8)              // 0.14159265  
	console.log(n, n.Round_bank(7).toString())            // 0.1415926  
	n = new Num(Num.pi).Round_floor(8).Invsign().Add(3) //-0.14159265  
	console.log(n, n.Round_bank(7).toString())          //-0.1415926  

PERFORMANCE EVALUATION AND SQUARENESS >

	num7 = require('num7.js'); Num = num7.Num

	tic = performance.now() //Start Time 
	a = new Num('-1.123456789'+'e-100')      //calculating division 10**100... 
	toc = performance.now() //Stop Time
	T1 = ((toc - tic) / 1000).toFixed(6)
	console.log(`a finished sec. ${T1}`) //a finished sec. 0.001129
	
	tic = performance.now() //Start Time 
	b = new Num('-1.123456789').Shift(-100)  //calculating division 10**100... 
	toc = performance.now() //Stop Time
	T2 = ((toc - tic) / 1000).toFixed(6)
	console.log(`b finished sec. ${T2}`) //b finished sec. 0.000739
	
	R = Num.f_perf_time(T1, T2)
	console.log('PCT=>', Num.round(R[0]).toString(), 'SCALE=>', Num.round(R[1]).toString(), 'SQUARENESS=>', a.EQ(b)) //PCT=> 52.77 SCALE=> 0.53 SQUARENESS=> true
	
	//stock exchange assets performance 
	previous = new Num('26.96'); now = new Num('27.27') 
	var_pct = new Num(Num.f_perf(previous, now)).Round()
	console.log(`${(var_pct > 0 ? '+' : '')}${var_pct.toFixed(2)}`) //+1.15

 SCIENTIFIC NOTATION AND HIGH PRECISION RESULTS >

 	num7 = require('num7.js'); Num = num7.Num

	a = new Num('1_000_000_000_000_000_000_000.0') //standard notation  
	b = new Num('1.0e21')                         //scientific notation  
	SUM = a.Add(b)                               //SUM  
	ieee754 = a.Float() + b.Float() //
	console.log('SUM == ieee754', SUM.Int() == Num.int(ieee754), ' SUM =>', SUM.Num2exp()) //SUM == ieee754 True  SUM => 2.0e21  

	a = new Num('1_000_000_000_000_000_000_000.0') //standard notation  
	b = new Num('1.0e21')                         //scientific notation  
	MUL = a.Mul(b)                               //MUL  
	ieee754 = a.Float() * b.Float() //
	console.log('MUL == ieee754', MUL.Int() == Num.int(ieee754), ' MUL =>', MUL.Num2exp()) //MUL == ieee754 True  MUL => 1.0e42  

	a = '1.23456789'  
	b = '9.87654321'  
	MUL = new Num(a).Mul(new Num(b))    //MUL                        
	ieee754 = Number.parseFloat(a) * Number.parseFloat(b)
	console.log('MUL == ieee754', MUL == new Num(String(ieee754)), ' MUL =>', MUL.toString(), Number.parseFloat(a)*Number.parseFloat(b), '=> IEEE754 PRECISION FAILURE!') //MUL == ieee754 False MUL => 12.1932631112635269 12.193263111263525 => IEEE754 PRECISION FAILURE!  

	a = '1.23456789e320'  //scientific notation  
	b = '9.87654321e320'   
	MUL = new Num(a).Mul(new Num(b))    //MUL                        
	ieee754 = Number.parseFloat(a) * Number.parseFloat(b)
	console.log('MUL == ieee754', MUL.toString() == String(ieee754), 'MUL =>', MUL.Num2exp(), Number.parseFloat(a)*Number.parseFloat(b), '=> IEEE754 Infinity FAILURE!') //MUL == ieee754 false MUL => 1.21932631112635269e641 Infinity => IEEE754 Infinity FAILURE!  

	a = '2.0e320' //scientific notation  
	b = '3.0e-320'  
	MUL = new Num(a).Mul(new Num(b))    //MUL                        
	ieee754 = Number.parseFloat(a) * Number.parseFloat(b)
	console.log('MUL == ieee754', MUL.toString() == ieee754.toString(), 'MUL =>', MUL.Num2exp(), ieee754, '=> IEEE754 Infinity FAILURE!') //MUL == ieee754 false MUL => 6.0e0 Infinity => IEEE754 Infinity FAILURE!  

	a = '1.0e200' //scientific notation  
	b = '5.0e1200'  
	T1 = new Num(a) 
	T2 = new Num(b) 
	DIV = T1.Div(T2, 1200) //DIV, ultra precision (over 80 digits default) floating point division must be specified! 
	ieee754 = Number.parseFloat(a) / (Number.parseFloat(b))
	console.log('DIV == ieee754', DIV.toString() == ieee754.toString(), 'DIV =>', DIV.Num2exp(), ieee754, '=> IEEE754 precision FAILURE!') //DIV == ieee754 false DIV => 2.0e-1001 0 => IEEE754 precision FAILURE!

FLOAT TO NUM CONVERSION LIST ARRAY >

	num7 = require('num7.js'); Num = num7.Num

	L = [1011, 0.0, 9.998412, 7.0, 0.123, -2.0123, 10, 6]
	LN= Num.float2num_list(L)
	for(let i of LN) console.log(i.n)           //['1011.0', '0.0', '9.998412', '7.0', '0.123', '-2.0123', '10.0', '6.0']
	for(let i of LN) console.log(i.toString()) //[Num('1011.0'), Num('0.0'), Num('9.998412'), Num('7.0'), Num('0.123'), Num('-2.0123'), Num('10.0'), Num('6.0')]

SAVE NUMERIC LIST TO DISK FILE >

	num7 = require('num7.js'); Num = num7.Num
	
	L = [1011, 0.0, 9.998412, 7.0, 0.123, -2.0123, 10, 6]
	LN= Num.float2num_list(L)
	for(let i of LN) console.log(i.n)           //['1011.0', '0.0', '9.998412', '7.0', '0.123', '-2.0123', '10.0', '6.0']
	for(let i of LN) console.log(i.toString()) //[Num('1011.0'), Num('0.0'), Num('9.998412'), Num('7.0'), Num('0.123'), Num('-2.0123'), Num('10.0'), Num('6.0')]
	Num.f_filewrite(LN)

READ NUMERIC LIST ARRAY FROM DISK FILE (nums.txt default filename) >

	A = Num.f_fileread(); console.log(A) //(8) ['1011.0', '0.0', '9.998412', '7.0', '0.123', '-2.0123', '10.0', '6.0']


### FAQ 

Q. I usually try to add 0.1 to 0.2 in node with this code:  

	> console.log(0.1 + 0.2) //
	and the result is:  

	> 0.30000000000000004  

How instead can it gets exactly 0.3?  
A. Using Num class >  

	num7 = require("num7.js"); Num = num7.Num; calc = num7.Num 
	console.log(new Num('0.1').Add(new Num('0.2')).toString())  //as calc.add('0.1', '0.2').toString()

Q. I'll get an error when i usually type:  
	
	> new Num(0.1)    
 
	Uncaught Error: Num class constructor => number not valid: 0.1
	
What is wrong?  
A. You must use quotes or string conversion with built-in String function:

	> num7 = require("num7.js"); Num = num7.Num; calc = num7.Num 
	> new Num('0.1')    		   //Num('0.1')  
	> new Num(String(0.1)).toString() //'0.1' 

Q. How can i convert a regular float to a Decimal?  
A. With Num.ieee754() method >  

	num7 = require("num7.js"); Num = num7.Num; calc = num7.Num  
	
	a=0.1; b=0.2;  
	c=a+b                                     //0.30000000000000004 => PRECISION FAILURE!  
	an = Num.ieee754(a); console.log(an)      //0.1000000000000000055511151231257827021181583404541015625  
	     
	bn = Num.ieee754(b); console.log(bn)      //0.2000000000000000111022302462515654042363166809082031250  
	cn = Num.ieee754(c);  
	console.log(cn, '=> PRECISION FAILURE!')  //0.3000000000000000444089209850062616169452667236328125000 => PRECISION FAILURE!  
	T = calc.add(an, bn)  
	console.log(T.toString(), '=> OK.')       //0.3000000000000000166533453693773481063544750213623046875 => OK.  

Q. I have two float variables in my code:  

	> a = 0.1; b = 0.2  
	
How can i convert them in Num type?  
A. With Num.float2num method (or directly with str() built-in function): 

	num7 = require("num7.js"); Num = num7.Num  
	a = 0.1; b = 0.2 //  
	an= Num.float2num(a); bn= Num.float2num(b) //an= new Num(String(a)); bn= new Num(String(b))  
	console.log(an.Add(bn).toString(), 'OK. VS', a+b, 'PRECISION FAILURE!') //0.3 OK. VS 0.30000000000000004 PRECISION FAILURE!  

Q. Can i do add or other math operations also with 10,000 digits after floating point?  
A. Yes, you can by the following:

	num7 = require("num7.js"); Num = num7.Num 
 
	console.log((new Num('1.123456789e-10_000').Add(new Num('3.987654321e-10_000'))).Num2exp())     //5.11111111e-10000  
	console.log((new Num('1.123456789e-10_000').Sub(new Num('3.987654321e-10_000'))).Num2exp())    //-2.864197532e-10000  
	console.log((new Num('1.123456789e-10_000').Mul(new Num('3.987654321e-10_000'))).Num2exp())   //4.479957319112635269e-20000  
	console.log((new Num('1.123456789e-10_000').Div(new Num('3.987654321e-10_000'))).toString()) //0.28173374584742497292307298769992856660154820877213142969420392746224704666420356

Q. I must enter many integer variables in my code:  

	> a = new Num('123.0'); b = new Num('456.0'); c = new Num('789.0')
	
Can i input them without quotes and suffix .0?  
A. Yes, this the way:

	> a = new Num(123); b = new Num(456); c = new Num(789)  
