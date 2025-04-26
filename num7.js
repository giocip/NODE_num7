/** DEVELOPED ON AMD Ryzen 5 Mobile 3550H 16GB DDR4 DRAM AND NODE.JS SYSTEM v22.13.1 */

/**
 * @file   num7.js
 * @author Giovanni Cipriani <giocip7@gmail.com>
 * @date   2025
 * @brief  num7 ARBITRARY-PRECISION GENERAL PURPOSE ARITHMETIC-LOGIC DECIMAL CLASS FOR NODE.JS SYSTEM
 *
 * @see https://github.com/giocip/NODE_num7
 */
// DEFINE A CLASS WITH A CONSTRUCTOR, METHODS, AND 'this'

class Num {
  //CONSTRUCTOR: INITIALIZES PROPERTIES WHEN AN INSTANCE IS CREATED
  constructor(n, d = 80) {
    //CLASS CONSTRUCTOR
    //VALIDATION n
    this.type = "Num" //'Num' TYPE SPECIFICATION
    if(typeof n == "undefined") throw Error("Num CLASS CONSTRUCTOR => TypeError: missing 1 required positional argument: " + n)
    else if(typeof n == "number") {
      if (Number.isInteger(n)) n += ".0" //SUFFIX .0 FOR INTEGER TYPE
      else throw Error("Num CLASS CONSTRUCTOR => number not valid: " + n) //process.exit(1)
    }
    else if (typeof n == "bigint") n += ".0" //SUFFIX .0 FOR ARBITRARY PRECISION INTEGER TYPE => 1000n
    else if (n.type == "Num") {
      this.d = n.d
      this.n = n.n
      this.n0 = n.n0
      this.n1 = n.n1
      this.n2 = n.n2
      this.L_n0 = n.L_n0
      this.L_n1 = n.L_n1
      return //this
    }
    else if (typeof n != "string") throw Error("Num CLASS CONSTRUCTOR => object data not valid: " + n)
    let nn = n.replace(/_+/g, "") //CLEAR '_'
    nn = nn.replace(/\s+/g, "")  //CLEAR SPACE, TAB ECC.
    nn = nn.toUpperCase()       //ALL UPPERCASE
    if (/E/.test(nn)) nn = Num.exp2num(nn) //CHECK FOR 'E' CHARACTER (EXPONENTIAL)
    if (nn[0] == "-") {
      this.n2 = "-"
      nn = nn.slice(1)
    } //NEGATIVE, REMOVE '-'
    else if (nn[0] == "+") {
      this.n2 = ""
      nn = nn.slice(1)
    } //POSITIVE, REMOVE '+'
    else this.n2 = "" //POSITIVE
    let nv = nn.split(".")
    let nv0_isOnlyDigits = /^\d+$/.test(nv[0])
    let nv1_isOnlyDigits = /^\d+$/.test(nv[1])
    if (!nv0_isOnlyDigits || !nv1_isOnlyDigits)
      throw Error("Num CLASS CONSTRUCTOR => typing error: " + n) //CHECK FOR ONLY DIGIT NUMBERIC STRING
    this.n0 = nv[0]
    this.n1 = nv[1]
    this.L_n0 = this.n0.length
    this.L_n1 = this.n1.length //CHECK FIRST TIME, LENGTH
    if (!this.L_n0 || !this.L_n1)
      throw Error("Num CLASS CONSTRUCTOR => missing string number: " + n)
    if (this.L_n0 > 1) {
      this.n0 = this.n0.replace(/^0+/, "") //CLEAR LEFT  ZEROS
      if (!this.n0.length) this.n0 = "0"  //if ''
    }
    if (this.L_n1 > 1) {
      this.n1 = this.n1.replace(/0+$/, "") //clear RIGHT zeros
      if (!this.n1.length) this.n1 = "0"  //if ''
    }
    this.L_n0 = this.n0.length
    this.L_n1 = this.n1.length                  //CHECK FOR NEW LENGTH
    this.n = this.n2 + this.n0 + "." + this.n1 //SET ALL NUMBER CLEANED
    if (this.n0 == "0" && this.n1 == "0")
      if (this.n2 == "-" || this.n[0] == "+") throw Error("Num CLASS CONSTRUCTOR => zero can not be signed: " + n)
    this.d = d > this.L_n1 ? d : this.L_n1 //PRECISION

    return //this
  } //CONSTRUCTOR END

  /** valueOf, Num RESULT FOR (+) OPERATOR */ 
  //  CODE: a = new Num('3.0'); console.log(a + ' Km') //3.0 Km
  valueOf() { return this.n }

  /** toString, Num DISPLAY FOR console.log */ 
  //  CODE: a = new Num('3.0'); console.log(a.toString()) //3.0
  toString() { return this.n }

  /** RETURN STRING COMMON STANDARD Round() -RELATIVE ROUND_HALF_CEIL d=1: 0.15 => 0.2 -0.15 => -0.1 */
  //  CODE: a = new Num(Num.pi); console.log(a.toString(), a.ToFixed()) //3.1415926535897932384626433832795 3.14
  ToFixed(d = 2) { return this.Round(d).toString() } 

  /** length, Num DIGIT CHARACTER SIZE (RAM) */
  //  CODE: a = new Num('-3.141592654'); Num.print(a.length(), '\n') //23
  length() { return this.n.length + this.L_n0 + this.L_n1 + this.n2.length }
  
  /** (==) EQ, EQUAL LOGIC BINARY OPERATOR */
  //  CODE: a = new Num(3); b = new Num(3); console.log(a.EQ(b)) //true
  EQ(sob) { sob = new Num(sob); return this.n == sob.n ? true : false; }

  /** (!=) NE, NOT EQUAL LOGIC BINARY OPERATOR */
  //  CODE: a = new Num(3); b = new Num(33); console.log(a.NE(b)) //true
  NE(sob) { sob = new Num(sob); return this.n != sob.n ? true : false; }

  /** (>) GT, GREATER LOGIC BINARY OPERATOR */
  //  CODE: a = new Num(333); b = new Num(33); console.log(a.GT(b)) //true
  GT(sob) {
    sob = new Num(sob)
    if (Num.int(this.n2 + this.n0) > Num.int(sob.n2 + sob.n0)) return true
    let a, b, d_L1
    if (Num.int(this.n2 + this.n0) == Num.int(sob.n2 + sob.n0)) {
      d_L1 = this.L_n1 - sob.L_n1
      if (d_L1 > 0) {
        a = Num.int(this.n2 + this.n1)
        b = Num.int(sob.n2 + sob.n1 + "".padStart(Math.abs(d_L1), "0")) 
        if (a > b) return true
      } else if (d_L1 < 0) {
        a = Num.int(this.n2 + this.n1 + "".padStart(Math.abs(d_L1), "0"))
        b = Num.int(sob.n2 + sob.n1) 
        if (a > b) return true
      } else { return Num.int(this.n2 + this.n1) > Num.int(sob.n2 + sob.n1) ? true : false }
    }
    return false
  }

  /** (>=) GE, GREATER OR EQUAL LOGIC BINARY OPERATOR */ 
  //  CODE: a = new Num(333); b = new Num(333); console.log(a.GE(b)) //true
  GE(n) { let sob = new Num(n); return this.GT(sob) || this.EQ(sob) ? true : false }

  /** (<) LT, LESS LOGIC BINARY OPERATOR */ 
  //  CODE: a = new Num(33); b = new Num(333); console.log(a.LT(b)) //true
  LT(n) { let sob = new Num(n); return this.GE(sob) ? false : true }

  /** (<=) LE, LESS OR EQUAL LOGIC BINARY OPERATOR */ 
  //  CODE: a = new Num(333); b = new Num(333); console.log(a.LE(b)) //true
  LE(n) { let sob = new Num(n); return this.GT(sob) ? false : true }

  /** Is_true, TRUE LOGIC UNARY FOR Num */ 
  //  CODE: a = new Num('-3.14'); if(a.Is_true()) console.log(a.toString(), 'true'); else console.log(a.toString(), 'false') //-3.14 true
  Is_true() { return this.n == "0.0" ? false : true }

  /** Is_false, FALSE LOGIC UNARY FOR Num */
  //  CODE: a = new Num('0.00'); if(a.Is_false()) console.log(a.toString(), 'true'); else console.log(a.toString(), 'false') //0.0 true
  Is_false() { return this.n == "0.0" ? true : false }

  /**  Not, NOT LOGIC UNARY OPERATOR FOR Num */
  //   CODE: a = new Num('0.00'); if(a.Not()) console.log(a.toString(), 'true'); else console.log(a.toString(), 'false') //0.0 true
  Not() { return this.n == "0.0" ? true : false }

  /** (~) Notb, NOT UNARY BITWISE OPERATOR FOR Num */
  //  CODE:
  // op1 = new Num('10.0')  
  // console.log(`${Num.int(op1).toString(2).padStart(8, '0')}`, op1.toString()) //00001010 10.0   
  // op2 = op1.Notb()                                                            //(~) NOT 
  // console.log(`${Num.int(op2).toString(2).padStart(8, '0')}`, op2.toString()) //00000101 5.0       
  Notb() {
    if(!this.Is_numint() || this.n2) throw Error("Num.Notb => TypeError only positive integer allowed: " + this.n)
    let t = ''
    let bin = Num.int(this.n0).toString(2) 
    for(let i = 0; i < bin.length; i++) t += (bin[i] == '1' ? '0' : '1')
    return new Num(BigInt('0b' + t))
  }

  /** Abs, RETURN THE ABSOLUTE VALUE OF A Num */
  //  CODE: a = new Num(-333); console.log(a.Abs().toString()) //333.0
  Abs() { return new Num(this.n2 == "" ? this.n : this.n.slice(1)) }

  /** Is_negative CHECK FOR Num NEGATIVE */
  //  CODE: a = new Num(-333); console.log(a.Is_negative()) //true
  Is_negative() { if (this.n2 == "-") return true; return false }

  /** Is_positive CHECK FOR Num POSITIVE */
  //  CODE: a = new Num(-333); console.log(a.Is_positive()) //false
  Is_positive() { return !this.Is_negative() }

  /** Is_zero CHECK FOR ZERO Num */
  //  CODE: a = new Num(0); console.log(a.Is_zero()) //true
  Is_zero() {
    if (this.n0 == "0" && this.n1 == "0" && this.n2 == "") return true //int, dec, sign Num PARTS
    return false
  }

  /** Is_numint CHECKS IF INTEGER Num  */
  //  CODE: a = new Num('3.00'); console.log(a.Is_numint()) //true
  Is_numint() { if (this.n1 == "0") return true; return false }

  /** Is_numfloat CHECKS IF FLOATING POINT Num */
  //  CODE: a = new Num('3.14'); console.log(a.Is_numfloat()) //true
  Is_numfloat() { if (this.n1 != "0") return true; return false }

  /** Is_numeven CHECK FOR Num EVEN (0 2 4 6 8) */
  //  CODE: a = new Num('8.00'); console.log(a.Is_numeven()) //true
  Is_numeven() {
    if (this.Is_numint()) {
      if (this.Mod(2).Is_false()) return true
      return false
    }
    throw Error("Num.Is_numeven => Num, must be integer value: ", this)
  }

  /** Is_numodd CHECK FOR Num ODD (1 3 5 7 9) */
  //  CODE: a = new Num('3.00'); console.log(a.Is_numodd()) //true
  Is_numodd() { return this.Is_numeven() ? false : true }

  /** (**) (EXPONENTIATION) POWER OPERATOR */
  //CODE: a = new Num('3.00'); console.log(a.Pow(3).toString()) //27.0
  //CODE: a = new Num('3.00'); console.log(a.Pow(-3).toString()) //0.037037037037037037037037037037037037037037037037037037037037037037037037037037035925925925925925925925925925925925925925925925925925925925925925925925925925925937037037037037037037037037037037037037037037037037037037037037037037037037037037
  //CODE: a = new Num('-3.14'); console.log(a.Pow(4).toString()) //97.21171216
  //CODE: a = new Num('-0.00140017007'); console.log(a.Pow(4).toString()) //0.00000000000384346702849149326098281069326401
  Pow(E, d = 80) { //ARGUMENT E MANDATORY
    let e = new Num(E) 
    if(Num.not(this) && Num.not(e)) throw Error("Num.Pow => UNDETERMINED: " + this.n0 + '^' + e.n0) //UNDETERMINED ERROR
    if(Num.not(e)) return new Num(1); //POW ALWAYS ONE
    if(e.Is_numfloat()) throw Error("Num.Pow => EXPONENT, must be integer value: " + e.toString()); //EXPONENT MUST BE INTEGER
    else e = BigInt(e.n2 + e.n0)
    if(e < 0n) {
      e = -e
      let b = this.Inv(d)
      this.n2 = b.n2; this.n0 = b.n0; this.n1 = b.n1; this.L_n0 = b.L_n0; this.L_n1 = b.L_n1; this.n = b.n; this.d = b.d;
    }
    let DOT = Number(BigInt(this.L_n1) * e)
    let result_str = String(BigInt(this.n0 + this.n1) ** e)
    let decs_part = result_str.slice(-DOT)
    let int_part  = result_str.slice(0, -DOT)
    return new Num((e % 2n ? this.n2 : '+') + (int_part ? int_part : '0') + '.' + ''.padStart(Number((DOT) - result_str.length), '0') + decs_part)
  }

