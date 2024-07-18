import { useState } from 'react';

const InputCreate = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const urlApi = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlApi}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTask = await response.json();
      onTaskCreated(newTask);
      setTitle('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default InputCreate;
