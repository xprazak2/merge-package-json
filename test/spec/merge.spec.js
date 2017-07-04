
var fs = require('fs');
var path = require('path');
var merge = require('../../lib/merge');
var expect = require('chai').expect;

function fixture(name) {
	return fs.readFileSync(path.join(
		__dirname, '..', 'fixtures', name+'.fixture.json'
	), 'utf8');
}
function fixtureRequired(name) {
	return require(path.join(
		__dirname, '..', 'fixtures', name+'.fixture.json'
	), 'utf8');
}

describe('#merge', function() {

	it('should output valid JSON', function() {
		var result = merge(
			fixture('complete'),
			fixture('dependencies')
		);
		expect(function() {
			JSON.parse(result);
		}).to.not.throw();
	});

	it('should using existing strings for variables where possible',function()  {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));
		expect(result.version).to.equal('10.3.1');
	});

	it('should merge dependencies correctly', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));

		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});

	it('should merge multiple dependencies correctly', function() {
		var result = merge(
			fixture('complete'),
			fixture('dependencies')
		);
		var result2 = JSON.parse(merge(
			result,
			fixture('dependencies2')
		));
		expect(result2.dependencies).to.have.property('text-to-mp3', '^1.1.2');
	});


	it('should work on emptiness', function() {
		var result = JSON.parse(merge(
			fixture('complete'),
			fixture('dependencies')
		));
		expect(result.dependencies).to.have.property('express', '^5.0.0');
	});
});
