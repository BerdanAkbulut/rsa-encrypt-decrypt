function prime_check(a) {
  if (a === 2) {
    return true;
  } else if (a < 2 || a % 2 === 0) {
    return false;
  } else if (a > 2) {
    for (let i = 2; i < a; i++) {
      if (!a % i) {
        return false;
      }
    }
  }
  return true;
}
function eugcd(e, r) {
  for (let i = 0; i < r; i++) {
    while (e !== 0) {
      let a = Math.floor(r / e);
      let b = r % e;
      if (b !== 0) {
        return 0;
      }
      r = e;
      e = b;
    }
  }
}

function eeaFunc(a, b) {
  if (a % b === 0) {
    return { first: b, second: 0, third: 1 };
  } else {
    let sonuc = eeaFunc(b, a % b);
    let gcd = sonuc.first;
    let s = sonuc.second;
    let t = sonuc.third;

    s = s - Math.floor(a / b) * t;
    return { first: gcd, second: t, third: s };
  }
}
function multi_inv(e, r) {
  let eeaFuncValue = eeaFunc(e, r);
  let gcd = eeaFuncValue.first;
  let s = eeaFuncValue.third;
  // let t = eeaFuncValue.second;
  if (gcd !== 1) {
    return 'bos';
  } else {
    if (s < 0) {
      return 's 0 dan kücük oldugu icin...';
    } else if (s > 0) {
      return `%${s}`;
    }
    return s % r;
  }
}
function encrypt(pub_key_1, pub_key_2, n_text) {
  let e = parseInt(pub_key_1);
  let n = parseInt(pub_key_2);
  let c = Math.pow(parseInt(n_text), parseInt(e));
  let d = c % n;
  return d;
}
function decrypt(priv_key_1, priv_key_2, c_text) {
  let d = priv_key_1;
  let n = priv_key_2;
  let txt = c_text.split(',');
  let x = '';
  let m = 0;

  for (let i = 0; i < txt.length; i++) {
    if (i === 400) {
      x += ' ';
    } else {
      m = parseInt(i) ** d % n;
      m += 65;

      x += m;
    }
  }
  return x;
}
export { prime_check, eugcd, eeaFunc, multi_inv, encrypt, decrypt };
