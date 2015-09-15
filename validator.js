
this.Validator = {
	items : ['required','pattern','min','max'],
	patterns : {
		tel : /^1[358]\d{1}[\s\-]?\d{4}[\s\-]?\d{4}$/,
		number : /^\d+$/,
		email : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
		url : /(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/
	},
	validateByItem : {
		required : function(o,d,v,dv){
			if(dv !== null && !v){
				return {
					element : o,
					value : v,
					msg : 'required',
					need : dv
				}
			}
			return false;
		},
		pattern : function(o,d,v,dv){
			if(!v){return false;}
			dv = typeof dv === 'string' ? new RegExp(dv) : Validator.patterns[o.type];
			if(dv && !dv.test(v)){
				return {
					element : o,
					value : v,
					msg : 'pattern',
					need : dv.source
				}
			}
			return false;
		},
		min : function(o,d,v,dv){
			if(v && dv !== null && (isNaN(v - dv) ? v < dv : v - dv < 0)){
				return {
					element : o,
					value : v,
					msg : 'min',
					need : dv
				}
			}
			return false;
		},
		max : function(o,d,v,dv){
			if(v && dv !== null && (isNaN(v - dv) ? v < dv : v - dv > 0)){
				return {
					element : o,
					value : v,
					msg : 'max',
					need : dv
				}
			}
			return false;
		}
	},
	validate : function(o,f){
		var p = [],i,l,res;
		if(o.tagName.toLowerCase() !== 'form'){
			res = this.validateInput(o,f);
			f(res || false);
			return;
		}
		p = [].slice.call(o.querySelectorAll('input[name],textarea[name]'));
		for(i = 0, l = p.length; i < l; i++){
			res = this.validateInput(p[i]);
			if(res){
				f(res);
				return;
			}
		}
		f();
	},
	validateInput : function(o,f){
		var v = o.value.replace(/(^\s+|\s+$)/g,''),
			items = this.items,
			i,l,d,dv,res;
		if(typeof f !== 'function'){f = function(){};}
		for(i = 0, l = items.length; i < l; i++){
			d = items[i];
			dv = o.getAttribute(d);
			/* if(d === 'pattern'){
				if(dv){
					dv = new RegExp(dv);
				}else{
					dv = this.patterns[o.type];
				}
			} */
			if(this.validateByItem[d]){
				res = this.validateByItem[d](o,d,v,dv);
				if(res){
					f(res);
					return res;
				}
			}
		}
		f();
		return false;
	}
};