import browserslist from '../';

import test from 'ava';

const originUsage = browserslist.usage;

test.before(() => {
    browserslist.usage = {
        US: {
            'ie 9':  5,
            'ie 10': 10.1,
            'ie 11': 75
        }
    };
});

test.after(() => {
    browserslist.usage = originUsage;
});

test('selects browsers by popularity', t => {
    t.same(browserslist('> 10% in US'), ['ie 11', 'ie 10']);
});

test('works with float', t => {
    t.same(browserslist('> 10.2% in US'), ['ie 11']);
});

test('fixes country case', t => {
    t.same(browserslist('> 10.2% in us'), ['ie 11']);
});

test('loads country from Can I Use', t => {
    t.ok(browserslist('> 1% in RU').length > 0);
});
