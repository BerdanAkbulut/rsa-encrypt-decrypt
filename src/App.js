import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import { prime_check, eeaFunc, multi_inv, encrypt } from './functions';

function App() {
  const [eeaValue, setEeaValue] = useState(null);
  const [multi_inv_value, setMulti_inv_value] = useState(null);
  const [message, setMessage] = useState(null);

  const [encrpytValue, setEncrpytValue] = useState(null);
  const [decryptValue, setDecryptValue] = useState(null);

  const [state, setState] = useState({
    asalSayilar: null,
    rsaModulus: null,
    r: null,
    e: null,
    eea: null,
  });
  const { asalSayilar, rsaModulus, r, e, eea } = state;
  const { register, handleSubmit, watch } = useForm();

  const encryptHandler = () => {
    console.log({ e, rsaModulus, message: parseInt(message) });
    setEncrpytValue(
      encrypt(parseInt(e), parseInt(rsaModulus), parseInt(message))
    );
  };
  const onSubmit = (data) => {
    if (
      prime_check(parseInt(data.p)) === false ||
      prime_check(parseInt(data.q)) === false
    ) {
      setState({
        ...state,
        asalSayilar: 'Lütfen asal sayılar giriniz !',
        rsaModulus: null,
        r: null,
        e: null,
        eea: null,
      });
    } else {
      setState({
        ...state,
        asalSayilar: null,
        rsaModulus: parseInt(data.p) * parseInt(data.q),
        r: (parseInt(data.p) - 1) * (parseInt(data.q) - 1),
        e: parseInt(data.e),
      });
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('p')} />
        <input {...register('q')} />
        <input {...register('e')} />

        <input type="submit" />
      </form>
      {asalSayilar && <h1>Hata : {asalSayilar}</h1>}

      {rsaModulus && <h1>Rsa Modulus (n) : {rsaModulus}</h1>}
      {/* rsa modulus */}

      {r && <h1> r: {r}</h1>}
      {/* eulers toitent */}

      {/* gcd */}
      {/* {e ? <h1>{e}</h1> : 'no'} */}

      <button onClick={() => setEeaValue(eeaFunc(e, r))}>
        Calculate Extended Euclid
      </button>
      {eeaValue && <h1> Eea Value : {eeaValue.third}</h1>}
      {/* eea */}

      <button onClick={() => setMulti_inv_value(multi_inv(e, r))}>
        Calculate Multi Inverse Value
      </button>

      {multi_inv_value && <h1>Multi inverse value : {multi_inv_value}</h1>}

      {/* multi_inv*/}

      {watch('e') && rsaModulus && (
        <h3>Public Key : ({`${watch('e')},${rsaModulus}`})</h3>
      )}
      {rsaModulus && multi_inv_value && (
        <h3>Private Key : ({`${multi_inv_value},${rsaModulus}`})</h3>
      )}

      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={encryptHandler}>Encrypt</button>
      {encrpytValue && <h1> Encrpyt value : {encrpytValue}</h1>}
      <button>Decrypt</button>
    </div>
  );
}
export default App;
