import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { getHttpErrorMessage } from '../services/http.service';
const MIN_PASSWORD_CHARACTERS = 15;
const MAX_PASSWORD_BYTES = 72;
function getPasswordBytes(value: string): number {
    return new TextEncoder().encode(value).length;
}
export function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] =
        useState('');
    const [errorMessage, setErrorMessage] =
        useState('');
    const [isSubmitting, setIsSubmitting] =
        useState(false);
    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        setErrorMessage('');
        const normalizedName = name.trim();
        if (
            normalizedName.length < 2 ||
            normalizedName.length > 80
        ) {
            setErrorMessage(
                'El nombre debe contener de 2 a 80 caracteres.',
            );
            return;
        }
        if (password.length < MIN_PASSWORD_CHARACTERS) {
            setErrorMessage(
                'La contraseña debe contener al menos 15 caracteres.',
            );
            return;
        }
        if (getPasswordBytes(password) > MAX_PASSWORD_BYTES) {
            setErrorMessage(
                'La contraseña no debe superar 72 bytes.',
            );
            return;
        }
        if (password !== confirmation) {
            setErrorMessage(
                'Las contraseñas no coinciden.',
            );
            return;
        }
        setIsSubmitting(true);
        try {
            const user = await register({
                name: normalizedName,
                email: email.trim(),
                password,
            });
            navigate('/login', {
                replace: true,
                state: {
                    registeredEmail: user.email,
                    registrationMessage:
                        'La cuenta fue creada. Inicia sesión para continuar.',
                },
            });
        } catch (error) {
            setErrorMessage(getHttpErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <section
            className="panel auth-panel"
            aria-labelledby="register-title"
        >
            <p className="section-heading__eyebrow">
                Registro
            </p>
            <h2 id="register-title">Crear cuenta</h2>
            <p>
                El Backend asignará el rol user. El formulario
                no permite elegir permisos.
            </p>
            {errorMessage && (
                <p
                    className="operation-message operation-message--error"
                    role="alert"
                >
                    {errorMessage}
                </p>
            )}
            <form
                className="auth-form"
                onSubmit={(event) => void handleSubmit(event)}
                noValidate
            >
                <div className="form-field">
                    <label htmlFor="register-name">Nombre</label>
                    <input
                        id="register-name"
                        name="name"
                        value={name}
                        minLength={2} maxLength={80}
                        autoComplete="name"
                        required
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="register-email">
                        Correo electrónico
                    </label>
                    <input
                        id="register-email"
                        name="email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        required
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="register-password">
                        Contraseña
                    </label>
                    <input
                        id="register-password"
                        name="password"
                        type="password"
                        value={password}
                        minLength={MIN_PASSWORD_CHARACTERS}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting} onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />
                    <small>
                        Mínimo 15 caracteres y máximo 72 bytes.
                    </small>
                </div>
                <div className="form-field">
                    <label htmlFor="register-confirmation">
                        Confirmar contraseña
                    </label>
                    <input
                        id="register-confirmation"
                        name="confirmation"
                        type="password"
                        value={confirmation}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                        onChange={(event) =>
                            setConfirmation(event.target.value)
                        }
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? 'Registrando...'
                        : 'Crear cuenta'}
                </button>
            </form>
            <p className="auth-alternative">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login">Iniciar sesión</Link>
            </p>
        </section>
    );
}