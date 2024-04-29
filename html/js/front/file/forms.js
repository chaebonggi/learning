/**
\ * Form check framework

 * 
 * history:
 * 	setRule, setExRule �굥���� Ȯ��.
 * interface:
 *  disabled(nm, bool): �ʵ���� �ʵ� disable����
 *  get(nm, defVal): �ʵ���� ����ȯ(nm:�޸�����8�� ������; ����ϰų� value�� �����̶�� �޸�����8�� ��ȯ)
 *  set(nm, newVal): �ʵ�? ������(nm:�޸������� ����������)
 *  reset(): ȭ�鰪 �缳d.
 *  focus(nm): �ʵ忡 ��Ŀ���̵�
 *  select(nm, idx, bool): �ʵ�? �ش��ϴ� �ε����� ���ÿ���(radio/checkbox/select)
 *  setRule(nms, rule, errmsg, alertmsg): �ʵ�? �ش��ϴ� ��; ����.
 *  setExRule(nms, rule, label, errmsgs, alertmsg): �ʵ�? �ش��ϴ� ��; �����ϸ� errmsgs�� �迭�̴�.
 * 	check(errseq): �꿡 ����� ����; ����.
 *  submit(url, mth, bool): ȭ�?; ����� ���(fg:���� ��� �����ó��)
 *  toString(): ȭ�鰪; name=value���8�� & ����8�� ���ڸ� ��ȯ.
 *  exists(): �ʵ� x�翩�� �� ��ȯ.
 */
 
 
var IS_DEBUG = false;
var LAST_FUN = null;
 
/**
 * Form ����
 * frm: ���� ��ü
 * 
 * var f = new Forms(document.forms[0]);
 * f.set("fieldname1", "value");
 * f.setRule("fieldname2, "min=1, max=100", "�����߻�");
 * if(f.checked()){
 * 	f.submit("url");
 * }
 */
function Forms(frm){
	
	if(!frm || typeof(frm) != "object"){
		return _ErrMsg("invalid form object");
	}
	
	this.frm = frm;
	this.flds = new Array();
	this.idx = 0;
	this.errobj = null;
}

/**
 * nms: ���ʵ��(�޸�����8�� �����ʵ带 ����Ҽ� �ִ�)
 * rule: �޸��� ���е� ��
 * errmsg: ��; ��� ���ϸ� ������ �޼���.(${���} ���� ��8�� ġȯ����)
 */
Forms.prototype.setRule = function(nms, rule, errmsg, alertmsg){
	var obj = new Object();
	obj.name = nms;
	obj.rule = rule;
	obj.errmsg = errmsg;
	obj.alertmsg = alertmsg;

	this.flds[this.idx++] = obj;
}

//�̼��� ����Զ����� ����� �߰��Ѵ�.
Forms.prototype.setExRule = function(nms, rule, lbl, errmsgs, alertmsg){
	
	this.setRule(nms, rule, lbl+":\n"+errmsgs.join("\n"), alertmsg);
}

Forms.prototype.clearRule = function(){
	this.flds = new Array();
	this.idx = 0;
}
	

/**
 * �־���� ����8�� ������۾�ó��
 * errseq:true - ������ ���� ������ ��� ������ ��� �޼��� ��Ƽ� ���.
 *        false - ������ ���� �ٷ� ���߰� ������ �� ��Ŀ�� �̵��� �޼��� ���
 * return: ���������� �����ϸ鿩�� ��ȯ(true/false)
 */
