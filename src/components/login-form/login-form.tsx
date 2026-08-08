import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../../const/regexp';
import { toast } from 'react-toastify';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value;

      if (!EMAIL_REGEXP.test(email)) {
        toast.warn('Please enter a valid email address');
        return;
      }

      if (!PASSWORD_REGEXP.test(password)) {
        toast.warn('Password must contain at least one letter and one number');
        return;
      }

      dispatch(
        loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      );
    }
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={emailRef}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={passwordRef}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
