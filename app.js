const e = require('express');
const a = e();
a.use(e.static('.'));

let u = [];
let t = [];
let m = [];
let f = [];
let s = [
  { i: 1, n: 'voucher trường', h: 5 },
  { i: 2, n: 'bánh ngọt', h: 3 },
  { i: 3, n: 'lon nước', h: 2 }
];
let id = 1;

a.get('/api', (q, rs) => {
  let c = q.query.c;
  if (c == 'reg') {
    let n = q.query.n;
    let x = 0;
    for (let k = 0; k < u.length; k++) if (u[k].n == n) x = 1;
    if (!x) u.push({ n: n, p: q.query.p, h: 2, r: 0, w: [], av: '', bo: '' });
    rs.json({ ok: !x ? 1 : 0 });
  }
  if (c == 'log') {
    let n = q.query.n;
    let x = null;
    for (let k = 0; k < u.length; k++) if (u[k].n == n && u[k].p == q.query.p) x = u[k];
    rs.json({ ok: x ? 1 : 0, u: x });
  }
  if (c == 'get') {
    rs.json({ u: u, t: t, s: s, m: m, f: f });
  }
  if (c == 'add') {
    t.push({ i: id++, o: q.query.n, d: q.query.d, h: q.query.h * 1, st: 0, w: '', v: q.query.v * 1 });
    rs.json({ ok: 1 });
  }
  if (c == 'tk') {
    for (let k = 0; k < t.length; k++) if (t[k].i == q.query.i * 1) { t[k].st = 1; t[k].w = q.query.n; }
    rs.json({ ok: 1 });
  }
  if (c == 'dn') {
    for (let k = 0; k < t.length; k++) {
      if (t[k].i == q.query.i * 1) {
        t[k].st = 2;
        for (let j = 0; j < u.length; j++) {
          if (u[j].n == t[k].o) u[j].h -= t[k].h;
          if (u[j].n == t[k].w) { u[j].h += t[k].h; u[j].r += 1; }
        }
      }
    }
    rs.json({ ok: 1 });
  }
  if (c == 'buy') {
    let h = 0;
    let n = '';
    for (let k = 0; k < s.length; k++) if (s[k].i == q.query.i * 1) { h = s[k].h; n = s[k].n; }
    for (let k = 0; k < u.length; k++) {
      if (u[k].n == q.query.n && u[k].h >= h) {
        u[k].h -= h;
        u[k].w.push(n);
      }
    }
    rs.json({ ok: 1 });
  }
  if (c == 'af') {
    f.push({ a: q.query.n, b: q.query.f });
    rs.json({ ok: 1 });
  }
  if (c == 'sm') {
    m.push({ s: q.query.n, r: q.query.r, c: q.query.m });
    rs.json({ ok: 1 });
  }
  if (c == 'pe') {
    for (let k = 0; k < u.length; k++) {
      if (u[k].n == q.query.n) {
        u[k].av = q.query.av;
        u[k].bo = q.query.bo;
      }
    }
    rs.json({ ok: 1 });
  }
});
a.listen(3000);