Forms.prototype.check = function(isErrSeq){
	
	var errmsg = "";
	var errobj = null;
	var fldobj = null;
	var fldnms = null;
	var errCnt = 0;
	var rules = null;
	var isOr = false;
	var operation = null;
	
	//��object�ʱ�ȭ.
	this.errobj = null;
	
	try{
		for(var i=0;i<this.flds.length;i++){
			fldnms = this.flds[i].name.split(",");
			rules = _ParseRule(this.flds[i].rule);
			if(!rules){
				throw "invalid rule : "+this.flds[i].rule;
			}
			isOr = false;//reset
			operation = null;
			
			//input�� �������ΰ�� oró������ andó������ Ȯ�θ���.
			if(fldnms.length > 1){
				for(var n=0;n<rules.length;n++){
					if("opr" == rules[n].nm){
						if("||" == rules[n].val || "&&" == rules[n].val){
							isOr = ("||" == rules[n].val);
						} else {
							operation = rules[n].val;
						}
						
						//checkRule���� �����ȳ����� opr���f
						rules[n].nm = "noop";
						break;
					}
				}//endfor
			}
			//�ʵ尡 n���ϼ� �ִ�.
			var locErrCnt = 0;
				for(var j=0;j<fldnms.length;j++){
					//�ؿ� jquryȣ���ϴ� �κ�: d�� �ȵȰ��� �Ⱦ��°� ��;��.
					fldobj = this.object(toTrim(fldnms[j]));
					//alert("1step:"+fldnms[j]+":"+rules+":"+fldobj);
					if(fldobj && typeof(fldobj) == "object"){
						if(!_CheckRule(this.frm, fldobj, rules)){
							locErrCnt += 1;//err������.
							
							if(!this.errobj){
								this.errobj = fldobj;
							}
						}
					} else {
						throw "not founds object : "+fldnms[j];
					}
					
					
					/*
					if($('*[name ='+toTrim(fldnms[j])+']').length > 0){
						fldobj = this.object(toTrim(fldnms[j]));
						if(fldobj && typeof(fldobj) == "object"){
							if(!_CheckRule(this.frm, fldobj, rules)){
								locErrCnt += 1;//err������.
								
								if(!this.errobj){
									this.errobj = fldobj;
								}
							}
						} else {
							throw "not founds object : "+fldnms[j];
						}
					}else{
						throw "not founds object : "+fldnms[j];
					}
					*/
				}//sub for
			//operation
			if(operation){
				if(fldnms.length > 2){
					throw "elements count over for opr : "+(fldnms.length);
				}
				
				var v1 =_GetFieldValue(this.object(toTrim(fldnms[0])));
				var v2 =_GetFieldValue(this.object(toTrim(fldnms[1])));
				
				eval("var oprErr=(v1"+operation+"v2);");
				if(oprErr){
					//���� �ִٰ� ����.
					locErrCnt = locErrCnt + 1;
				}
				
				if(!this.errobj){
					this.errobj = this.object(toTrim(fldnms[0]));
				}
			}
			//or���̶�� �ϳ��� �����̶�� ��μ���8�ΰ���
			if(isOr && locErrCnt > 0 && (locErrCnt != fldnms.length)){
				locErrCnt = 0;
			}
			
			//error
			if(locErrCnt > 0){
				if(errmsg.length > 0){
					errmsg += "\n";
				}
				errmsg += "- "+_TransMessage(this.flds[i].rule, this.flds[i].errmsg);
				//��ü�������� ���.
				errCnt = errCnt + locErrCnt;
				
				if(!isErrSeq){
					break;
				}
			} else if(this.flds[i].alertmsg){
				_AlertMsg(this.flds[i].alertmsg);
			}
		}//end for
		
		if(errCnt > 0) {
			var ret = _ErrMsg(errmsg);
			if(this.errobj){
				_FocusField(this.errobj);
			}
			
			return ret;
		} else {
			return true;	
		}
		
	}catch(ex){
		
		this.clearRule();
		try{
			if(ex.description){
				_ErrMsg("catch : "+ex.description);
			} else {
				_ErrMsg("catch : "+ex);
			}
		}catch(e1){}
		return false;
	}
};//end function

Forms.prototype.equals = function(nm, val){
	return val == this.get(nm);
}

/**
 * �־��� �ʵ�? �ش��ϴ°�; ��ȯ.
 * nm: ���� �ʵ��(�޸�����8�� �����ʵ��; ��밡��)
 * def: �ʵ忡 ���� ��°�� ��ü ����� �⺻��
 * return: �ʵ��8�� �־��� ��; ��ȯ(�迭���� �ʵ峪 �������� ��� �޸�����8�� ��ȯ)
 */	
Forms.prototype.get = function(nm, def, idx){
	
	var nms = nm.split(",");
	var vals = new Array();
	var obj = null;
	
	for(var i=0;i<nms.length;i++){
		obj = this.object(toTrim(nms[i]), idx);
		vals[i] = _GetFieldValue(obj, def, nms[i]);
	}
	
	return vals.join(",");
}


/**
 * select box�� option���߰�.
 */
Forms.prototype.addOpt = function(nm, txt, val){
var nms = nm.split(",");
	var isOk = false;	
	for(var i=0;i<nms.length;i++){
		isOk = _AddOption(this.object(toTrim(nms[i])), txt, val, nms[i]);
	}
	
	return isOk;
}


Forms.prototype.delOpt = function(nm, txt){
	var nms = nm.split(",");
	var isOk = false;	
	for(var i=0;i<nms.length;i++){
		isOk = _DeleteOption(this.object(toTrim(nms[i])), txt, nms[i]);
	}
	
	return isOk;
}

/**
 * �־���� �ʵ�? ��; ����.
 * nm: ��; ����� �ʵ��(�޸��� ���е� �����ʵ�� ��밡��)
 * val: �ʵ忡 ������ ��.
 * return: �ʵ忡 �����ü����(true/false)
 */
Forms.prototype.set = function(nm, val, idx){
	
	var nms = nm.split(",");
	var isOk = false;	
	for(var i=0;i<nms.length;i++){
		isOk = _SetFieldValue(this.object(toTrim(nms[i]), idx), val, nms[i]);
	}
	
	return isOk;
}

Forms.prototype.exists = function(nm){
	var nms = nm.split(",");
	var obj = null;
	var isExists = false;
	
	for(var i=0;i<nms.length;i++){
		obj = this.object(toTrim(nms[i]));
		if(!_IsSetVar(obj)){
			return false;
		}
		
		isExists = true;
	}
	
	return isExists;
}

/**
 * 
 */
Forms.prototype.select = function(nm, idx, fg){
		
	//default setting
	if(!_IsSetVar(idx)){
		idx = 0;
	}
	
	//default setting
	if(!_IsSetVar(fg)){
		fg = true;
	}
	
	var nms = nm.split(",");
	var isOk = false;
	
	for(var i=0;i<nms.length;i++){
		isOk = _SelectField(this.object(toTrim(nms[i])), idx, fg, nms[i]);
	}
	
	return isOk;
}

Forms.prototype.focus = function(nm, idx){
	var obj = this.object(toTrim(nm));
	if(idx >= 0 && obj[0]){
		return _FocusField(obj[idx]);	
	} else {
		return _FocusField(obj);
	}
}


