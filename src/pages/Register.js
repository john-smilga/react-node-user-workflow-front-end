import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormRow from '../components/FormRow';
import axios from 'axios';
import { useGlobalContext } from '../context';
function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setAlert({ show: false, text: '', type: 'danger' });
    setLoading(true);
    const { name, email, password } = values;
    const registerNewUser = { name, email, password };

    try {
      const { data } = await axios.post(
        `/api/v1/auth/register`,
        registerNewUser
      );
      console.log(data);
      setRegisterSuccess(true);
      setValues({ name: '', email: '', password: '' });
      setAlert({ show: true, text: data.msg, type: 'success' });
    } catch (error) {
      const { msg } = error.response.data;
      setAlert({ show: true, text: msg, type: 'danger' });
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper className='page'>
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        {!registerSuccess && (
          <form className='form' onSubmit={onSubmit}>
            {/* single form row */}

            <FormRow
              type='name'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />

            {/* single form row */}
            <FormRow
              type='email'
              name='email'
              value={values.email}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            {/* single form row */}
            <FormRow
              type='password'
              name='password'
              value={values.password}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            <button type='submit' className='btn btn-block' disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </button>
            <p>
              Already a Member?
              <Link to='/login' className='login-link'>
                login
              </Link>
            </p>
          </form>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Register;