  /**  CLEAR VARIABLE */
  //CODE: a = new Num('2.72'); a.Print(' '); a.Clear(); a.Print('\n') //2.72 0.0
  Clear() {
    let telf = this;
    this.d = telf.d;
    this.n = "0.0";
    this.n0 = "0";
    this.n1 = "0";
    this.n2 = "";
    this.L_n0 = 1;
    this.L_n1 = 1;
    return this;
  }

  /**  INCREMENT ADDING VARIABLE METHOD -OBJECT MODIFY BY this REFERENCE */
  //CODE: a = new Num('2.72'); a.Print(' '); a.Inc(); a.Print('\n') //2.72 3.72
  Inc(sob = 1) {
    let telf = this.Add(sob);
    this.d = telf.d;
    this.n = telf.n;
    this.n0 = telf.n0;
    this.n1 = telf.n1;
    this.n2 = telf.n2;
    this.L_n0 = telf.L_n0;
    this.L_n1 = telf.L_n1;
    return this;
  }
    
  /** INCREMENT MULTIPLYING VARIABLE METHOD -OBJECT MODIFY BY this REFERENCE */
  //CODE: a = new Num('2.72'); a.Print(' '); a.IncMul(100); a.Print('\n') //2.72 272.0
  IncMul(sob = 10) {
    let telf = this.Mul(sob)
    this.d    = telf.d
    this.n    = telf.n
    this.n0   = telf.n0
    this.n1   = telf.n1
    this.n2   = telf.n2 
    this.L_n0 = telf.L_n0
    this.L_n1 = telf.L_n1         
    return this
  }

  /**  DECREMENT SUBTRACTING VARIABLE METHOD -OBJECT MODIFY BY THIS REFERENCE */
  //CODE: a = new Num('2.72'); a.Print(' '); a.Dec(); a.Print('\n') //2.72 1.72
  Dec(sob = 1) {
    let telf = this.Sub(sob)
    this.d = telf.d
    this.n = telf.n
    this.n0 = telf.n0
    this.n1 = telf.n1
    this.n2 = telf.n2
    this.L_n0 = telf.L_n0
    this.L_n1 = telf.L_n1
    return this
  }
    
  /**  DECREMENT VARIABLE DIVIDING METHOD -OBJECT MODIFY BY this REFERENCE */
  //CODE: a = new Num('272.0'); a.Print(' '); a.DecDiv(100); a.Print('\n') //272.0 2.72
  DecDiv(sob = 10) {
    let telf = this.Div(sob)
    this.d    = telf.d
    this.n    = telf.n
    this.n0   = telf.n0
    this.n1   = telf.n1
    this.n2   = telf.n2 
    this.L_n0 = telf.L_n0
    this.L_n1 = telf.L_n1         
    return this
  }

  /**  (// %) CALCULATOR DIVMOD RETURN ARRAY (this // sob, this % sob) */
  //CODE: a = new Num(10); qr = a.DivMod(4); Num.print(`${qr[0]} ${qr[1]}\n`) //2.0 2.0
  DivMod(sob) {
    const QR = [] //CREATE AN ARRAY
    QR[0] = new Num(this).FloorDiv(new Num(sob))
    QR[1] = new Num(this).Mod(new Num(sob))
    return QR
  }

  /**  (//) INTEGER DIVISION OPERATOR */
  //CODE: a = new Num(15); Num.print(a.FloorDiv(6), '\n') //2.0
  FloorDiv(sob) {
    sob = new Num(sob)
    if (this.n == "0.0") return new Num("0.0") //zero result modulus
    let ze, x1, x2, x3
    if (this.L_n1 > sob.L_n1) {
      ze = this.L_n1 - sob.L_n1
      x1 = Num.int(this.n2 + this.n0 + this.n1)
      x2 = Num.int(sob.n2 + sob.n0 + sob.n1 + "".padStart(ze, "0"))
      x3 = Num.divi(x1, x2, 0)
    } else {
      ze = sob.L_n1 - this.L_n1
      var temp = this.n2 + this.n0 + this.n1 + "".padStart(ze, "0")
      x1 = Num.int(temp)
      x2 = Num.int(sob.n2 + sob.n0 + sob.n1)
      x3 = Num.divi(x1, x2, 0)
    }
    return new Num(x3)
  }

  /**  (%) MODULE OPERATOR (Num FLOATING POINT DIVISION REMAINDER) */
  //CODE: a = new Num(15); Num.print(a.Mod(6), '\n') //3.0
  Mod(sob) {
    sob = new Num(sob)
    if (this.n == "0.0") return new Num("0.0") //zero result modulus
    let ze, x1, x2, x3
    if (this.L_n1 > sob.L_n1) {
      ze = this.L_n1 - sob.L_n1
      x1 = Num.int(this.n2 + this.n0 + this.n1)
      x2 = Num.int(sob.n2 + sob.n0 + sob.n1 + "".padStart(ze, "0"))
      x3 = Num.divi(x1, x2, 0)
    } else {
      ze = sob.L_n1 - this.L_n1
      x1 = Num.int(this.n2 + this.n0 + this.n1 + "".padStart(ze, "0"))
      x2 = Num.int(sob.n2 + sob.n0 + sob.n1)
      x3 = Num.divi(x1, x2, 0)
    }
    return this.Sub(new Num(x3).Mul(sob))
  }