/**
 * 
 */
Forms.prototype.disabled = function(nm, fg){
	
	if(!_IsSetVar(fg)){
		fg  = true;
	}
	
	var nms = nm.split(",");
	var isOk = false;
	
	for(var i=0;i<nms.length;i++){
		isOk = _DisableField(this.object(toTrim(nms[i])), fg, nms[i]);
	}
	
	return isOk;
}

/**
 * ȣȯ��;'�� x��.
 */
Forms.prototype.reset = function(nm){
	if(_IsSetVar(nm)){
		var nms = nm.split(",");
		for(var i=0;i<nms.length;i++){
			_ResetField(this.object(toTrim(nms[i])));
		}
	} else {
		this.frm.reset();
	}
}

/**
 * 
 */
Forms.prototype.submit = function(url, mth, tgt, chk){
	
	if(_IsSetVar(url)){
		this.frm.action = url;
	} else if(this.action){
		this.frm.action = this.action;
	}
	
	if(_IsSetVar(mth)){
		this.frm.method = mth;
	} else if(this.method){
		this.frm.method = this.method;
	}
	
	if(_IsSetVar(tgt)){
		this.frm.target = tgt;
	} else if(this.target){
		this.frm.target = this.target;
	}
	
	//if wanna checked..
	var isGo = false;
	
	if(_IsSetVar(chk) && chk){
		isGo = this.checked();
	} else {
		isGo = true;
	}

	if(isGo){
		this.frm.submit();
	}
}

Forms.prototype.object = _object;
	
function _object(nm, idx){
	var obj = this.frm.elements[toTrim(nm)];
	
	if(!obj){
		obj = document.getElementById(toTrim(nm));
	}
	
	//jquery
	if(!obj && jQuery){
		obj = jQuery(nm);
	}
	
	if(idx > -1 && obj && obj[0]){
		obj = obj[idx];
	}
	
	return obj;
}

/*=============================================================================
  Function : ȭ���� ���ʵ尪; ��� name=value�� &����8�� ��� ����Ѵ�.
  Return   : true/false
  Usage    :
=============================================================================*/
Forms.prototype.toString = function (){
	var buf = '';
	var obj = null;
	for(var i=0;i<this.frm.elements.length;i++){
		obj = this.frm.elements[i];
		if(obj[0]){
			for(var j=0;j<obj.length;j++){
				if(buf.length>0)buf += '&';
				buf += obj[j].name;
				buf += '=';
				buf += obj[j].value;
			}
		} else {
			if(buf.length>0)buf += '&';
			buf += obj.name;
			buf += '=';
			buf += obj.value;
		}
	}
	return buf;
}


/*=============================================================================
  Function : toCurrency() - ��ȭ���8�� ��ȯ�Ѵ�.
  Return   : string
  Usage    : ��)1,234,100.013 = toCurrency('1234100.013');
=============================================================================*/
function toCurrency(val){
	var ch,i=0,a='',t='',ck=0,tStr='';

	if(!val) return '';

	val = String(val);


	//'-' ���θ� �Ǵ��� �����Ѵ�.
	if(val.charAt(0) == '-'){
		a = '-';
		val = val.substring(1);
	}

	// '.' x�翩�θ� �Ǵ��� �Ҽ�a���ĺ��ʹ� ��˵��� �ʵ��� �����ϴ�.
	if((i=val.lastIndexOf('.')) != -1){
		t = val.substring(i);//�Ҽ�a���ĺ���.
		val = val.substring(0,i);
	}

	//number�� ���� �ʴ� ���� ����.
	val = Number(val).toString();

	for(i=val.length-1;i>=0; i--) {
		ch = val.charAt(i);
		if(ch>=0 && ch<=9) {
			if((++ck % 4) == 0) {
				tStr = ',' + tStr;
				ck = 1;
			}
			tStr = ch + tStr;
		}
	}
	return a+tStr+t;
}

/*=============================================================================
  Function : toMask() - val�� �־���� ���ڸ� mask�� ���͸� �Ѵ�.
  Return   : string
  Usage    : 9 == number type
	         # == any type
       ��) '2002/01/01' = toMask('20020101', '####/##/##');
	       '����)�ּҳ���-��ȣ��' = toMask('�����ּҳ��뵿ȣ��','##)####-###');
=============================================================================*/
function toMask(val, mask){
	var C_MSK = "#";
	var N_MSK = "9";
	
	var c,m, j=0;
	var buf = "";
	for(var i=0; i < mask.length; i++) {
		
		if(val.length < j){
			break;
		} 
		
		m = mask.charAt(i);
		if(m != C_MSK && m != N_MSK){
			buf += m;
		} else if(m == ' '){
			buf += ' ';
		} else {
			c = val.charAt(j++);
			if(m == N_MSK){
				if('9' >= c && c >= '0'){
					buf += c;
				}
			} else {
				buf += c;
			}
		}
	}
	return buf;
}


function toTrim(val){
	return val?val.replace(/(^\s*)|(\s*$)/g, ""):val;
}


/*=============================================================================
  Function : dt�� �־���� ��¥�� ���ڸ� Date��8�� ����.
  Return   : Date
  Usage    :
=============================================================================*/
function toDate(dt){
	if(!dt)return dt;

	dt = dt.replace(/(\/|\,|\.|\-)/g,"");//filter

	var y = dt.substring(0,4);
	var m = dt.substring(4,6)-1 ;
	var d = dt.substring(6,8);
	return new Date(y,m,d);
}


