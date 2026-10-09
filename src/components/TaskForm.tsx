export function TaskForm() {
    return (
        <section
            className="panel"
            aria-labelledby="task-form-title"
        >
            <div className="section-heading">
                <div>
                    <p className="section-heading__eyebrow">
                        Registro
                    </p>
                    <h2 id="task-form-title">Nueva tarea</h2>
                </div>
            </div>
            <form className="task-form">
                <label htmlFor="task-title">Título de la tarea</label>
                <div className="task-form__row">
                    <input
                        id="task-title"
                        name="title"
                        type="text"
                        placeholder="Ejemplo: revisar documentación"
                        maxLength={120}
                    />
                    <button type="button" disabled>
                        Agregar tarea
                    </button>
                </div>
                <p className="helper-text">
                    El formulario se activará en una actividad posterior.
                </p>
            </form>
        </section>
    );
}