  /**  (+) OBJECT ADDITION METHOD */
  //CODE: a = new Num('15.1'); Num.print(a.Add('6.2'), '\n') //21.3
  Add(sob) {
    sob = new Num(sob)
    let x1
    let x2
    if (this.L_n1 < sob.L_n1) {
      x1 = BigInt(this.n2 + this.n0 + this.n1 + "".padStart(sob.L_n1 - this.L_n1, "0"))
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
    } else if (this.L_n1 > sob.L_n1) {
      x1 = BigInt(this.n2 + this.n0 + this.n1)
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1 + "".padStart(this.L_n1 - sob.L_n1, "0"))
    } else {
      x1 = BigInt(this.n2 + this.n0 + this.n1)
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
    }
    let x3 = x1 + x2
    if (!x3) return new Num("0.0") //ZERO RESULT SUM
    let xt = String(x3)
    let xt_L = xt.length
    let xt_D = sob.L_n1 > this.L_n1 ? sob.L_n1 : this.L_n1
    if (x3 < 0) { //NEGATIVE SUM
      let ze = xt_D - xt_L + 1
      if (ze >= 0) { //-1 < Negative Add < 0
        let xtr = "-0" + "." + "".padStart(ze, "0") + xt.slice(1)
        return new Num(xtr)
      }
    } else {
      let ze = xt_D - xt_L
      if (ze >= 0) { //0 < POSITIVE SUM < 1
        let xtr = "0" + "." + "".padStart(ze, "0") + xt.slice("0")
        return new Num(xtr)
      }
    }
    return new Num(xt.slice(0, -xt_D) + "." + xt.slice(-xt_D))
  }

  //''' (-) OBJECT SUBTRACTION METHOD '''
  //CODE: a = new Num('-15.1'); Num.print(a.Add('-6.2'), '\n') //-21.3
  Sub(sob) {
    sob = new Num(sob)
    let x1
    let x2
    if (this.L_n1 < sob.L_n1) {
      x1 = BigInt(this.n2 + this.n0 + this.n1 + "".padStart(sob.L_n1 - this.L_n1, "0"))
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
    } else if (this.L_n1 > sob.L_n1) {
      x1 = BigInt(this.n2 + this.n0 + this.n1)
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1 + "".padStart(this.L_n1 - sob.L_n1, "0"))
    } else {
      x1 = BigInt(this.n2 + this.n0 + this.n1)
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
    }
    let x3 = x1 - x2
    if (!x3) return new Num("0.0") //ZERO RESULT DIF
    let xt = String(x3)
    let xt_L = xt.length
    let xt_D = sob.L_n1 > this.L_n1 ? sob.L_n1 : this.L_n1
    let ze
    let xtr
    if (x3 < 0) { //NEGATIVE DIF
      ze = xt_D - xt_L + 1
      if (ze >= 0) { //-1 < NEGATIVE DIF < 0
        xtr = "-0" + "." + "".padStart(ze, "0") + xt.slice(1)
        return new Num(xtr)
      }
    } else { //POSITIVE DIF
      ze = xt_D - xt_L
      if (ze >= 0) { //0 < POSITIVE DIF < 1
        xtr = "0" + "." + "".padStart(ze, "0") + xt.slice(0)
        return new Num(xtr)
      }
    }
    return new Num(xt.slice(0, -xt_D) + "." + xt.slice(-xt_D))
  }

  //''' (*) OBJECT MULTIPLICATION METHOD '''
  //CODE: a = new Num('-15.1'); Num.print(a.Mul('-6.2'), '\n') //93.62
  Mul(sob) {
    sob = new Num(sob)
    let x1
    let x2
    x1 = BigInt(this.n2 + this.n0 + this.n1)
    x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
    let x3 = x1 * x2
    if (!x3) return new Num("0.0") //MULTIPLY BY 0
    let xt = String(x3)
    let xt_L = xt.length
    let xt_D = this.L_n1 + sob.L_n1
    let ze
    if (x3 < 0) { //NEGATIVE
      ze = xt_D - xt_L + 1
      if (ze >= 0) return new Num("-0" + "." + "".padStart(ze, "0") + xt.slice(1)) //1.22*(-0.01)=-0.0122
      return new Num(xt.slice(0, -xt_D) + "." + xt.slice(-xt_D))                  //-1.22*3.0=-3.66
    }
    ze = xt_D - xt_L
    if (ze >= 0) return new Num("0" + "." + "".padStart(ze, "0") + xt.slice(0)) //-1.22*(-0.01)=0.0122
    return new Num(xt.slice(0, -xt_D) + "." + xt.slice(-xt_D))                 //1.22*1.0=1.22
  }

  /** CALCULATOR MODE: MULTIPLY FOR TEN */
  //CODE: a = new Num('3.2'); a = a._10x(); console.log(a.toString()) //32.0
  _10x() { return this.Shift(1) }

  /** CALCULATOR MODE: MULTIPLY FOR HUNDRED */
  //CODE: a = new Num('3.2'); a = a._100x(); console.log(a.toString()) //320.0
  _100x() { return this.Shift(2) }

  /** CALCULATOR MODE: MULTIPLY FOR THOUSAND */
  //CODE: a = new Num('3.2'); a = a._1000x(); console.log(a.toString()) //3200.0
  _1000x() { return this.Shift(3) }

  /** CALCULATOR MODE: DIVIDE FOR TEN */
  //CODE: a = new Num('3.2'); a = a._10div(); console.log(a.toString()) //0.32
  _10div() { return this.Shift(-1) }

  /** CALCULATOR MODE: DIVIDE FOR HUNDRED */
  //CODE: a = new Num('3.2'); a = a._100div(); console.log(a.toString()) //0.032
  _100div() { return this.Shift(-2) }

  /** CALCULATOR MODE: DIVIDE FOR THOUSAND */
  //CODE: a = new Num('3.2'); a = a._1000div(); console.log(a.toString()) //0.0032
  _1000div() { return this.Shift(-3) }

  /** CALCULATOR MODE: DOUBLED VALUE */
  //CODE: a = new Num ("123.0"); a._2x().Print("\n"); //246.0
  _2x() { return this.Add(this) }

  /** CALCULATOR MODE: TRIPLED VALUE */
  //CODE: a = new Num ("123.0"); a._3x().Print("\n"); //369.0
  _3x() { return this.Add(this).Add(this) }

  /// CALCULATOR MODE: RETURN OBJECT MULTIPLIED OR DIVIDED FOR 10 POWER
  // CODE: a = new Num("0.001"); a.Xe10("6.0").Print("\n"); //1000.0
  // CODE: a = new Num("1000.0"); a.Xe10("-6.0").Print("\n"); //0.001
  Xe10(p) { return this.Shift(p) }

  ///CALCULATOR MODE: EXPONENTIATION (POWER) 
  // CODE: a = new Num("4.0");  a.Xy("30.0").Print("\n");  //1152921504606846976.0
  // CODE: a = new Num("-4.0"); a.Xy("-3.0").Print("\n"); //-0.015625
  Xy(y) { return Num.pow(this, y) }

  /** CALCULATOR MODE: BY THE RATE/ALL, RETURN THE PERCENTAGE VALUE OF this ALL/RATE */
  //  CODE: rate = new Num('22.0'); rate.Pct("1_648.98").Round().Print(" => PCT DISCOUNT\n"); //362.78 => PCT DISCOUNT
  //  CODE: all  = new Num("1_648.98"); all.Pct(22).Round().Print(" => PCT DISCOUNT\n");     //362.78 => PCT DISCOUNT
  Pct(RA = '1.0') { return Num.pct(RA, this) }

  /** CALCULATOR MODE: BY THE ALL, RETURN THE RATE OF this PERCENTAGE */
  //  CODE: pct = new Num('362.78'); pct.Rate_all('1_648.98').Round().Print(" => rate\n"); //22.0 => rate
  Rate_all(all) { return Num.rate(this, all) }

  /** CALCULATOR MODE: BY THE PERCENTAGE, RETURN THE RATE OF this ALL */
  //  CODE: all = new Num("1_648.98"); all.Rate_pct('362.78').Round().Print(" => rate\n"); //22.0 => rate
  Rate_pct(pct) { let PCT = new Num(pct); return PCT.Shift(2).Div(this) }

  /** CALCULATOR MODE: BY THE PERCENTAGE RETURN THE ALL OF this RATE */ 
  //  CODE: rate = new Num('22.00025'); rate.All_pct('362.78').Round().Print(" => ALL\n"); //1648.98 => ALL
  All_pct(PCT) { return Num.all(this, PCT) }

  /** CALCULATOR MODE: BY THE RATE RETURN THE ALL OF this PCT */ 
  //  CODE: pct = new Num('362.78'); pct.All_rate('22.00025').Round().Print(" => ALL\n"); //1648.98 => ALL
  All_rate(rate) { let RATE = new Num(rate); return this.Shift(2).Div(RATE) }

  /** CALCULATOR MODE: BY THE RATE/ALL RETURN THE PERTHOUSAND OF this ALL/RATE */
  //  CODE: rate = new Num("2.0"); rate.Pth("10_000.0").Print("\n"); //20.0
  //  CODE: all  = new Num("10_000.0"); all.Pth(2).Print("\n");     //20.0
  Pth(RA = '1.0') { return Num.pth(RA, this) }

  /** CALCULATOR MODE: BY THE ALL, RETURN THE RATE OF this PERTHOUSAND */
  //  CODE: pth = new Num(20); pth.RateTH_all(10000).Round().Print(" => rate_th\n"); //2.0 => rate_th
  RateTH_all(all) { return Num.rate_th(this, all) }

  /** CALCULATOR MODE: BY THE PERTHOUSAND, RETURN THE RATE OF this ALL */
  //  CODE: all = new Num(10000); all.RateTH_pth(20).Round().Print(" => rate_th\n"); //2.0 => rate_th
  RateTH_pth(pth) { let PTH = new Num(pth); return PTH.Shift(3).Div(this) }

  /** CALCULATOR MODE: BY THE PERTHOUSAND RETURN THE ALL OF this RATE */ 
  //  CODE: rate = new Num(2); rate.All_pth(20).Round().Print(" => ALL_th\n"); //10000.0 => ALL_th
  All_pth(PTH) { return Num.all_th(this, PTH) }

  /** CALCULATOR MODE: BY THE RATE RETURN THE ALL OF this PTH */ 
  //  CODE: pth = new Num(20); pth.All_rateTH(2).Round().Print(" => ALL_th\n"); //10000.0 => ALL_th
  All_rateTH(rate_th) { let RATE_TH = new Num(rate_th); return this.Shift(3).Div(RATE_TH) }

  /**  (1/this) CALCULATOR NUMBER INVERSE METHOD */
  //  CODE: a = new Num(3); i = a.Inv(); i.Print('\n') //0.33333333333333333333333333333333333333333333333333333333333333333333333333333333
  //  CODE: a = new Num(3); i = a.Inv(6); i.Print('\n') //0.333333
  Inv(precision = 80) { return Num.inv(this, precision) }

  /**  (/) OBJECT DIVISION METHOD */
  //  CODE: a = new Num('9.9'); Q = a.Div('3.3'); Q.Print('\n') //3.0
  //  CODE: a = new Num('9.9'); Q = a.Div('3.4', 7).Round(6); Q.Print('\n') //2.911765
  Div(sob, d = 80) { //d => PRECISION DIGITS
    sob = new Num(sob)
    if (sob.toString() == "0.0") throw Error("Num.Div => ZeroDivisionError: " + sob)
    if (this.n == "0.0") return new Num("0.0") //ZERO DIVIDEND MEANS ZERO QUOTIENT RESULT
    let x1; let x2; let x3; let ze
    let D = this.d > sob.d ? this.d : sob.d
    if (this.L_n1 > sob.L_n1) {
      ze = this.L_n1 - sob.L_n1
      x1 = BigInt(this.n2 + this.n0 + this.n1)
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1 + "".padStart(ze, "0"))
      x3 = Num.divi(x1, x2, d > D ? d : D)
    } else {
      ze = sob.L_n1 - this.L_n1
      x1 = BigInt(this.n2 + this.n0 + this.n1 + "".padStart(ze, "0"))
      x2 = BigInt(sob.n2 + sob.n0 + sob.n1)
      x3 = Num.divi(x1, x2, d > D ? d : D)
    }
    return new Num(x3)
  }

  /**  CALCULATOR SQUARE ROOT METHOD */
  //  CODE: a = new Num('2.0'); R = a.Sqrt(); R.Print('\n') //1.41421356237309504880168872420969807856967187537694807317667973799073247846210703
  //  CODE: a = new Num('2.0'); R = a.Sqrt(10); R.Round(9).Print('\n') //1.414213562
  Sqrt(d = 80) { return new Num(Num.sqrt(this, d)) }

  /** CALCULATOR ITH ROOT METHOD */
  //  CODE: a = new Num(27); RI = a.Root_i(3); RI.Print('\n') //3.0
  //  CODE: a = new Num('3.3'); RI = a.Root_i(3, 10).Round(9); RI.Print('\n') //1.488805553
  Root_i(i = 3, d = 80) { return new Num(Num.root_i(this, i, d)) }

  /** Num FLOATING POINT TRUNCATION */
  //  CODE: a = new Num('3.14159'); T = a.Trunc(4); T.Print('\n') //3.1415
  Trunc(d = 0) {
    let m = new Num(10).Pow(d), t = this.Mul(m)
    return new Num(Num.int(t.n2 + t.n0)).Div(m)
  }
  
  /** Num FLOOR ROUNDING RELATIVE DOWN d=1: 0.12 => 0.1 -0.12 => -0.2 */
  //  CODE: a = new Num('3.14159'); T = a.Round_floor(4); T.Print('\n') //3.1415
  Round_floor(d = 0) { //-> RELATIVE VALUE (REAL NUMBER R)
    if (this.GE('0.0')) return this.Trunc(d)               //POSITIVES AND ZERO  
    let e = new Num('1.0', d).Div(new Num('10.0').Pow(d)) //NEGATIVES
    let t, t2
    if(d >= 0) {
      t = this.Trunc(d).Sub(e) 
      t2 = this.Sub(e) 
      return t.EQ(t2) ? this : t            
    }
    if (e.LT(this)) return this
    t = this.Trunc(d).Sub(e) 
    t2 = this.Sub(e) 
    return t.EQ(t2) ? this : t            
}

  /** Num HALF UP ROUNDING COMMON STANDARD -RELATIVE ROUND_HALF_CEIL d=1: 0.15 => 0.2 -0.15 => -0.1 */
  //  CODE: a = new Num('3.14159'); T = a.Round(4); T.Print('\n') //3.1416
  Round(d = 2) { 
    let t = new Num('0.5').Mul(new Num(10).Pow(-d)).Add(this)
    return t.Round_floor(d) 
  } 

  /** Num CEIL ROUNDING RELATIVE UP d=1: 0.12 => 0.2 -0.12 => -0.1 */
  //  CODE: a = new Num('3.14159'); T = a.Round_ceil(2); T.Print('\n') //3.15
  Round_ceil(d = 0) {
    if (this.LE(0)) return this.Trunc(d)                   //NEGATIVES AND ZERO 
    let e = new Num('1.0', d).Div(new Num('10.0').Pow(d)) //POSITIVES
    let t, t2
    if(d >= 0) {
      t = this.Trunc(d).Add(e) 
      t2 = this.Add(e) 
      return t.EQ(t2) ? this : t            
    }  
    if (e.GT(this)) return this
    t = this.Trunc(d).Add(e) 
    t2 = this.Add(e) 
    return t.EQ(t2) ? this : t              
  }

  /** Num HALF EVEN ROUNDING */
  //  CODE: a = new Num('3.14159265'); T = a.Round_bank(7); T.Print('\n') //3.1415926
  //  CODE: a = new Num('3.1415'); T = a.Round_bank(3); T.Print('\n')    //3.142
  Round_bank(d = 2) {
    if (d < 0) {
      d = -d 
      let e = 10n**BigInt(d)            
      return ((this.Div(new Num(e))).Round_bank(0)).Mul(e) //RECURSION
    }
    let of = d - this.L_n1
    if (of >= 0) return new Num(this.n) //NO ROUND
    let a, b, c
    if (!d) { //INTEGER ROUNDING (d=0)
      a = Num.int(this.n0) 
      b = Num.int(this.n1.slice(0, 1))
      c = Num.rstrip(this.n1.slice(1), '0')    
      if (b > 5n) {
        a += 1n
        return new Num(this.n2 + String(a) + '.0') //12.6 => 13.0 INTEGER
      } else if(b == 5n) {
          if (a % 2n) { //ODD
            a += 1n
            return new Num(this.n2 + String(a) + '.0') //13.5 => 14.0 INTEGER
          }
          else if (c != '') { //EVEN OVERFLOW
            a += 1n
            return new Num(this.n2 + String(a) + '.0') //12.51 => 13.0 INTEGER
          } 
          else { //EVEN
            if (!a) return new Num('0.0') //a == 0
            return new Num(this.n2 + String(a) + '.0') //12.5 => 12.0 INTEGER -0.5 => 0.0
          }
      } else {
          if(Num.int(this.n0) >= 1n) return new Num(this.n2 + String(a) + '.0') //12.3 => 12.0 INTEGER   
          return new Num('0.0') //#0.3 => 0.0 #Num(self.n2 + '0.0')
      }
    } 
    //FLOATING POINT ROUNDING (d>0)
    a = Num.int(this.n1.slice(d-1, d)) 
    b = Num.int(this.n1.slice(d, d+1)) 
    c = Num.rstrip(this.n1.slice(d+1), '0')
    let of2, s
    if (b > 5n) {
      a += 1n 
      of2 = 1
      if (a > 9n) { //FLAG CARRY
        while (a > 9) {
          b = 0n 
          s = this.n1.slice(d-of2-1, d-of2) 
          if (!s) return new Num(this.n2 + String(Num.int(this.n0)+1n) + '.0') //3.99 => 4.0
          a = Num.int(s) 
          a += 1n 
          of2 += 1
        }
        return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-of2) + String(a)) //3.095 => 3.1        
      }  
      return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-1) + String(a)) //3.1415 => 3.142
    } else if(b == 5n) {
      if (a % 2n) { //ODD
        a += 1n 
        of2 = 1
        while (a > 9n) {
          b = 0 
          s = this.n1.slice(d-of2-1, d-of2)
          if (!s) return new Num(this.n2 + String(Num.int(this.n0)+1n) + '.0')               //3.95 => 4.0
          a = Num.int(s) //3.0955 d=2 => 3.1
          a += 1n 
          of2 += 1          
        }
        return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-of2) + String(a))    //3.095 => 3.1
      } else if(c != '') { //EVEN OVERFLOW
        a += 1n
        return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-1) + String(a))    //12.51 => 13.0 INTEGER
      } else {
        if (!Num.int(this.n0) && Num.int(this.n1) == 5) return new Num('0.0')        // self.n0 == 0 and self.n1 == 5 (ex. -0.00000005) -ZERO SYMMETRIC MEETING
        return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-1) + String(a)) //EVEN 5.65 => 5.6 -0.05 => 0.0        
      }
    }
    else {
      try {
        return new Num(this.n2 + this.n0 + '.' + this.n1.slice(0, d-1) + String(a)) //3.1415 => 3.14 #-0.02 => -0.0 ERROR!        
      } catch (e) { return new Num('0.0') } //-0.02 => 0.0 OK.
    }
  }

  /** CONVERT A NUM OBJECT TO SCIENTIFIC NOTATION STRING */
  //  CODE: a = new Num('123.006789'); S = a.Num2exp(); Num.print(S + '\n') //1.23006789e2
  Num2exp() { return Num.num2exp(this) }

  /** RETURN AN ARRAY WITH NUM LENGTHS BEFORE AND AFTER FLOATING POINT DOT */
  //  CODE: a = new Num(Num.pi); a.Print('\n') ; Num.print(a.Len()[0] + ' ' + a.Len()[1] + '\n') //3.1415926535897932384626433832795 1 31
  Len() { return [this.n0.length, this.n1.length == 1 && this.n1 == '0' ? 0 : this.n1.length] } //ARRAY

  /** And BOOLEAN LOGIC OPERATOR */
  //  CODE:  a = new Num('3.0'); b = new Num('4.0'); Num.print(a.And(b), '\n') //true 
  //  CODE:  a = new Num('3.0'); b = new Num('0.0'); Num.print(a.And(b), '\n') //false 
  //  CODE:  a = new Num('0.0'); b = new Num('4.0'); Num.print(a.And(b), '\n') //false 
  //  CODE:  a = new Num('0.0'); b = new Num('0.0'); Num.print(a.And(b), '\n') //false 
  And(b) { return this.NE(0) && b.NE(0) ? true : false } 
 
  /** Or BOOLEAN LOGIC OPERATOR */
  //  CODE:  a = new Num('3.0'); b = new Num('4.0'); Num.print(a.Or(b), '\n') //true 
  //  CODE:  a = new Num('3.0'); b = new Num('0.0'); Num.print(a.Or(b), '\n') //true 
  //  CODE:  a = new Num('0.0'); b = new Num('4.0'); Num.print(a.Or(b), '\n') //true 
  //  CODE:  a = new Num('0.0'); b = new Num('0.0'); Num.print(a.Or(b), '\n') //false 
  Or(b) { return this.NE(0) || b.NE(0) ? true : false }   

  /** Andb BITWISE OPERATOR */
  //  CODE:  a = new Num('255.0'); b = new Num('1.0'); Num.print(a.Andb(b), '\n') //1.0
  Andb(sob) { 
    if(!this.Is_numint() || this.n2) throw Error("Num.Andb => TypeError only positive integer allowed: " + this.n)
    sob = new Num(sob)
    if(!sob.Is_numint() || sob.n2)   throw Error("Num.Andb => TypeError only positive integer allowed: " + sob.n)
    return new Num(BigInt(this.n0) & BigInt(sob.n0))
  } 
  
  /** Orb BITWISE OPERATOR */
  //  CODE:  a = new Num('0.0'); b = new Num('255.0'); Num.print(a.Orb(b), '\n') //255.0
  Orb(sob) { 
    if(!this.Is_numint() || this.n2) throw Error("Num.Orb => TypeError only positive integer allowed: " + this.n)
    sob = new Num(sob)
    if(!sob.Is_numint() || sob.n2)   throw Error("Num.Orb => TypeError only positive integer allowed: " + sob.n)
    return new Num(BigInt(this.n0) | BigInt(sob.n0))
  } 

  /** Xorb BITWISE OPERATOR */
  //  CODE:  a = new Num('255.0'); b = new Num('255.0'); Num.print(a.Xorb(b), '\n') //0.0
  Xorb(sob) { 
    if(!this.Is_numint() || this.n2) throw Error("Num.Xorb => TypeError only positive integer allowed: " + this.n)
    sob = new Num(sob)
    if(!sob.Is_numint() || sob.n2)   throw Error("Num.Xorb => TypeError only positive integer allowed: " + sob.n)
    return new Num(BigInt(this.n0) ^ BigInt(sob.n0))
  } 

  /** In BOOLEAN ARRAY OPERATOR */
  //  CODE: A = [ new Num(3), new Num(-6), new Num(0), new Num('9.7'), new Num('6.1')]; Num.print(new Num('9.7').In(A), '\n') //true
  In(arr) { return Num.in(arr, this) }

  /** not in BOOLEAN ARRAY OPERATOR */
  //  CODE: A = [ new Num(3), new Num(-6), new Num(0), new Num('9.7'), new Num('6.1')]; Num.print(new Num('9.69').Not_In(A), '\n') //true
  Not_In(arr) { return Num.not_in(arr, this) }

  /** Is BOOLEAN OPERATOR (TWO VARIABLES WITH A SAME ADDRESS => ONE OBJECT) */
  //  CODE: a = new Num('3.14'); b = new Num('3.14'); console.log(a.Is(b)); //false
  Is(b) { return Num.is(this, b) }

  /** Is_not BOOLEAN OPERATOR (TWO VARIABLES WITH A SAME ADDRESS => ONE OBJECT) */
  //  CODE: a = new Num('3.14'); b = a; console.log(a.Is_not(b)); //false
  Is_not(b) { return Num.is_not(this, b) }

  /** F_price_over ADD OR SUB A PERCENTAGE VALUE TO this PRICE */
  //  CODE: price = new Num(1000); overPrice = price.F_price_over(22); overPrice.Print('\n') //1220.0
  //  CODE: price = new Num(1000); subPrice = price.F_price_over(-22); subPrice.Print('\n') //780.0
  F_price_over(t = 22) { 
    t = new Num(t) //ALLOWING FLOAT STRING AS: '2.3'
    let THIS = new Num(this.Mul(t).Shift(-2).Add(this))
    return THIS
  }

  /** F_price_spinoff SPIN OFF PERCENTAGE TAX VALUE FROM A this PRICE */  
  //  CODE: priceFinal = new Num(100); priceRaw = priceFinal.F_price_spinoff(22).Round(2); priceRaw.Print('\n') //81.97
  F_price_spinoff(t = 22) { 
    t = new Num(t) //ALLOWING FLOAT STRING AS: '2.3'
    let THIS = new Num(this.Div((t.Add(100).Shift(-2))))
    return THIS
  }

  /** F_perf PERCENTAGE PERFORMANCE VALUE (DIRECT RATIO) */
  //  CODE: a = new Num(50); b = new Num(75); a.F_perf(b).Print('\n'); //50.0
  F_perf(sob) {
    sob = new Num(sob) //ALLOWING FLOAT STRING AS: '2.3'
    return (sob.Sub(this)).Div(this).Shift(2)
  }

  /** F_perf_time PERCENTAGE AND RELATIVE MAGNITUDE ORDER TIME PERFORMANCE VALUE (INVERSE RATIO) */
  //  RETURN ARRAY BY TWO ELEMENTS
  //  CODE: a = new Num(50); b = new Num('37.5'); A = a.F_perf_time(b); A[0].Round().Print('\n'); A[1].Round(2).Print('\n'); //33.33 0.33
  F_perf_time(sob) {
    sob = new Num(sob) //ALLOWING FLOAT STRING AS: '2.3'
    let THIS= new Num(this)
    let R = ((THIS.Sub(sob)).Div(sob).Mul(100))
    if(sob.GT(THIS)) return [R, sob.Invsign().Div(THIS).Add(1)]
    else             return [R, THIS.Div(sob).Sub(1)] //Array
  }

  /** INVERTED SIGN OF this Num */
  //  CODE: a = new Num('+3.14'); a.Print('\n'); a.Invsign(); a.Print('\n') //3.14 -3.14
  Invsign() {
    this.n2 = (this.n2 == '' ? '-' : '')
    this.n = this.n2 + this.n0 + '.' + this.n1
    return this
  }

  /** INVERTED SIGN OF this Num */
  //  CODE: a = new Num('+3.14'); a.Print('\n'); a.Minus_unary(); a.Print('\n') //3.14 -3.14
  Minus_unary() { return this.Invsign() }

  /** PLUS SIGN OF this Num */
  //  CODE: a = new Num('-3.14'); a.Print('\n'); a.Plus(); a.Print('\n') //-3.14 3.14
  Plus() {
    if(this.n2 == '') return this
    this.n2 = '' //SET PLUS SIGN (+)
    this.n = this.n2 + this.n0 + "." + this.n1
    return this
  }

  /** MINUS SIGN OF Num */
  //  CODE: a = new Num('+3.14'); a.Print('\n'); a.Minus(); a.Print('\n') //3.14 -3.14
  Minus() {
    if(this.n0 + this.n1 == '00') throw Error("Num.Minus => zero can not be signed: " + this.n); //SIGNED ZERO ERROR
    if(this.n2 == '-') return this
    this.n2 = '-' //SET MINUS SIGN (-)
    this.n = this.n2 + this.n0 + "." + this.n1
    return this
  }

  /** INTEGER Num TO BigInt */
  //  CODE: a = new Num('1.0e500'); Num.print(a.ToBigInt() - 1n, '\n') //99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
  ToBigInt() {
    if(this.n1 != '0') throw Error("Num.toBigInt => TypeError number must be integer: " + this.n)
    return BigInt(this.n2 + this.n0)
  }

  /** INTEGER Num TO BigInt */
  //  CODE: a = new Num('1.0e500'); Num.print(a.toInt() - 1n, '\n') //99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
  toInt() { return Num.int(this) }
  
  /** Num TO float */
  //  CODE: a = new Num('0.1'); Num.print(a.toFloat() + 0.2, '\n') //0.30000000000000004
  toFloat() { return Number.parseFloat(this.Num2exp()) }

  /**  SHIFT Num (MULTIPLY AND DIVIDE BY TEN) */
  //   CODE: a = new Num(1); a = a.Shift(3); a.Print('\n')   //1000.0
  //   CODE: a = new Num(1); a = a.Shift(-3); a.Print('\n') //0.001
  Shift(zeros) { return Num.shift(this, zeros) }

  /** PRECISION SET Num d PROPERTY (DIVISION OPERATION) */
  //  CODE: digits = 6; const a = new Num('3.14'), b = new Num(3); a.ToPrecision(digits); b.ToPrecision(digits); console.log(Num.div(a, b, digits).toString(), '\n'); //1.046666
  ToPrecision(d) { this.d = d }
  
  /** PRINT (VIDEO OUTPUT) */
  //  CODE:  const a = new Num('-5005.77'); a.Print(' => ', 'VALUE\n') //-5005.77 => VALUE
  Print(txt = '', txt0 = '', txt1 = '') { Num.print(this.n + txt + txt0 + txt1) }

  /** CALCULATOR MODE: FACTORIAL COMPUTATION */
  //CODE: const a = new Num('5.0'); console.log(a.Fact().toString()) //120
  Fact() {  
    if(this.Is_numint()) return Num.fact(BigInt(this.n0))
    throw Error("Num.Fact => TypeError number must be integer: " + this.n)  
  }

  /** CALCULATOR MODE: SQUARE POWER */
  //  CODE: const a = new Num("3.1415"); a.x2().Print("\n"); //9.86902225
  x2() { return Num.x2(this) }

  /** CALCULATOR MODE: CUBE POWER */
  //  CODE: const a = new Num("123.456"); a.x3().Print("\n"); //1881640.295202816
  x3() { return Num.x3(this) }

  /** COPY Num OBJECT */
  //CODE: a = new Num(3); b = a.Copy(); if(a == b) Num.print("UNIQUE OBJECT\n"); else Num.print("DOUBLED OBJECT\n") //DOUBLED OBJECT
  Copy() { return new Num(this) }

  //STATIC MEMBERS => STATIC METHODS AND STATIC VARIABLES *****************************************************************
  //''' class VARIABLES LIST '''
  static pi = "3.1415926535897932384626433832795"
  static  e = "2.7182818284590452353602874713527"

  /** CONVERT A SCIENTIFIC NOTATION STRING NUMBER TO STRING NUMERIC */
  //  CODE: s = Num.exp2num('123.0e3'); console.log(s) //123000.0
  static exp2num(s) {
    if (typeof s != "string") throw Error("Num.exp2num => object data not valid: " + s)
    let S = s
    s = s.trim().replace(/_+/g, "").toUpperCase() //REMOVE SPACE AND UNDERSCORE (1_000 => 1000)
    let be = s.split("E")
    if (be[0].length == 0 || be[1].length == 0 || be.length == 1 || be.length > 2) throw Error("Num.exp2num => scientific notation not valid: " + S)
    let be0 = be[0]; let be1 = be[1]; let POSE
    if (be1[0] == "+") { POSE = true; be1 = be1.slice(1) } //CHECK EXPONENT SIGN => be1
    else if (be1[0] == "-") { POSE = false; be1 = be1.slice(1) } else POSE = null
    if (!Num.isDigit(be1)) throw Error("Num.exp2num => scientific notation not valid: " + S) //EXPONENT MUST BE ONLY DIGITS
    be1 = Num.lstrip(be1, "0")
    if (be1 == "") { //REBUILD RIGHT ENDING ZERO
      if (POSE == true || POSE == false) throw Error("Num.exp2num => zero can not be signed: " + S) //SIGNED ZERO ERROR
      be1 = "0"
    }
    let POS //CHECK BASE SIGN
    if (be0[0] == "+") { POS = true; be0 = be0.slice(1) } 
    else if (be0[0] == "-") { POS = false; be0 = be0.slice(1) } 
    else POS = null
    be0 = Num.lstrip(be0, "0") //CLEAR LEFT ZEROS
    if (be0[0] == ".") be0 = "0" + "." + be0.slice(1) //REBUILD LEFT STARTING ZERO
    let bf = be0.split(".")
    if (bf.length == 1 || bf.length > 2) throw Error("Num.exp2num => scientific notation not valid (postfix .0 for base integer like 7.0e7): " + S)
    let bf0 = bf[0]; let bf1 = bf[1]
    if (!Num.isDigit(bf0) || !Num.isDigit(bf1)) throw Error("Num.exp2num => scientific notation not valid, typing error: " + S) //BASE MUST BE ONLY DIGITS
    bf1 = Num.rstrip(bf1, "0")        //CLEAR RIGHT ZEROS
    if (bf1 == "") bf1 = "0"         //REBUILD RIGHT ENDING ZERO
    if (bf0 == "0" && bf1 == "0") { //ZERO BASE
      if (POS == true || POS == false) throw Error("Num.exp2num => zero can not be signed: " + S) //SIGNED ZERO ERROR
      return "0.0"
    }
    let EXP = parseInt((POSE == false ? "-" : "+") + be1)
    POS = (POS == false ? "-" : "")
    let L_bf0 = bf0.length  //INTEGER BASE LENGTH
    let L_bf1 = bf1.length //DECS BASE LENGTH
    let r, DOT, s_CHECK
    if (EXP >= 0) {
      //POSITIVE INTEGER BASE AND EXPONENT >= 0
      if (POS == "" && bf1 == "0") return bf0 + "".padStart(EXP, "0") + ".0" //2.0e3 => 2000.0
      r = bf0 + bf1 + "".padStart(EXP - L_bf1, "0")                         //NEGATIVE INTEGER AND FLOATING POINT BASE
      DOT = (EXP - L_bf1 < 0 ? 1 : 0)
      s_CHECK = r.slice(0, L_bf0 + EXP) + "".padStart(DOT, ".") + r.slice(L_bf0 + EXP)
      s_CHECK = Num.lstrip(s_CHECK, "0")
      if (Num.IN(s_CHECK, "\\.")) {                         //if '.' in s_CHECK: /\./.test(s_CHECK)
        if (s_CHECK[0] == ".") return POS + "0" + s_CHECK  //0.0105e1 => 0.105
        return POS + Num.lstrip(s_CHECK, "0")             //-000.105e2 => -10.5 #000.10500e0 => 0.105
      }
      return POS + (s_CHECK + ".0") //+000.105e3 => 105.0 .0105000e4 => 105.0
    }
    //NEGATIVE EXPONENT (EXP < 0)
    if (L_bf0 == 1) { //0.1e-1 => 0.01
      r = "".padStart(-EXP, "0") + bf0 + bf1
      return POS + "0." + Num.rstrip(r.slice(1), "0") //-0.2e-1 => -0.02
    }
    DOT = L_bf0 + EXP
    if (DOT <= 0) return Num.rstrip(POS + "0." + "".padStart(-DOT, "0") + bf0 + bf1, "0") //-102.01e-3 => -0.10201
    r = Num.rstrip(POS + bf0.slice(0, EXP) + "." + bf0.slice(EXP) + bf1, "0")            //-102.01e-2 => -1.0201
    return r[r.length - 1] != "." ? Num.rstrip(r, "0") : r + "0";                       //3_000.0e-2 => 30.0
  }
  
  /** CHECK FOR ONLY DIGITS IN A STRING */
  //  HOW: true = '123' false = '123.0' '123a'
  //  CODE: s = '123'; console.log(Num.isDigit(s)) //true
  static isDigit(str) { return /^\d+$/.test(str) } 

  /** CLEAR LEFT CHARACTER STRING */
  //  CODE: s = '00001230'; sc = Num.lstrip(s); Num.print(sc, '\n') //1230
  static lstrip(str, ch = "0") { return str.replace(new RegExp("^" + ch + "+"), "") } 

  /**  CLEAR RIGHT CHARACTER STRING */
   //  CODE: s = '1230.20030000'; sc = Num.rstrip(s); Num.print(sc, '\n') //1230.2003
  static rstrip(str, ch = "0") { return str.replace(new RegExp(ch + "+$"), "") } 

  /** BOOLEAN IN CHECKS CHARACTER IN A STRING */
  //  CODE:  Num.print(Num.IN('123.4', '.'), '\n') //true
  static IN(s, ch) { return new RegExp(ch).test(s) ? true : false } 

  /** IT CHECKS TYPES number bigint onlyDigitString (PYTHON PORTABILITY) */
  //  true = 123 123.0 123n '123' false = '123.4' '123.0'
  //  CODE: Num.print(Num.isInt(123), '\n') //true
  static isInt(n) {
    if (typeof n == "number") {
      if (Number.isInteger(n)) return true
      return false
    }
    if (typeof n == "bigint") return true
    if(Num.isDigit(n)) return true
    return false
  }

  /** (PYTHON PORTABILITY) CONVERT A NUMERIC STRING TO BigInt BY TRUNCATION: OK => '0' '1' '2' ..., Error => '0.0' '1.0' '2.0' ... */
  //  CODE: Num.print(Num.int('123'), '\n') //123
  static int(n) {
    if(typeof(n) == 'number') {
      let N = n.toString().toUpperCase().split('E')
      let s
      if(N[0] == '-INFINITY' || N[0] == 'INFINITY') throw Error("Num.int => ValueError: NOT A NUMBER (nan): " + n)
      if(N[1]) { //EXPONENTIAL (ONLY INTEGER RESULTS)
        let SIGN = (N[0][0] == '-' ? '-' : '')
        if(Num.isDigit(N[0]) || SIGN && Num.isDigit(N[0].slice(1))) {   //1e+21 =>  1000000000000000000000
          s = new Num(N[0] + '.0' + 'e' + N[1])                        //-1e+21 => -1000000000000000000000
          return BigInt(s.n2 + s.n0)
        }
        s = new Num(N[0] + 'e' + N[1]) //+-1.234567e+21 => +-1234567000000000000000
        return BigInt(s.n2 + s.n0)
      }
      return BigInt(Number.parseInt(n)) //TRUNCATION -1.7 => -1n  -2.3456e-1 => 0
    } 
    if(typeof(n) == 'bigint') return n //BigInt
    if(n.type == 'Num')       return BigInt(n.n2 + n.n0)          //Num TRUNCATION by BigInt
    if(Num.isDigit(n))        return BigInt(n)                   //POSITIVE INTEGER STRING (ONLY DIGITS)
    if(n[0] == '-' && Num.isDigit(n.slice(1))) return BigInt(n) //NEGATIVE INTEGER STRING
    throw Error("Num.int => ValueError: invalid literal for int() with base 10: " + n)
  }

  /**   DIVISION BETWEEN SIGNED INTEGER NUMBER 
  //    IT RUNS THE DIVISION BETWEEN SIGNED INTEGER NUMBERS ONLY AND THE QUOTIENT
  //      IS A FLOATING POINT STRING OF ARBITRARY PRECISION (DEFAULT 3 DIGITS). */
  //    CODE: Num.print(Num.divi(5, 3), '\n') //1.666
  static divi(n, div, d = 3) {
    if (!Num.isInt(n) || !Num.isInt(div)) throw Error("Num.divi => TypeError number must be integer: " + n + " " + div)
    n = BigInt(n)
    div = BigInt(div)
    if (!div) throw Error("Num.divi => ZeroDivisionError, Num division by zero: " + div)
    let n_si = n < 0 ? true : false
    let div_si = div < 0 ? true : false
    n = n < 0n ? -n : n          //abs()
    div = div < 0n ? -div : div //abs()
    d = BigInt(d) < 0n ? -BigInt(d) : BigInt(d)
    let r = n / div; //INTEGER BigInt DIVISION
    let s = String(r) + "."
    let k = d
    while (k > 0) {
      r = n % div
      n = r * 10n
      r = n / div
      s += String(r)
      if (!r && !n) break //#CLEAR SPURIOUS ZEROs
      k--
    }
    if (!(n_si || div_si) || (n_si && div_si)) return d ? s : s + "0"                               //POSITIVE
    else return d ? (s == "0.0" ? s : "-" + s) : ("-" + s + "0" == "-0.0" ? "0.0" : "-" + s + "0") //NEGATIVE
  }

  /** (+) CALCULATOR ADDITION METHOD */
  //  CODE: Num.print(Num.add('2.1', '3.2'), '\n') //5.3
  static add(a, b) { a = new Num(a); b = new Num(b); return a.Add(b); }

  /**  (-) CALCULATOR SUBTRACTION METHOD */
  //   CODE: Num.print(Num.sub('2.1', '3.2'), '\n') //-1.1
  static sub(a, b) { a = new Num(a); b = new Num(b); return a.Sub(b); }

  /** (*) CALCULATOR MULTIPLICATION METHOD */
  //   CODE: Num.print(Num.mul('2.1', '-3.2'), '\n') //-6.72
  static mul(a, b) { a = new Num(a); b = new Num(b); return a.Mul(b); }

  /** (1/n) CALCULATOR NUMBER INVERSE METHOD */
  //   CODE: Num.print(Num.inv('3.0'), '\n') //0.33333333333333333333333333333333333333333333333333333333333333333333333333333333
  static inv(n, precision = 80) {
    let one = new Num(1, precision)
    n = new Num(n)
    n.ToPrecision(precision)
    return one.Div(n, precision)
  }

  /** (/) CALCULATOR DIVISION METHOD */
  //   CODE: Num.print(Num.div('1_234.001', '9.14'), '\n') //135.01105032822757111597374179431072210065645514223194748358862144420131291028446389
  static div(n, DIV, d = 80) {
    n = new Num(n)
    DIV = new Num(DIV)
    let D = DIV.L_n0 + n.L_n0 + DIV.L_n1 + n.L_n1 //AUTOMATIC FLOATING POINT COUNT
    return n.Div(DIV, d >= D ? d : D)
  }

  /** (%) MODULE BINARY OPERATOR (NUM FLOATING POINT DIVISION REMAINDER) */
  //   CODE: Num.print(Num.mod('1_234.001', '9.14'), '\n') //0.101
  static mod(n, DIV) { n = new Num(n); DIV = new Num(DIV); return n.Mod(DIV); }

  /**  (/) CALCULATOR DIVISION AND MODULUS METHOD RETURN TWO ELEMENT ARRAY */
  //   CODE: QR = Num.divmod('1_234.001', '9.14'); Num.print(QR[0], '\n', QR[1] + '\n') //135.0 0.101
  static divmod(n, DIV, d = 80) { n = new Num(n); DIV = new Num(DIV); return n.DivMod(DIV, d); }

  /**  INCREMENT VARIABLE ADDING METHOD -OBJECT MODIFY BY this REFERENCE */
  //   CODE: a = new Num(3); Num.inc(a); a.Print('\n'); //4.0
  static inc(m, sob = 1) { let n = new Num(sob); return m.Inc(n); }

  /**  DECREMENT VARIABLE ADDING METHOD -OBJECT MODIFY BY this REFERENCE */
  //   CODE: a = new Num(4); Num.dec(a); a.Print('\n'); //3.0
  static dec(m, sob = 1) { let n = new Num(sob); return m.Dec(n); }

  /**  CLEAR VARIABLE */
  //   CODE: a = new Num(4); Num.clear(a); a.Print('\n'); //0.0
  static clear(v) { return v.Clear(); }

  /**  RETURN THE ABSOLUTE VALUE OF Num */
  //   CODE: a = new Num(-4); b = Num.abs(a); b.Print('\n'); //4.0
  static abs(n) { return new Num(n).Abs(); }

  /**  is_numint BOOLEAN CHECKS IF INTEGER Num */
  //   CODE: a = '7.14'; Num.print(Num.is_numint(a), '\n') //false
  static is_numint(n) { n = new Num(n); return n.Is_numint(); }

  /**  is_numfloat BOOLEAN CHECKS IF FLOATING POINT Num */
  //   CODE: a = '7.14'; Num.print(Num.is_numfloat(a), '\n') //true
  static is_numfloat(n) { n = new Num(n); return n.Is_numfloat(); }

  /**  is_numstr BOOLEAN CHECKS NUMERIC STRING VALIDATION */
  //   CODE: a = '7.14'; Num.print(Num.is_numstr(a), '\n') //true
  static is_numstr(n) { try { new Num(n); return true; } catch (e) { return false } }

  /**  Is_zero BOOLEAN CHECKS FOR ZERO Num VALUE */
  //   CODE: a = '0.0'; Num.print(Num.is_zero(a), '\n') //true
  static is_zero(n) { n = new Num(n); return n.Is_zero(); }

  /**  Is_negative BOOLEAN CHECKS FOR Num NEGATIVE */
  //   CODE: a = '-60.0'; Num.print(Num.is_negative(a), '\n') //true
  static is_negative(n) { n = new Num(n); return n.Is_negative(); }

  /** Is_positive BOOLEAN CHECKS FOR Num POSITIVE */ 
  //   CODE: a = '60.0'; Num.print(Num.is_positive(a), '\n') //true
  static is_positive(n) { n = new Num(n); return !n.Is_negative(); }

  /** is_numodd BOOLEAN CHECKS FOR Num ODD (1 3 5 7 9) */ 
  //   CODE: a = '3.0'; Num.print(Num.is_numodd(a), '\n') //true
  static is_numodd(n) { n = new Num(n); return n.Is_numodd(); }

  /**  is_numeven BOOLEAN CHECKS FOR Num EVEN (0 2 4 6 8) */
  //   CODE: a = '32.0'; Num.print(Num.is_numeven(a), '\n') //true
  static is_numeven(n) { n = new Num(n); return n.Is_numeven(); }

  /**  (!) not LOGIC UNARY OPERATOR */
  //   CODE: a = '32.0'; Num.print(Num.not(a), '\n') //false
  static not(a) { a = new Num(a); return a.Not(); }

  /**  (>) gt GREATER LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '31.009'; Num.print(Num.gt(a, b), '\n') //true
  static gt(a, b) { a = new Num(a); b = new Num(b); return a.GT(b); }

  /**  (==) eq EQUAL LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '00032.000'; Num.print(Num.eq(a, b), '\n') //true
  static eq(a, b) { a = new Num(a); b = new Num(b); return a.EQ(b); }

  /**  (!=) ne NOT EQUAL LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '00032.000'; Num.print(Num.ne(a, b), '\n') //false
  static ne(a, b) { a = new Num(a); b = new Num(b); return a.NE(b); }  
  
  /**  (>=) ge GREATER OR EQUAL LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '00032.000'; Num.print(Num.ge(a, b), '\n') //true
  static ge(a, b) { a = new Num(a); b = new Num(b); return a.GE(b); }

  /**  (<) lt LESS LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '00032.0001'; Num.print(Num.lt(a, b), '\n') //true
  static lt(a, b) { a = new Num(a); b = new Num(b); return a.LT(b); }

  /**  (<=) le LESS OR EQUAL LOGIC BINARY OPERATOR */
  //   CODE: a = '32.0'; b = '00032.0000'; Num.print(Num.le(a, b), '\n') //true
  static le(a, b) { a = new Num(a); b = new Num(b); return a.LE(b); }

  /**  (**) pow POWER BINARY OPERATOR */
  //   CODE: a = '3.141592654'; b = '00032.0000'; Num.print(Num.pow(a, b), '\n') //8105800823779434.622333519815226986486294754347963859083618776449435744406951593179306895537081939088177022091324204782206088939637643283757618799889265322120368150027118933160426146106404915154071986463015589172581082786016574284144628596016627310155882151908098240429410931037501369474353435344755490816
  static pow(b, e) { b = new Num(b); e = new Num(e); return b.Pow(e); } //ARGUMENT e MANDATORY

  /**  sqrt SQUARE ROOT METHOD */
  //   CODE: const a = '3.141592654'; Num.print(Num.sqrt(a), '\n') //1.77245385102123321827450760252310431420947182908524622227913708717352941441455468
  static sqrt(n, d = 80) {
    d = d < 0 ? -d : d //Math.abs(d)
    n = new Num(n)
    if (n.Is_numint() && d == 0) {
      //ONLY INTEGER SQUARE ROOT RESULT
      if (n.Is_negative()) throw Error("Num.sqrt => Negative number: " + n)
      if (Num.not(n)) return new Num("0.0")        //ROOT ZERO
      let L = BigInt((String(n).length + 1) >> 1) //TWO DIVISION TO OBTAIN INTEGER ROOT SIZE
      let r = 10n ** L //NEWTON'S METHOD ON BIGINT
      n = BigInt(n.n0)
      let q = n / r
      while (r > q) {
        r = (r + q) >> 1n
        q = n / r
      } //BigInt TWO DIVISION
      return new Num(r)
    }
    let nv = n.n.split(".")
    if (Num.int(nv[0]) < 0) throw Error("Num.sqrt => Negative number: " + n)
    let n0 = nv[0]
    let L_n0 = n0.length
    let n1 = nv[1]
    let L_n1 = n1.length
    let L_rx = (String(n0).length + 1) >> 1 //X2DIVISION - ROOT DIGIT LENGTH
    L_n1 = n1.length                       //FLOATING DIGIT NUMBER
    let ds, shift
    let root, temp
    if (n0 == "0") {           //0 < n < 1 (0.000604569744 => 0.024588)
      shift = (L_n1 + 1) >> 1 //X2DIVISION - DECIMAL POINT POSITION
      ds = d - shift
      let op
      if (L_n1 % 2) op = n1 + "0" + "".padStart(ds, "0") + "".padStart(ds, "0") //ODD (DISPARI)
      else op = n1 + "".padStart(ds, "0") + "".padStart(ds, "0")               //EVEN (PARI)
      let r1 = String(Num.sqrt(Num.int(op), 0))
      let r1_len = r1.length - 2 //'.0'
      let CHECK = shift - r1_len + ds
      if (ds > 0) return new Num("0." + "".padStart(CHECK, "0") + r1)
      return new Num("0." + ("".padStart(shift - r1_len, "0") + r1).slice(0, d))
    } else if (n1 == "0") {                                              //INTEGER OPERAND 257.0 => 16.03 (d=2) 9.0 => 3.0
      root = String(Num.sqrt(Num.int(n0 + "".padStart(d * 2, "0")), 0)) //
      return new Num(root.slice(0, L_rx) + "." + root.slice(L_rx))     //257.0 => 16.03 (d=2)
    } else { //FLOATING-POINT OPERAND
      if (L_n1 % 2) { //DECIMALS ODD (DISPARI) //25.9 => 5.08920425999978900434230163474327049632257029638808099114709622220026665997431335
        temp = String(Num.sqrt(Num.int(n0 + n1 + "0" + "".padStart(d * 2, "0")), 0))
        return new Num(temp.slice(0, L_rx) + "." + temp.slice(L_rx, L_rx + d))
      } //DECIMALS EVEN (PARI) //25.96 => 5.09509568114279871567534636517863967354699087400503518520374790623939934333586014
      temp = String(Num.sqrt(Num.int(n0 + n1 + "".padStart(d * 2, "0")), 0))
      return new Num(temp.slice(0, L_rx) + "." + temp.slice(L_rx, L_rx + d))
    }
  } //END static sqrt FUNCTION

  /** CALCULATOR ITH ROOT METHOD */
  //  CODE: const a = '27.0'; Num.print(Num.root_i(a, 3), '\n') //3.0
  static root_i(n, i = 3, d = 80) {
    if (!i) return new Num("1.0")
    n = new Num(n, d)
    i = new Num(i)
    if (i.Is_numeven() && n.n2) throw Error("Num.root_i => Negative number: " + n.n)
    if(i.Is_negative()) { n = (new Num(1)).Div(n); i = -i }
    i = Number(i)
    let sign = (n < 0 ? '-'  : '')
    n = n.Abs() 
    let N = n.n.split('.')
    let n0 = String(N[0]), n1 = String(N[1])
    n = n0 + n1
    let W = i * d - n1.length //SET PRECISION  
    n = W >= 0 ? n + ''.padStart(W, '0')  : n.slice(0, W) //INTEGER CONVERSION
    let z = BigInt(n)
    i = BigInt(i)
    let s = z + 1n //BigInt
    n = z
    let t, r
    let I = i - 1n
    while (z < s) { //NEWTON'S METHOD
      s = z
      try { t = I*s + n/s**I } catch (e) { throw Error("Num.root_i => d parameter too low: " + d) }  
      z = t/i
    }
    s = String(s)
    if (d) { //FLOATING POINT CONVERSION WITH CLEARING ZEROS 
      s = ''.padStart((1 + d - s.length), '0') + s
      r = Num.rstrip(s.slice(0, -d) + '.' + s.slice(-d), '0')
      s = r.slice(-1) == '.' ? r + '0' : r
      return (new Num(sign + s))
    }
    return (new Num(sign + s + '.0')) //INTEGER CONVERSION
  }

  /**  Num FLOATING POINT TRUNCATION */
  //   CODE: const a = '27.953'; Num.print(Num.trunc(a, 0), '\n') //27.0
  static trunc(a, d = 0) {
    a = new Num(a)
    return a.Trunc(d)
  }

  /**  Num FLOOR ROUNDING -RELATIVE ROUND DOWN d=1: 0.12 => 0.1 -0.12 => -0.2 */
  //   CODE: const a = '27.953'; Num.print(Num.round_floor(a, 2), '\n') //27.95
  static round_floor(a, d = 0) { //-> RELATIVE VALUE (REAL NUMBER R)
    a = new Num(a)
    return a.Round_floor(d)
  }

  /**  Num HALF UP ROUNDING - COMMON STANDARD -RELATIVE ROUND_HALF_CEIL d=1: 0.15 => 0.2 -0.15 => -0.1 */
  //   CODE: const a = '27.953'; Num.print(Num.round(a, 1), '\n') //28.0
  static round(a, d = 2) { 
     a = new Num(a)
    return a.Round(d)
  }

  /**  Num CEIL ROUNDING -RELATIVE ROUND UP d=1: 0.12 => 0.2 -0.12 => -0.1 */
  //   CODE: const a = '27.953'; Num.print(Num.round_ceil(a, 2), '\n') //27.96
  static round_ceil(a, d = 0) {
     a = new Num(a)
    return a.Round_ceil(d)  
  }

  /**  Num HALF EVEN ROUNDING */
  //   CODE: const a = '27.853'; Num.print(Num.round_bank(a, 1), '\n') //27.8
  static round_bank(a, d = 2) { 
     a = new Num(a)
    return a.Round_bank(d)
  } 

  /** reduce USED BY sum() */
  //  CODE: const cart = ['0.1', '0.2']; Num.print(Num.reduce(cart), '\n') //0.3
  static reduce(cart) {
    const sum = cart.reduce((A, V) => {
      A = new Num(A)
      return A.Add(V) //ADDING THE CURRENT VALUE TO THE ACCUMULATOR
    }, 0)              //THE INITIAL VALUE IS 0
    return sum
  }

  /**  CALCULATOR sum METHOD */
  //   CODE: const cart = ['0.1', '0.2', '0.3']; Num.print(Num.sum(cart), '\n') //0.6
  static sum(L) { return Num.reduce(L) }

  /**  CALCULATOR mean METHOD */
  //   CODE: const cart = ['0.1', '0.2', '0.3']; Num.print(Num.mean(cart), '\n') //0.2
  static mean(L) { return Num.reduce(L).Div(L.length) }

  /**  CALCULATOR min METHOD */
  //   CODE: const cart = ['0.2', '0.1', '0.3']; Num.print(Num.min(cart), '\n') //0.1
  static min(L) {
    let m, t, j
    m = new Num(L[0])                 //FIRST ELEMENT
    for (j = 1; j < L.length; j++) { //DIRECTLY ACCESS EACH ELEMENT
      t = new Num(L[j])
      if(t.LT(m)) m = t
    } 
    return m
  }

  /**  CALCULATOR max METHOD */
  //   CODE: const cart = ['0.2', '0.3', '0.1']; Num.print(Num.max(cart), '\n') //0.3
  static max(L) {
    let m, t, j
    m = new Num(L[0])                 //FIRST ELEMENT
    for (j = 1; j < L.length; j++) { //DIRECTLY ACCESS EACH ELEMENT
      t = new Num(L[j])
      if(t.GT(m)) m = t
    } 
    return m
  }

  /** CONVERT A Num OBJECT TO SCIENTIFIC NOTATION STRING */  
  //  CODE: a = new Num('1_250.75'); Num.print(Num.num2exp(a), '\n') //1.25075e3
  static num2exp(ob) {
    if (ob.type != "Num") throw Error("Num.num2exp( => type not valid: " + ob);
    let e, CHECK, n1, L_n1
    if (ob.n1 == '0') { //EXP >= 0
      e = ob.L_n0 - 1
      CHECK = Num.rstrip(ob.n0[0] + '.' + ob.n0.slice(1), '0')
      if (CHECK.slice(-1) == '.') CHECK += '0'
      return ob.n2 + CHECK + 'e' + String(e)
    }  
    if (ob.n0 == '0') { //EXP < 0
      n1 = Num.lstrip(ob.n1 , '0')
      L_n1 = (n1).length
      e = ob.L_n1 - L_n1 + 1
      if (L_n1 == 1) return ob.n2 + n1 + '.0' + 'e' + String(-e)
      return ob.n2 + n1.slice(-L_n1, -L_n1+1) + '.' + n1.slice(-L_n1+1) + 'e' + String(-e)
    } 
    e = ob.L_n0 - 1
    return ob.n2 + ob.n0[0] + '.' + ob.n0.slice(1) + ob.n1 + 'e' + String(e)
  }

  /**  RETURN AN ARRAY WITH Num LENGTHS BEFORE AND AFTER FLOATING POINT DOT */
  //   CODE: a = new Num('1_250.75'); Num.print(Num.len(a), '\n') //4,2
  static len(a) { 
    if(a.type != 'Num') a = new Num(a)
    return a.Len() //Array
  } 

  /** in BOOLEAN ARRAY OPERATOR */
  //CODE:  A = [ new Num(3), new Num(-6), new Num(0), new Num('9.7'), new Num('6.1') ]; Num.print(Num.in(A, new Num('9.7')), '\n') //true
  static in(a, b) { return a.find(element => element.n == b.n) ? true : false }

  /** not_in BOOLEAN ARRAY OPERATOR */
  //  CODE: A = [ new Num(3), new Num(-6), new Num(0), new Num('9.7'), new Num('6.1')]; Num.print( Num.not_in(A, new Num('9.701')), '\n') //true
  static not_in(a, b) { return a.find(element => element.n == b.n) ? false : true }

  // is OPERATOR, TWO VARIABLES WITH A SAME ADDRESS MEANS ONE OBJECT), 
  // CODE: a = new Num('3.14'); b = new Num('3.14'); Num.print(Num.is(a, b), '\n') //false
  static is(a, b) { return a === b ? true : false }

  /**  is_not OPERATOR, TWO VARIABLES WITH A DIFFERENT ADDRESS MEANS TWO OBJECT */
  // CODE: a = new Num('3.14'); b = new Num('3.14'); Num.print(Num.is_not(a, b), '\n') //true
  static is_not(a, b) { return a === b ? false : true }

  /** and LOGIC OPERATOR */
  //  CODE: a = new Num('3.14'); b = new Num('0.0'); Num.print(Num.and(a, b), '\n') //false
  static and(a, b) { return a.And(b) }

  /** or LOGIC OPERATOR */
  //  CODE: a = new Num('3.14'); b = new Num('0.0'); Num.print(Num.or(a, b), '\n') //true
  static or(a, b) { return a.Or(b) } 

  /**  f_price_over ADD OR SUB A PERCENTAGE VALUE TO A BASE PRICE */
  //   CODE: price = new Num('329.99'); disc = new Num(20); Num.print(Num.f_price_over(price, -disc).Round(2), '\n') //263.99
  static f_price_over(sob, t = 22) { return sob.F_price_over(t) }

  /** f_price_spinoff SPIN OFF PERCENTAGE TAX VALUE FROM A BASE PRICE */
  //   CODE: price = new Num('263.99'); tax = new Num(22); Num.print(Num.f_price_spinoff(price, tax).Round(2), '\n') //216.39
  static f_price_spinoff(sob, t = 22) { return sob.F_price_spinoff(t) }

  /**  f_fund_fr FRENCH FINANCING MONTH MORTGAGE (HIGH PRECISION) */
  //   CODE: principal = new Num('150_000.00'); rate = new Num(3); years = new Num(30); Num.print(Num.f_fund_fr(principal, rate, years).Round(2), '\n') //637.74
  static f_fund_fr(asset, i, y) {
    i = new Num(i).Div(100) 
    let one = new Num(1)
    return asset.Mul(i).Div(one.Sub(one.Add(i).Pow(-y))).Div(12) 
  }

  /** f_filewrite WRITE A NUMBER STRINGS COLUMN ON DISK */
  //  CODE: Num.f_filewrite([new Num('3.14'), new Num('2.72'), new Num('1.0'), new Num('2.0'), new Num('3.0'), ], 'nums.txt') //WRITING FILE nums.txt => 3.14,2.72,1.0,2.0,3.0
  static f_filewrite(L, filename = 'nums.txt') {
    const fs = require('fs')
    let arr_str = L.join('\n') //JOINS ARRAY ELEMENTS 
    try {
      fs.writeFileSync(filename, arr_str, 'utf-8')
    } catch (e) { throw Error("Num.f_filewrite( => writing disk error: " + filename) }
  }

  /** f_fileread READ A NUMBER STRINGS COLUMN FROM DISK */
  //  CODE: A = Num.f_fileread('nums.txt'); Num.print(A, '\n'); //READING FILE nums.txt => 3.14,2.72,1.0,2.0,3.0
  static f_fileread(filename = 'nums.txt') {
    const fs = require('fs')
    let file
    try { 
      file = fs.readFileSync(filename, 'utf-8')
    } catch (e) { throw Error("Num.f_fileread( => reading disk error: " + filename) }
    let A = [] //ARRAY
    file.split(/\r?\n/).forEach(line => A.push(line))
    return A
  }

  //minus_unary INVERTED SIGN OF this ARGUMENT  (UNARY MINUS)
  //  CODE: a = new Num('+3.14'); a.Print('\n'); Num.minus_unary(a); a.Print('\n') //3.14 -3.14
  static minus_unary(N) { 
    return N.Invsign() 
  }
  
  /** invsign INVERTED SIGN OF this ARGUMENT (UNARY MINUS) */
  //  CODE: a = new Num('+3.14'); a.Print('\n'); Num.invsign(a); a.Print('\n') //3.14 -3.14
  static invsign(N) { return N.Invsign() }

  /**  plus, SET PLUS SIGN OF Num */
  //   CODE: a = new Num('-3.14'); a.Print('\n'); Num.plus(a); a.Print('\n') //-3.14 3.14
  static plus(N) { return N.Plus() }

  /**  minus, SET MINUS SIGN OF Num */
  //   CODE: a = new Num('3.14'); a.Print('\n'); Num.minus(a); a.Print('\n') //3.14 -3.14
  static minus(N) { return N.Minus() }

  /** Num to BigInt */ 
  //  CODE: a = '1234567890123456789012345678901234567890.0'; Num.print(Num.toBigInt(a), '\n') //1234567890123456789012345678901234567890 (BigInt)
  static toBigInt(N) { 
    N = new Num(N)
    return N.ToBigInt(N.n2 + N.n0 + N.n1) 
  }

  /**  shift, SHIFT Num (MULTIPLY AND DIVIDE BY TEN) */
  //   CODE: a = '123.456789'; Num.print(Num.shift(a, 3), '\n') //123456.789
  static shift(N, zeros) {
    N = new Num(N)
    zeros = Num.toBigInt(new Num(zeros))
    if (zeros > 0n)     { return new Num(N.Mul(10n **  zeros)) }
    else if(zeros < 0n) { return new Num(N.Div(10n ** -zeros, -zeros + BigInt(N.L_n1))) }
    return N
  }
  
  /** andb, AND BITWISE OPERATOR */
  //  CODE: a = new Num(11); b = new Num(1); Num.print(Num.andb(a, b), '\n') //1.0
  static andb(a, b) { return a.Andb(b) }  
  
  /** orb, OR BITWISE OPERATOR */
  //  CODE: a = new Num(11); b = new Num(1); Num.print(Num.orb(a, b), '\n') //11.0
  static orb(a, b)  { return a.Orb(b)  }
  
  /** xorb, XOR BITWISE OPERATOR */
  //  CODE: a = new Num(11); b = new Num(1); Num.print(Num.xorb(a, b), '\n') //10.0
  static xorb(a, b) { return a.Xorb(b) }

  /** (~) notb, NOT UNARY BITWISE OPERATOR */
  //  CODE: a = new Num(11); Num.print(Num.notb(a), '\n') //4.0
  static notb(a) { return a.Notb() }

  /** f_perf PERCENTAGE PERFORMANCE VALUE (DIRECT RATIO) */
  //  CODE: a = new Num('11.5'); b = new Num('6.0'); Num.print(Num.f_perf(a, b).Round().GE(0) ? '+' : '', Num.f_perf(a, b).Round(), '%', '\n') //-47.83%
  static f_perf(a, b) { return a.F_perf(b) } 

  /**  f_perf_time PERCENTAGE AND RELATIVE MAGNITUDE ORDER TIME PERFORMANCE VALUE (INVERSE RATIO) */
  //   a = new Num('11.5'); b = new Num('6.0'); Num.print(Num.f_perf_time(a, b)[0].GE(0) ? '+' : '', Num.f_perf_time(a, b)[0].Round(), '%', '\n') //+91.67%
  static f_perf_time(a, b) { 
    a = new Num(a)
    b = new Num(b)
    return a.F_perf_time(b) 
  }

  /** float, Num TO FLOAT */
  //  CODE: Num.print(Num.float(new Num('3.141592654')), '\n') //3.141592654 (number)
  static float(a) { 
    let MAX_VALUE = new Num('1.7976931348623157e+308')
    let MIN_VALUE = new Num('5.0e-324')
    if(a.GT(MAX_VALUE) || a.LE(MIN_VALUE)) throw Error("Num.float => OVERFLOW number error: " + a)
    return a.toFloat() 
  } 

  /** float2num_list, FLOAT TO NUM LIST CONVERSION */
  //  CODE: A = Num.float2num_list([-110.0, +0.14, -20.456120, 1200.0654, 0.0, 3.14, 2.72]); Num.print(A[0].type, '\n') //Num
  static float2num_list(L) {
    let LN = []
    for(let i of L) LN.push(new Num(Number.isInteger(i) || typeof(i) == 'bigint' ? i : i.toString()))
    return LN
  }

  /** ieee754, FLOAT TO IEEE754 CONVERSION  */
  //  CODE: console.log(Num.ieee754(3.14)); //3.140000000000000124344978758017532527446746826171875000
  static ieee754(n) { return n.toPrecision(55) }
  
  /** float2num, FLOAT TO Num CONVERSION */  
  //  CODE: console.log(Num.float2num(3.14).toString()); //3.14 (Num)
  static float2num(f) { return new Num(String(f)) }

  /** toPrecision, PRECISION SET Num d PROPERTY (DIVISION OPERATION) */
  //  CODE: DIGITS = 6; a = new Num(1); a.ToPrecision(DIGITS); b = new Num(3); b.ToPrecision(DIGITS); Num.print(a.Div(b, DIGITS), '\n') //0.333333
  static toPrecision(N, P) { N.ToPrecision(P) }

  /** toFixed, COMMON STANDARD ROUNDING => Round() -relative round_half_ceil d=1: 0.15 => 0.2 -0.15 => -0.1 */
  //  CODE: a = new Num('3.14159'); T = Num.toFixed(a, 4); Num.print(T, '\n') //3.1416
  static toFixed(N, d = 2) { return N.ToFixed(d) } //RETURN STRING

  /** randInt, RANDOM Number INTEGER BETWEEN MIN AND MAX */
  //  CODE: for(let i = 0; i < 6; i++) console.log(Num.randInt(1, 6)) //...
  static randInt(min = 0, max = 9) { return Math.floor(Math.random() * (max - min + 1)) + min }

  /** randFloat, RANDOM Number FLOAT BETWEEN MIN AND MAX */
  //  CODE: for(let i = 0; i < 6; i++) console.log(Num.randFloat(1, 6)) //...
  static randFloat(min = 0, max = 9) { return String(Math.random() * (max - min) + min) }

  /** print, PRINT (VIDEO OUTPUT) */
  //  a = new Num('3.14'); Num.print('a = ', a.toString(), '\n') //3.14
  static print(... args) { for (let arg of args) process.stdout.write(arg.toString()) }

  /** CALCULATOR MODE: _10y, TEN POWER */
  // CODE: a = 9; Num._10y(a).Print("\n"); //1000000000.0
  static _10y(E) { return new Num(10).Shift(E - 1) }

  /** CALCULATOR MODE: _ey, e POWER */
  //  CODE: a = 5; Num._ey(a).Round(29).Print('\n') //148.41315910257660342111558004056
  static _ey(ex) { return Num.pow(Num.e, ex) }

  /**  CALCULATOR MODE: _2y, TWO POWER */
  // CODE: Num._2y("5.0").Print("\n"); //32.0
  static _2y(E) { return Num.pow(new Num(2), E) }

  /** CALCULATOR MODE: fact, FACTORIAL COMPUTATION */
  //  CODE: a = new Num('5.0'); console.log(Num.fact(a).toString()) //120
  static fact(n) {
    let F = 1n;
    for (let i = 1n; i <= n; i++) F *= i; 
    return F;
  }

  /** CALCULATOR MODE: x2, SQUARE POWER */
  //  CODE: a = "3.1415"; Num.x2(a).Print("\n"); //9.86902225
  static x2(n) { return Num.mul(n, n) }

  /** CALCULATOR MODE: x3, CUBE POWER */
  //  CODE: a = "123.456"; Num.x3(a).Print("\n"); //1881640.295202816
  static x3(n) { return Num.mul(n, n).Mul(n) }

  /** CALCULATOR MODE: xe10, RETURN OBJECT MULTIPLIED OR DIVIDED FOR 10 POWER */
  //  CODE: a = "0.001"; Num.xe10(a, '6.0').Print("\n"); //1000.0
  static xe10(a, x) { return Num.shift(a, x) }

  /** CALCULATOR MODE: xy, POWER */ 
  //  CODE: Num.xy("4.0", "30.0").Print("\n"); //1152921504606846976.0
  static xy(x, y) { return Num.pow(x, y) }

  /** CALCULATOR MODE: pct, PERCENTAGE VALUE */
  //  CODE: Num.pct("10.00", "1_648.98").Round().Print(" => DISCOUNT\n"); //164.9 => DISCOUNT
  static pct(rate, all = '1.0') {
    let R = new Num(rate)
    let A = new Num(all)
    return R.Mul(A.Shift(-2))
  }

  /** CALCULATOR MODE: rate, WITH THE ALL, RETURN THE RATE OF SPECIFIED PERCENTAGE */
  //  CODE: Num.rate("20.0", "1000.0").Print("\n"); //2.0
  static rate(pct, all = 1) {
    let PCT = new Num(pct)
    let ALL = new Num(all)
    return PCT.Shift(2).Div(ALL)
  }

  /** CALCULATOR MODE: all, WITH THE PERCENTAGE RETURN THE ALL OF SPECIFIED RATE */ 
  //  CODE: Num.all(2, 20).Print("\n"); //1000
  static all(RATE, PCT) {
    let rate = new Num(RATE)
    let pct  = new Num(PCT)
    return pct.Shift(2).Div(rate)
  }

  /** CALCULATOR MODE: pth, RETURN THE PERTHOUSAND TO SPECIFIED RATE */
  //  CODE: all = new Num("10_000.0"); Num.pth("2.0", all).Print("\n"); //20.0
  static pth(rate_th, all = '1.0') {
    let R = new Num(rate_th)
    let A = new Num(all)
    return R.Mul(A.Shift(-3))
  }

  /** CALCULATOR MODE: rate_th, WITH THE ALL, RETURN THE RATE OF SPECIFIED PERTHOUSAND */
  //  CODE: Num.rate_th("20.0", "10000.0").Round().Print(" => RATE_TH\n"); //2.0 => RATE_TH
  static rate_th(pth, all = 1) {
    let PTH = new Num(pth)
    let ALL = new Num(all)
    return PTH.Shift(3).Div(ALL)
  }

  /** CALCULATOR MODE: all_th, WITH THE PERTHOUSAND RETURN THE ALL OF SPECIFIED RATE */ 
  //  CODE: Num.all_th("2.00", "20.00").Round().Print(" => ALL_TH\n"); //10000.0 => ALL_TH
  static all_th(RATE, PTH) {
    let rate = new Num(RATE)
    let pth  = new Num(PTH)
    return pth.Shift(3).Div(rate)
  }

  /** price_sell, FINAL PRICE WITH DISCOUNTS */
  //CODE: Num.print(Num.price_sell('1007.79', "5.75", "4.25" , "3.75", "2.25") + '\n') //1043.91
  static price_sell(price_base, discount1=0, discount2=0, discount3=0, discount4=0, TAX=22) {
    let PRICE_BASE  = new Num(price_base)
    let PRICE_BASE2 = new Num(price_base)
    let D1 = PRICE_BASE.Pct(discount1).Round(2)
    PRICE_BASE = PRICE_BASE.Sub(D1)
    let D2 = PRICE_BASE.Pct(discount2).Round(2)
    PRICE_BASE = PRICE_BASE.Sub(D2)
    let D3 = PRICE_BASE.Pct(discount3).Round(2)
    PRICE_BASE = PRICE_BASE.Sub(D3)
    let D4 = PRICE_BASE.Pct(discount4).Round(2)
    PRICE_BASE = PRICE_BASE.Sub(D4)
    if(PRICE_BASE2.Sub(D1.Add(D2).Add(D3).Add(D4)).NE(PRICE_BASE)) throw Error("Num.price_sell( => SQUARENESS error: " + price_base)
    let PCT  = PRICE_BASE.Pct(TAX).Round(2)
    return PRICE_BASE.Add(PCT)
  }

  /** copy, COPY Num OBJECT */
  //CODE: a = new Num(3); b = Num.copy(a); if(a == b) Num.print("UNIQUE OBJECT\n"); else Num.print("DOUBLED OBJECT\n") //DOUBLED OBJECT
  static copy(a) { return new Num(a) }

  /** CHECK ADDITION OPERATION */
  //  CODE: 
  //  a = new Num(12); b = new Num(10); Num.print(a, " + "); Num.print(b, " = "); 
  //  proof = new Num(22); Num.print(proof, " ADDITION RESULT => "); 
  //  Num.print(Num.add_check(a, b, proof) ? "FAILURE" : "success", "\n"); //12.0 + 10.0 = 22.0 ADDITION RESULT => success
  static add_check(A1, A2, SUM) {
    A1 = new Num(A1)
    A2 = new Num(A2)
    SUM = new Num(SUM)
    return !(A1.EQ(SUM.Sub(A2)))
  }

  /** CHECK SUBTRACTION OPERATION */
  //  CODE: 
  //  a = new Num(12); b = new Num(10); Num.print(a, " - "); Num.print(b, " = "); 
  //  proof = new Num(2); Num.print(proof, " SUBTRACTION RESULT => "); 
  //  Num.print(Num.sub_check(a, b, proof) ? "FAILURE" : "success", "\n"); //12.0 - 10.0 = 2.0 SUBTRACTION RESULT => success
  static sub_check(M, S, DIF) {
    M = new Num(M)
    S = new Num(S)
    DIF = new Num(DIF)
    return !(M.EQ(DIF.Add(S)))
  }

  /** CHECK MULTIPLICATION OPERATION */
  //  CODE: 
  //  a = new Num(12); b = new Num(10); Num.print(a, " * "); Num.print(b, " = "); 
  //  proof = new Num(120); Num.print(proof, " PRODUCT RESULT => "); 
  //  Num.print(Num.mul_check(a, b, proof) ? "FAILURE" : "success", "\n"); //12.0 * 10.0 = 120.0 PRODUCT RESULT => success
  static mul_check(F1, F2, PRO) {
    F1 = new Num(F1)
    F2 = new Num(F2)
    PRO = new Num(PRO)
    let sum = 0
    let sum2 = 0
    let s = ''
    //PRODUCT SIGN CHECKING...
    if (F1.n2 && F2.n2 && !PRO.n2);          // - - => + 
    else if (!F1.n2 && !F2.n2 && !PRO.n2);  //  + + => +
    else if (F1.n2 && !F2.n2 && PRO.n2);   //   - + => -
    else if (!F1.n2 && F2.n2 && PRO.n2);  //    + - => - 
    else if ((F1 == "0.0" || F2 == "0.0") && PRO == "0.0") return 0; //ZERO PRODUCT RESULT CHECKING... SUCCESS
    else return 1; //... FAILURE
    let F1_S = F1.n0 + F1.n1
    let F1_Slen = F1.L_n0 + F1.L_n1
    for (let i = 0; i < F1_Slen; i++) {
      if (F1_S[i] == '0') continue; //SKIP ZERO DIGITS
      sum += F1_S[i] - '0'; if (sum > 9) sum -= 9;
    }
    let F2_S = F2.n0 + F2.n1
    let F2_Slen = F2.L_n0 + F2.L_n1
    for (let i = 0; i < F2_Slen; i++) {
      if (F2_S[i] == '0') continue; //SKIP ZERO DIGITS
      sum2 += F2_S[i] - '0'; if (sum > 9) sum -= 9;
    }
    s = String(sum * sum2)
    let slen = s.length
    sum = 0;
    for (let i = 0; i < slen; i++) {
      if (s[i] == '0') continue; //SKIP ZERO DIGITS
      sum += s[i] - '0'; if (sum > 9) sum -= 9;
    }
    sum2 = 0
    let PRO_S = PRO.n0 + PRO.n1
    let PRO_Slen = PRO.L_n0 + PRO.L_n1
    for (let i = 0; i < PRO_Slen; i++) {
      if (PRO_S[i] == '0') continue; //SKIP ZERO DIGITS
      sum2 += PRO_S[i] - '0'; if (sum2 > 9) sum2 -= 9;
    }
    return !(sum2 == sum);
  }

  /** div_check, CHECK DIVISION OPERATION */
  //  CODE: 
  //  a = new Num(12); b = new Num(10); Num.print(a, " mod "); Num.print(b, " = "); 
  //  proof = new Num(2); Num.print(proof, " DIVISION REM RESULT => "); 
  //  Num.print(Num.div_check(a, b, proof) ? "FAILURE" : "success", "\n"); //12.0 % 10.0 = 2.0 DIVISION REM RESULT => success
  static div_check(N, DIV, REM) {
    N   = new Num(N)
    DIV = new Num(DIV)
    REM = new Num(REM)
    let Q = Num.div(N, DIV).Round_floor()
    let m = Q.Mul(DIV)
    let s = m.Add(REM)
    if (Num.mul_check(Q, DIV, m)) return 1
    if (Num.add_check(m, REM, N)) return 1
    return !(N.EQ(s))
  }

  /** test_num7, NUMERIC STRING LIST FOR ARITHMETIC OPERATION TEST */
  //  CODE: test_num7() //computing... 
  static test_num7() {
    const L = [
      "1.0",
      "-103.0",
      "954165405446.0",
      "-456789357444877954666666689389357444877954666665744487795466666666893893574448779546666657444877954666666666893574448779546666666893893574448779546666657444877954666666666893574448779546666666666666689357444877954666666644444495486470.0",
      "0.0000000000000000000000000000000000000000000000000000000000000000000008935744876408935744876446387797795466666935744487795466666574448779546666665466666463877089357448767795466666935744487795466666574448779546666664463877954666695466666",
      "-456789357444877954666666689389357444877954666665744487795466666666893893574448779546666657444877954666666666893574448779546666666893893574448779546666657444877954666666666893574448779546666666666666689357444877954666666644444495486470.0000000000000000000000000000000000000000000000000000000000000000000008935744876408935744876446387797795466666935744487795466666574448779546666665466666463877089357448767795466666935744487795466666574448779546666664463877954666695466666",
      "456789357444877954666666689389357444877954666665744487795466666666893893574448779546666657444877954666666666893574448779546666666893893574448779546666657444877954666666666893574448779546666666666666689357444877954666666644444495486470.0000000000000000000000000000000000000000000000000000000000000000000008935744876408935744876446387797795466666935744487795466666574448779546666665466666463877089357448767795466666935744487795466666574448779546666664463877954666695466666",
      "-893574489357444877954668938893574448779546666693574448779546666657444877954666666668935744487795466666487795466666.0",
      "8935744487795466666.65401",
      "-6577116546540.654981112370893574487644638779546666680893574487644638779546666695440456795132",
      "777549511321456795134440.0333",
      "-951089357448764089357448764463877954666664638089350893574487644638779546666674487644638779546666677954666666540.649821222230",
    ]
    let SUM = new Num(0), DIF = new Num(0), PRO = new Num(0), QUO = new Num(0), Q = new Num(0), REM = new Num(0)
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {        
        SUM = Num.add(L[i], L[j])
        if (Num.add_check(L[i], L[j], SUM)) {
          Num.print(L[i], " + "); Num.print(L[j], " = ");
          SUM.Print("\n")
          Num.print("\nFAILURE - THIS SYSTEM DOES NOT SUPPORT ARBITRARY PRECISION ARITHMETIC (add)!\n")
          process.exit(1)
        }
        else Num.print("addition passed.\n");
        Num.print("------------------------------\n")  
      
        DIF = Num.sub(L[i], L[j])
        if (Num.sub_check(L[i], L[j], DIF)) {
          Num.print(L[i], " - "); Num.print(L[j], " = ");
          DIF.Print("\n")
          Num.print("\nFAILURE - THIS SYSTEM DOES NOT SUPPORT ARBITRARY PRECISION ARITHMETIC (sub)!\n")
          process.exit(1)
        }
        else Num.print("subtraction passed.\n")
        Num.print("------------------------------\n") 
      
        PRO = Num.mul(L[i], L[j])
        if (Num.mul_check(L[i], L[j], PRO)) {
          Num.print(L[i], " * "); Num.print(L[j], " = ");
          PRO.Print("\n")
          Num.print("\nFAILURE - THIS SYSTEM DOES NOT SUPPORT ARBITRARY PRECISION ARITHMETIC (mul)!\n")
          process.exit(1)
        }
        else Num.print("multiplication passed.\n")
        Num.print("------------------------------\n")
      
        QUO = Num.div(L[i], L[j]).Round_floor();
        REM = Num.sub(L[i], Num.mul(QUO, L[j]))
        if (Num.div_check(L[i], L[j], REM)) {
          Num.print(L[i], " % "); Num.print(L[j], " = ");
          QUO.Print("\n")
          Num.print("\nFAILURE - THIS SYSTEM DOES NOT SUPPORT ARBITRARY PRECISION ARITHMETIC (div)!\n")
          process.exit(1)
        }
        else Num.print("division passed.\n")
        Num.print("------------------------------\n")
        
        Num.print(L[i], " / "); Num.print(L[j], " = ");
        Num.div(L[i], L[j]).Print("\n")
        Num.print("------------------------------\n")

        Num.print(L[j], " inv "); Num.print(" = ");
        Num.inv(L[j], L[j].length).Print("\n")
        Num.print("------------------------------\n")

        Num.print(L[j], " x2 "); Num.print(" = ");
        Num.x2(L[j]).Print("\n")
        Num.print("------------------------------\n")

        Num.print(L[j], " x3 "); Num.print(" = ");
        Num.x3(L[j]).Print("\n")
        Num.print("------------------------------\n")

        Num.print(L[j], " ^ 8.0"); Num.print(" = ");
        Num.xy(L[j], "8.0").Print("\n")
        Num.print("------------------------------\n")
        Num.print("------------------------------\n")

      }            
    }
    Num.print("\nSUCCESS - THIS SYSTEM DOES SUPPORT ARBITRARY PRECISION ARITHMETIC (OK).\n")
    return
  }

} //num CLASS END

module.exports.Num = Num     //Num CLASS BECAME PUBLIC