/*=============================================================================
  Function : dt�� �־���� ��¥�� ��¥��Ŀ� �´��� a��.
  Return   : true/false
  Usage    :
=============================================================================*/
function isDate(dt){
	var y,m,d,dt2;
	if(!dt) return false;

	dt = dt.replace(/(\/|\,|\.|\-)/g,"");//filter
	if(dt.length != 8) return false;

	y = dt.substring(0,4);
	m = dt.substring(4,6)-1 ;
	d= dt.substring(6,8);
	dt2 = new Date(y,m,d);
	return (dt2.getFullYear() == y && dt2.getMonth() == m && dt2.getDate() == d)
}

/*=============================================================================
  Function : ��¥�� �ϼ� ��ȯ�Ѵ�. (n�ϰ�)
  Return   : true/false
  Usage    : ������ �Լ��Դϴ�.(��������ּ�) - ���� ���� ���(������ �ּ��߰�)
			  flag : true or undefined �̸� ū��¥-��:��¥
			         false �̸� stfr-stto
=============================================================================*/
function diffDate(stfr,stto,flag){
	if(!stfr || !stto) return 0;
  if(!isDate(stfr) || !isDate(stto)) return 0;

	var dtfr = toDate(stfr);
	var dtto = toDate(stto);

	var stm = dtfr.getTime();
	var etm = dtto.getTime();
	var re = 0;
	if(typeof(flag)=='undefined' || flag) {
		if(stm>etm){
			re = stm - etm;
		} else {
			re = etm - stm;
		}
	} else {
		re = stm - etm;
	}
	return (re / (1000 * 60 * 60 * 24)) + 1;
}

/*=============================================================================
  Function : dt�� �־���� ��¥�� dy���� �Ⱓ; ���� ��ο� ��¥�� �����Ѵ�.
  Return   : string
  Usage    :
=============================================================================*/
function addDate(dt, dy, fmt){
	if(!isDate(dt) || !dy) return dt;

	var df = toDate(dt);
	df.setDate(df.getDate()+dy);

	var y = df.getFullYear();
	var m = df.getMonth()+1;
	var d = df.getDate();
	return toMask(""+y+(m>9?m:'0'+m)+(d>9?d:'0'+d), fmt);
}
/*=============================================================================
  Function : �־���� ��¥�� n����� ��ŭ �Ⱓ; ���� ��ο� ��¥�� �����Ѵ�.
  Return   : string
  Usage    :
=============================================================================*/
function addMonth(obj,n){

	var dt,y,m,d;
	var dt2 = new Date();

	dt = obj.value.replace(/(\/|\,|\.|\-)/g,"");
	y = dt.substring(0,4);
	m = Number(dt.substring(4,6)) - 1;
	d = dt.substring(6,8);

	dt2.setYear(y);
	dt2.setMonth(Number(m)+Number(n));
	dt2.setDate(d);

	y = dt2.getYear();
	m = Number(dt2.getMonth()) + 1;
	d = dt2.getDate();
	switch(Number(m)){
	case	2 :
			if(d > 28){
				d = 29;
				if(!isDate(y+""+(Number(m)>9?m:'0'+m)+(d>9?d:'0'+d))) d = 28;
			}
			break;
	case	4 :
			if(d > 30) d = 30;
			break;
	case	6 :
			if(d > 30) d = 30;
			break;
	case	9 :
			if(d > 30) d = 30;
			break;
	case	11 :
			if(d > 30) d = 30;
			break;
	}// end switch()

	return ""+y+"/"+(Number(m)>9?m:'0'+m)+"/"+(d>9?d:'0'+d);
}//end function addMonth(obj)

var _PRE_OBJ;
function focusRow(id, clr){
	if(id){
		var obj = document.getElementById(id);
		if(!obj){
			obj = id;//object�� �ν�.
		}
		
		if(_PRE_OBJ){
			_PRE_OBJ.style.background = '';
		}
		_PRE_OBJ = obj;
		
		if(!clr){
			clr = '#C7EEFE';
		}
		obj.style.background = clr;
		return obj;
	} else {
		return _PRE_OBJ;//�Ķ���;��� ȣ��: ����ü ��ȯ.
	}
}

function blurRow(){
	if(_PRE_OBJ){
		_PRE_OBJ.style.background = '';
		_PRE_OBJ = null;
	}
}

/** inner util function ********************************************************/

/**
 * �ʵ忡 ���ؼ� ��; �Ľ��Ѵ�.
 * fldobj: �ʵ��ش� ��ü
 * rule: ���ڱ���� ��
 * return: ��; ���� ��ȯ(true/false)
 */
function _CheckRule(frm, fldobj, rules){
	
	var isTypePass = false;
	switch(_FieldType(fldobj)){
		case "radio": 
		case "checkbox": 
			isTypePass = _MultiBoxRule(frm, fldobj, rules);
			break;
			
		case "select-one":
		case "select-multiple":
			isTypePass = _SelectRule(frm, fldobj, rules);
			break;
			
		case "file": 
		case "text": 
		case "password": 
		case "textarea": 
		case "hidden": 
			isTypePass =  _InputRule(frm, fldobj, rules);
			break;
			
		default: 
			return _ErrMsg("unsupported field type:"+_FieldType(fldobj));
	}//end switch
	
	return isTypePass;
};//end function


