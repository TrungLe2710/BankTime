let app = () => ({
  v: 0,
  cu: null, cc: '', pu: '', mu: null,
  n: '', p: '',
  td: '', th: 1, tm: '', tv: 0,
  av: '', bo: '', sf: '',
  tk: [], us: [], st: [], ms: [], fr: [],
  async g() {
    let r = await fetch('/api?c=get');
    let d = await r.json();
    this.tk = d.t; this.us = d.u; this.st = d.s; this.ms = d.m; this.fr = d.f;
    if (this.cu) {
      for (let i = 0; i < this.us.length; i++) if (this.us[i].n == this.cu.n) this.cu = this.us[i];
    }
  },
  async log() {
    let r = await fetch('/api?c=log&n=' + this.n + '&p=' + this.p);
    let d = await r.json();
    if (d.ok) { this.cu = d.u; this.pu = this.cu.n; this.v = 1; this.g(); }
    else alert('sai tên hoặc mật khẩu');
  },
  async reg() {
    let r = await fetch('/api?c=reg&n=' + this.n + '&p=' + this.p);
    let d = await r.json();
    if (d.ok) alert('tạo xong. hãy đăng nhập');
    else alert('tên đã có người dùng');
  },
  out() { this.cu = null; this.v = 0; },
  async add() {
    await fetch('/api?c=add&n=' + this.cu.n + '&d=' + this.td + '&h=' + this.th + '&v=' + this.tv);
    this.td = ''; this.th = 1; this.tv = 0; this.g();
  },
  async take(i) { await fetch('/api?c=tk&i=' + i + '&n=' + this.cu.n); this.g(); },
  async done(i) { await fetch('/api?c=dn&i=' + i); this.g(); },
  async buy(i) { await fetch('/api?c=buy&i=' + i + '&n=' + this.cu.n); this.g(); },
  async af(f) { await fetch('/api?c=af&n=' + this.cu.n + '&f=' + f); this.sf = ''; this.g(); },
  async sm(r, c) {
    let rr = r || this.cc;
    let cc = c || this.tm;
    await fetch('/api?c=sm&n=' + this.cu.n + '&r=' + rr + '&m=' + cc);
    if (!c) this.tm = '';
    this.g();
  },
  async pe() {
    await fetch('/api?c=pe&n=' + this.cu.n + '&av=' + this.av + '&bo=' + this.bo);
    this.av = ''; this.bo = ''; this.g();
  },
  oc(u) { this.cc = u; this.v = 6; },
  op(n) {
    for (let i = 0; i < this.us.length; i++) if (this.us[i].n == n) this.mu = this.us[i];
  },
  so(x) {
    let k = prompt('nhập kết quả công việc (đường dẫn hoặc mô tả chi tiết):');
    if (k) {
      this.sm(x.o, 'kết quả việc "' + x.d + '": ' + k);
      alert('đã gửi kết quả qua tin nhắn riêng!');
    }
  },
  ib() {
    let ls = [];
    for (let i = 0; i < this.ms.length; i++) {
      let o = this.ms[i].s == this.cu.n ? this.ms[i].r : (this.ms[i].r == this.cu.n ? this.ms[i].s : null);
      if (o && !ls.includes(o)) ls.push(o);
    }
    return ls;
  },
  cv() {
    return this.ms.filter(m => (m.s == this.cu.n && m.r == this.cc) || (m.s == this.cc && m.r == this.cu.n));
  },
  fl() {
    let ls = [];
    for (let i = 0; i < this.fr.length; i++) {
      let f = this.fr[i].a == this.cu.n ? this.fr[i].b : (this.fr[i].b == this.cu.n ? this.fr[i].a : null);
      if (f && !ls.includes(f)) ls.push(f);
    }
    return ls;
  },
  sl() {
    if (!this.sf) return [];
    return this.us.filter(x => x.n.includes(this.sf) && x.n != this.cu.n);
  },
  rk(p) { return (p / 10) | 0; },
  mp() {
    return this.tk.filter(x => x.o == this.pu && (this.pu == this.cu.n || x.v == 0)).reverse();
  },
  gu(n) {
    for (let i = 0; i < this.us.length; i++) if (this.us[i].n == n) return this.us[i];
    return {};
  }
});