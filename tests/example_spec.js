import lodash from 'lodash';
import {Promise} from '../src/index';

describe('Testing', () => {
  it('node import should work', () => {
  	var promise = new Promise();
    expect(_.isObject(promise)).toBe(true);
  });
});

describe('Promise', () => {
	it('promise should resolve, state change 1', () => {
		var test = {
			cb: function () {
				// body...
				console.log(32)
				// expect(test.cb).toHaveBeenCalled();
				// expect(promise.state).toBe(1);
			}
		}
		var promise = new Promise((resolve)=>{
			setTimeout(resolve, 2000)
		});
		promise.then(test.cb);		
	})
})