/** checker input type rule */
function _InputRule(frm, fldObj, rules){

	var failCnt = 0;
	var isPass = true;
	var isIgnore = false;
	var isErrFocus = false;
	var isArr = fldObj[0]?true:false;
	var obj, mx = isArr?fldObj.length:1;

	for(var j=0;j<mx;j++){
		obj = isArr?fldObj[j]:fldObj;
		isIgnore = false;
		for(var i=0;i<rules.length;i++){
			switch(rules[i].nm){
				case "min":
					isPass = _StrByte(obj.value) >= Number(rules[i].val);
				break;
				
				case "max":
					isPass = _StrByte(obj.value) <= Number(rules[i].val);
				break;
				
				case "minnum":
					isPass = Number(obj.value) >= Number(rules[i].val);
				break;
				
				case "maxnum":
					isPass = Number(obj.value) <= Number(rules[i].val);
				break;
						
				case "mask":
					isPass = _ValidMask(obj.value, rules[i].val);
				break;
				
				case "type":
					isPass = _ValidType(obj.value, rules[i].val, this);
				break;
				
				//�ѱۼ�d�� �ƴѵ� �ѱ��� �ԷµȰ�� ã�Ƴ���.
				//�ܴ̿� �� �´ٰ� ����..^^
				//�ٵ� �����ϴ°� �´�.
				case "lang":
					isPass = (rules[i].val == "ko")?_IsKor(obj.value):true;
				break;
				
				case "ref":
					isPass = _RefCheck(rules[i].val);
				break;
				
				case "value":
					if(rules[i].val == "unique" && mx > 1 && j > 0){
						for(var k=j-1;k>=0;k--){
							if(fldObj[k].value == obj.value){
								isPass = false;
								break;
							}
						}
					}else if(rules[i].val.indexOf("!") == 0){
						isPass = (rules[i].val==("!"+obj.value));
					}else {
						isPass = !(rules[i].val==obj.value);
					}
				break;
				
				case "index":
					if(rules[i].val == "all" || Number(rules[i].val) == j){
						//nothing
					} else {
						isIgnore = true;
					}
				break;
				
				case "error":
					if(rules[i].val == "focus"){
						isErrFocus = true;
					}
				break;
				
				case "noop":
				break;
				
				default: 
					return _ErrMsg("unsupported (input) keyword:"+rules[i].nm);
			}
			
			if(!isPass){
				failCnt += 1;
			}
		}//end for
		
		if(isIgnore){
			failCnt = 0;
		}
		
		if(!isPass){
			if(isErrFocus && obj && obj.type != "hidden"){
				obj.focus();
				return false;
			}
		}
	}//end for
	
	return failCnt == 0;	
}


function _SelectRule(frm, fldObj, rules){
	
	
	var isPass = true;
	var failCnt = 0;
	var chk = 0;
	var isIgnore = false;
	var isArr = fldObj[0][0]?true:false;
	var obj, mx = isArr?fldObj.length:1;
	
	for(var j=0;j<mx;j++){
		obj = isArr?fldObj[j]:fldObj;
		isIgnore = false;
		
		for(var i=0;i<obj.options.length;i++){
			if(obj.options[i].selected && obj.options[i].value){
				chk += 1;
			}
		}
	
		for(var i=0;i<rules.length;i++){
			switch(rules[i].nm){
				case "min":
					isPass = chk >= Number(rules[i].val);
				break;
				
				case "max":
					isPass = chk <= Number(rules[i].val);
				break;	
				
				case "ref":
					isPass = _RefCheck(rules[i].val);
				break;
				case "index":
					if(rules[i].val == "all" || Number(rules[i].val) == j){
						//nothing
					} else {
						isIgnore = true;
					}
				break;
				
				case "error":
				break;
				
				case "noop":
				break;
				default: 
					return _ErrMsg("unsupported (select) keyword:"+rules[i].nm);
			}

			if(!isPass){
				failCnt += 1;	
			}
		}
		
		if(isIgnore){
			failCnt = 0;
		}
	}//end for
	
	return failCnt == 0;	
}

/** checker radio/checkbox type rule */
function _MultiBoxRule(frm, obj, rules){
	
	var isPass = true;
	var chk = 0;
	var failCnt = 0;
	
	if(obj[0]){
		for(var i=0;i<obj.length;i++){
			if(obj[i].checked){
				chk += 1;
			}
		}
	} else if(obj.checked){
			chk = 1;
	}
	
	var isIgnore = false;
	for(var i=0;i<rules.length;i++){
		
		switch(rules[i].nm){
			case "min":
				isPass = chk >= Number(rules[i].val);
			break;
			
			case "max":
				isPass = chk <= Number(rules[i].val);
			break;	
			
			//��x���ִ� �ٸ��ʵ��� ���� �����̸� ������ �ʵ嵵 �����̴�.
			case "ref":
				isPass = _RefCheck(rules[i].val);
			break;
			case "index":
				if(rules[i].val == "all"){
					isPass = (obj.length == chk);
				}else if(obj[rules[i].val].checked){
					isPass = true;
				}
			break;
			case "value":
				if((rules[i].val=="true" && chk > 0) 
						|| (rules[i].val=="false" && chk == 0)){
					isPass = false;
				}
				break;
				
			case "error":
				break;
				
			case "noop":
				break;
			default: 
				return _ErrMsg("unsupported (checkbox/radio) keyword:"+rules[i].nm);
		}
				
		if(!isPass){
			failCnt += 1;	
		}
	}
	
	return failCnt == 0;	
}

