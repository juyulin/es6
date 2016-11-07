require('setimmediate');

var PEDING = 'PEDING',
	FULFILLED = 'FULFILLED',
	REJECTED = 'REJECTED';
function Promise (cb) {
	// body...
	this.state = PEDING;
	this.multiPromise2 = []
	if(typeof cb === 'undefined') {
		cb = function(){}
	}

	var fulfilled = (value)=>{
		settlePromise(this, FULFILLED, value);
	}
	var reject = (reason)=>{
		settlePromise(this, REJECTED, reason);
	}
	cb(fulfilled, reject);
}
function settlePromise(promise, state, data) {
	if(state === PEDING) {
		return;
	}
	promise.state = state;
	promise.execudeData = data;
	console.log(promise)
	if(promise.multiPromise2.length > 0) {
		const CBType = state === FULFILLED ? 'resolveCB' : 'rejectCB';
		for(var promise2 of promise.multiPromise2) {
			console.log(promise2)
			asyncProcessCB(promise, promise2, promise2[CBType]);
		}
	}
};

Promise.prototype.then = function(resolveCB, rejectCB) {
	// body...
	let promise2 = new Promise(()=>{});
	promise2.resolveCB = resolveCB;
	promise2.rejectCB = rejectCB;
	if(this.state === PEDING) {
		this.multiPromise2.push(promise2);
	}else if(this.state === FULFILLED) {
		asyncProcessCB(this, promise2, promise2.resolveCB);
	}else if(this.state === REJECTED) {
		asyncProcessCB(this, promise2, promise2.rejectCB)
	}
	return promise2;
};
function asyncProcessCB (promise, promise2, CB) {
	// body...
	setImmediate(() => {
		if(!CB) {
			settlePromise(promise, promise2, promise.execudeData);
			return;
		}
		let x;
		console.log(CB)
		try {
			x = CB(promise.execudeData)
		} catch (e) {
			settlePromise(promise2, REJECTED, e);
			return;
		}
		console.log(x)
		settleWithX(promise2, x);
	})
}

function settleWithX (promise2, x) {
	// body...
	if(x===promise2 && x) {
		settlePromise(promise2, REJECTED, new TypeError("promise_circular_chain"));
        return;
	}
	var xthen, type = typeof x;
	if(x !== null && (type === "function") || type === "object") {

	}
}
Promise.prototype.fulfilled = function() {
	// body...
};
Promise.prototype.reject = function() {
	// body...
};

module.exports = Promise;