import browserslist from '../';

import test from 'ava';
import path from 'path';

const css = path.join(__dirname, 'fixtures', 'dir', 'test.css');

test('parses queries', t => {
    t.same(browserslist.parseConfig('ie 10\n> 1%'), ['ie 10', '> 1%']);
});

test('trims whitespaces', t => {
    t.same(browserslist.parseConfig('ie 10 \n \n  > 1%\n'), ['ie 10', '> 1%']);
});

test('removes comments', t => {
    const config = '# support list\nie 10#bad\n> 1%';
    t.same(browserslist.parseConfig(config), ['ie 10', '> 1%']);
});

test('returns false on no config', t => {
    t.same(browserslist.readConfig(__dirname), false);
});

test('reads config', t => {
    t.same(browserslist.readConfig(css), ['ie 11', 'ie 10']);
});