function _ParseRule(rule){
	var ps = 0, idx = 0;
	var obj,rulNm,rulVal;
	var ruleToks = rule.split(",");
	var rules = new Array();
	for(var i=0;i<ruleToks.length;i++){
		ps = ruleToks[i].indexOf("=");
		if(ps != -1){
			obj = new Object();
			
			rulNm = toTrim(ruleToks[i].substring(0, ps))
			rulVal = toTrim(ruleToks[i].substring(ps+1))
			obj.nm = rulNm.toLowerCase();
			obj.val = rulVal;
			
			rules[idx++] = obj;
		} else {
			return null;
		}
	}
	
	return rules;
}

function _FocusField(obj){
	var o = null;
	
	if(obj[0]){
		o = obj[0];
	} else {
		o = obj;
	}
	
	if(o && o.type != "hidden" && !o.disabled){
		o.focus();
		return true;
	}
	
	return false;
}


function _TransMessage(rule, msg){
	//rule����Ÿ ��8�� �ƹ����� ���Ѵ�.
	if(!rule) return msg;
	
	var pmsg = msg;
	var vals = rule.split(",");
	var ps = 0;
	var s,nm,val;
	
	for(var i=0;i<vals.length;i++){
		s = vals[i];
		if((ps = s.indexOf("=")) != -1){
			nm = toTrim(s.substring(0, ps));
			val = toTrim(s.substring(ps+1));
			
			pmsg = pmsg.replace("$["+nm+"]", val);
			pmsg = pmsg.replace("$["+nm+"Han]", val / 2);
		}
	}
	
	return pmsg;
}

function _IsSetVar(v){
	return !(v == null || typeof(v) == "undefined");
}

function _ValidMask(val, msk){
	var c,m;
	
	if(val.length != msk.length) return false;
	
	for(var i=0; i < val.length; i++) {
		c = val.charAt(i);
		m = msk.charAt(i);
		if(m != "#" && c != m){
			return false;
		}
	}
	
	return true;
}

function _ValidType(val, ty, frm){
	if(ty == "number"){
		return _IsNumber(val);
	} else if(ty == "float"){
		return _IsFloat(val);
	} else if(ty == "date"){
		return _IsDate(val);
	} else if(ty == "currency"){
		return _IsCurrency(val);
	} else if(ty == "email"){
		return _IsEmail(val);
	} else if(ty == "passwd"){
		return validatePassword(val, frm.pwdOpt);
	} else {
		_ErrMsg("not supprted type:"+ty);	
	}
	
	return false;
}

function _GetFieldValue(obj, defval, msg){
	
	if(!obj){
		_ErrMsg("_GetFieldValue: object is invalid:"+msg);
		return defval;
	}
	
	switch(_FieldType(obj)) {
		case "radio":
			if(obj[0]){
				for(var i=0;i<obj.length;i++){
					if(obj[i].checked){
						return obj[i].value;
					}
				}
			} else {
				if(obj.checked){
					return obj.value;
				}
			}
		break;
		
		//���߰��̶�� �޸��������� ���ڷ� ��ȯ�Ѵ�.
		case "checkbox":
			if(obj[0]){
				var a = new Array();
				var inc = 0;
				for(var i=0;i<obj.length;i++){
					if(obj[i].checked){
						a[inc++] = obj[i].value;
					}
				}
				
				return a.join(",");
			} else {
				if(obj.checked){
					return obj.value;
				}
			}
		break;
		
		//���߰��̶�� �޸��������� ���ڷ� ��ȯ�Ѵ�.
		case "select-one":
		case "select-multiple":
			var a = new Array();
			var inc = 0;
			for(var i=0;i<obj.length;i++){
				if(obj.options[i].selected){
					a[inc++] = obj.options[i].value;
				}
			}
			return a.join(",");
		break;
		
		default:
			var cls = obj.className;
			if(cls) {//class��� ó��
				var d;
				if(cls == "number" || cls == "currency"){
					d = obj.value.replace(/(\/|\,)/g,"");
					return Number(d);
				} else {
					d = obj.value.replace(/(\-|\/|\:)/g,"");
					return d;
				}
			} else {
				return obj.value?obj.value:defval;
			}
	}//end switch
	
	return defval;
}


function _DisableField(obj, fg, msg){
	
	if(!obj){
		_ErrMsg("_DisableField: object is invalid:"+msg);
		return;
	}
	
	switch(_FieldType(obj)) {
	    case "hidden": break;
		case "radio":
		case "checkbox":
			if (obj[0]) {
				for(var i=0;i<obj.length;i++){
					obj[i].disabled = fg;
				}
			} else {
				obj.disabled = fg;
			}
			break;
		default:
			obj.disabled = fg;
			//����; �־��ش�...�ױ⸮.
			if(obj.style){
				var col;
				if (fg) {
					col = "#E1EBF7";
				} else {
					col = "white" ;
				}
				obj.style.backgroundColor = col;
			}//end if
	
	}//end switch
}

/**
 * obj: element of form
 * idx: 0 base array
 */
function _SelectField(obj, idx, fg, msg){
	
	if(!obj){
		_ErrMsg("_SelectField: object is invalid:"+msg);
		return;
	}

	var isDone = false;
	switch(_FieldType(obj)) {
		case "checkbox":
		case "radio":
			for(var i=0;i<obj.length;i++){
				if(i == idx){
					obj[i].checked = fg;
					isDone = true;
				}
			}
			break;
			
		case "select-one":
		case "select-multiple":
			for(var i=0;i<obj.options.length;i++){
				if(i == idx){
					obj.options[i].selected = fg;
					isDone = true;
				}
			}
			break;
		default:
			if(obj[0]){
				for(var i=0;i<obj.length;i++){
					if(i == idx){
						obj[i].select();
						isDone = true;
					}
				}
			} else {
				obj.select();
			}
	}
	
	return isDone;
}


function _AddOption(obj, txt, val, msg) {
	
	if(!obj){
		_ErrMsg("_AddOption: object is invalid:"+msg);
		return false;
	}
	
	switch(_FieldType(obj)) {		
		case "select-multiple":
		case "select-one":
			var len = obj.options.length;
			obj.add(new Option(txt, val));
			return true;
			break;
		default: return _ErrMsg("undefined ("+_FieldType(obj)+") keyword:"+rulNm);
	}
	
	return false;
}


function _DeleteOption(obj, txt, msg) {
	
	if(!obj){
		_ErrMsg("_AddOption: object is invalid:"+msg);
		return false;
	}
	
	switch(_FieldType(obj)) {		
		case "select-multiple":
		case "select-one":
			var len = obj.options.length;
			for(var i=0;i<len;i++){
				if(obj.options[i].text == txt){
					obj.options[i] = null;
					return true;
				}
			}
			
			break;
		default: return _ErrMsg("undefined ("+_FieldType(obj)+") keyword:"+rulNm);
	}
	
	return false;
}
/**
 * obj: element of form
 * val: value for setting
 */
function _SetFieldValue(obj, newVal, msg) {
	
	if(!obj){
		_ErrMsg("_SetFieldValue: object is invalid:"+msg);
		return false;
	}
	
	switch(_FieldType(obj)) {
		case "checkbox":
		case "radio":
			if(obj[0]){
				for(var i=0;i<obj.length;i++){
					//newVal�� boolean���̸� ���� �̸��� ��� box�� �ٸ��ٰ� ��f.
					//��ü ���� �� ��f�� '���߰�.
					if(typeof(newVal) == "boolean"){
						obj[i].checked = newVal;
					} else if(obj[i].value == newVal){
						obj[i].checked = true;
						return true;
					}
				}
				
				if(typeof(newVal) == "boolean"){
					return true;
				}
			} else {
				obj.checked = (newVal == true)?newVal:(obj.value == newVal);
				return obj.checked;
			}
			break;
		
		case "select-multiple":
		case "select-one":
			for(var i=0;i<obj.options.length;i++){
				if(obj.options[i].value == newVal){
					obj.selectedIndex = i;
					return true;
				}
			}
			break;

		default:
			var cls = obj.className;//tag�� class��; ��´�.

			if(cls == "date" && newVal) {//��¥Ŭ�������ó��
				obj.value = toMask(newVal.replace(/(\/|\,|\.|\-)/g,""), "9999/99/99 99:99:99");
			} else if((cls == "currency" || cls == "number") && newVal != null) {
				if(newVal == '0') {
					obj.value = 0;//0: ���� ��� string8�� ġȯ�Ѵ�.
				} else {
					if(cls == "currency"){
						var t = toCurrency((typeof(newVal) == "number")?""+newVal:newVal.replace(/(\,)/g, ""));
						obj.value = t;
					} else {
						obj.value = Number(newVal);
					}
				}
			} else if(cls == "rrno" && newVal) {
				obj.value = toMask(newVal, "999999-9999999");
			} else {
				obj.value = newVal;
			}
			return true;
	}
	
	return false;
}


function _RefCheck(val){
	var ret = false;
	var val = null;
	if(!val) return ret;
	
	var arr = val.split("+");
	for(var i=0;i<arr.length;i++){
		val = _GetFieldValue(_object(arr[i]));
		if(val){
			ret = true;
			break;
		}
	}//endfor
	
	return ret;
}

function _ResetField(obj){
	obj.value = obj.defaultValue;
}

/** return forms field type */
function _FieldType(obj){
	var t = obj.type;		
	if(!_IsSetVar(t) && obj[0] && obj[0].type){
		t = obj[0].type;
	}
	return t?t.toLowerCase():t;
}


/** return korean language type */
function _IsKor(s) {
	for(i=0;i<s.length;i++) {
		var a=s.charCodeAt(i);
		if (a > 128) {
			return true;
		}
	}
	return false;
}

/**
 * �ѱ� 2byte ���� 1byte�� byte�� ����Ѵ�.
 */
function _StrByte(s){
	var len = 0;
	for(var i=0;i<s.length;i++){
		if (escape(s.charAt(i)).length > 4){
			len += 2;	
		} else {
			len += 1;	
		}
	}
	return len;
}

function _IsEmail(v){
	var p1 = v.indexOf('@');
	var p2 = v.indexOf('.', p1+1);
	if(p1 != -1 && p2 != -1){
		return true;
	} 
	return false;
}

/*
password options sample
pwdOpt = {
	length:   [8, Infinity],
	lower:    1,
	upper:    1,
	numeric:  1,
	special:  1,
	badWords: ["password", "steven", "levithan"],
	badSequenceLength: 4
};
var ret = validatePassword("1234", pwdOpt);
 */
function validatePassword (pw, options) {
	// default options (allows any password)
	var o = {
		lower:    0,
		upper:    0,
		alpha:    0, /* lower + upper */
		numeric:  0,
		special:  0,
		length:   [0, Infinity],
		custom:   [ /* regexes and/or functions */ ],
		badWords: [],
		badSequenceLength: 0,
		noQwertySequences: false,
		noSequential:      false
	};

	for (var property in options)
		o[property] = options[property];

	var	re = {
			lower:   /[a-z]/g,
			upper:   /[A-Z]/g,
			alpha:   /[A-Z]/gi,
			numeric: /[0-9]/g,
			special: /[\W_]/g
		},
		rule, i;

	// enforce min/max length
	if (pw.length < o.length[0] || pw.length > o.length[1])
		return false;

	// enforce lower/upper/alpha/numeric/special rules
	for (rule in re) {
		if ((pw.match(re[rule]) || []).length < o[rule])
			return false;
	}

	// enforce word ban (case insensitive)
	for (i = 0; i < o.badWords.length; i++) {
		if (pw.toLowerCase().indexOf(o.badWords[i].toLowerCase()) > -1)
			return false;
	}

	// enforce the no sequential, identical characters rule
	if (o.noSequential && /([\S\s])\1/.test(pw))
		return false;

	// enforce alphanumeric/qwerty sequence ban rules
	if (o.badSequenceLength) {
		var	lower   = "abcdefghijklmnopqrstuvwxyz",
			upper   = lower.toUpperCase(),
			numbers = "0123456789",
			qwerty  = "qwertyuiopasdfghjklzxcvbnm",
			start   = o.badSequenceLength - 1,
			seq     = "_" + pw.slice(0, start);
		for (i = start; i < pw.length; i++) {
			seq = seq.slice(1) + pw.charAt(i);
			if (
				lower.indexOf(seq)   > -1 ||
				upper.indexOf(seq)   > -1 ||
				numbers.indexOf(seq) > -1 ||
				(o.noQwertySequences && qwerty.indexOf(seq) > -1)
			) {
				return false;
			}
		}
	}

	// enforce custom regex/function rules
	for (i = 0; i < o.custom.length; i++) {
		rule = o.custom[i];
		if (rule instanceof RegExp) {
			if (!rule.test(pw))
				return false;
		} else if (rule instanceof Function) {
			if (!rule(pw))
				return false;
		}
	}

	// great success!
	return true;
}



//�Ҽ�a���� �Է�f��.
function _IsNumber(n){
	return n == Math.ceil(Number(n));
}

function _IsFloat(n){
	return n == Number(n);
}

function _IsCurrency(n){
	n = n.replace(/(\,)/g,"");//filter
	return n == Number(n);
}

function _IsDate(dt){
	return isDate(dt);
}

/** output error message */
function _ErrMsg(msg){
	if(IS_DEBUG){
		if(confirm(msg+"\n\n\n Enter debug!!")){
			_debug(_ErrMsg.caller);
		}
	} else {
		alert(msg);
	}
	return false;	
}

/** output error message */
function _AlertMsg(msg){
	alert(msg);
	return true;	
}

//open source javascript ���.
//AIM.submit([��:�gƮ], [�ɼǿ:�gƮ]);
//[�ɼǿ:�gƮ] = {'onStart' : [���۽��ݹ��Լ�], 'onComplete' : [����Ÿ���������ݹ��Լ�]}
//
//��) AIM.submit(document.forms[0], {'onStart' : startCallback, 'onComplete' : completeCallback})
//
//function startCallback() {
//	progress(true);
//  f.submit("?method=upload");
//  return true;   
//} 
//
//function completeCallback(response) {   
//	progress(false);
//	if(response){
//		alert(response);
//	}
//}  

/**
 * ajax���� �޾ƿ� ����Ÿ�� json8�� ó���۾�; '�� ����.
 */
function transData(obj){
	//TODO ���� ����Ÿ�¿� ���� �۾��ʿ�� �̰�� Ȯ��.
	eval("var dataset="+toTrim(obj));
	return dataset;
}


var _dwin;
/** output debug message */
function _debug(msg){
	
	if(!_dwin){
		_dwin = window.open("","debug", "status=yes, resizable=yes, scrollbars=yes");
	}

	var m = msg.toString();
	if(_dwin){
		_dwin.document.open("text/text");
		_dwin.document.write("<pre>");
		_dwin.document.write(m.replace("<", "&lt;"));
		_dwin.document.write("</pre>");
		_dwin.document.close();
	}
}

function onCheckNum(){
    if ((event.keyCode<48)||(event.keyCode>57)){     
		event.returnValue = false;		
	}
}

function onCheckNotNum(){
    if(((event.keyCode >= 48 && event.keyCode <=57) )){    
		event.returnValue = false;		
	}
}

function onKorean(){
	if((event.keyCode < 12592) || (event.keyCode > 12687)){
		event.returnValue = false;
	}
}

function onPagingInit() {
	frm.set("searchCrsId","0");
}