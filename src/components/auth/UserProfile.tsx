import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { updateUserAttributes, fetchUserAttributes } from 'aws-amplify/auth';

const UserProfile: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    plan: 'Premium'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (isAuthenticated) {
      try {
        const attributes = await fetchUserAttributes();
        const formattedBirthdate = attributes.birthdate
          ? new Date(attributes.birthdate).toISOString().split('T')[0]
          : '';
          
        setFormData({
          name: attributes.name || 'Usuario Demo',
          email: attributes.email || '',
          birthdate: formattedBirthdate,
          plan: 'Premium'
        });
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      console.log('Intentando actualizar atributos:', formData);
      
      // Preparamos los atributos a actualizar
      const attributesToUpdate: Record<string, string> = {
        name: formData.name,
        birthdate: formData.birthdate
      };
      
      // Eliminamos atributos vacíos
      Object.keys(attributesToUpdate).forEach(key => {
        if (!attributesToUpdate[key]) {
          delete attributesToUpdate[key];
        }
      });
      
      console.log('Atributos a actualizar:', attributesToUpdate);

      // Actualizamos los atributos del usuario en Cognito
      await updateUserAttributes({
        userAttributes: attributesToUpdate
      });

      // Recargamos los datos del usuario para mostrar los cambios
      await loadUserData();

      setMessage({ 
        text: 'Perfil actualizado correctamente', 
        type: 'success' 
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setMessage({ 
        text: `Error al actualizar el perfil: ${error instanceof Error ? error.message : 'Error desconocido'}`, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return <div className="text-center py-10">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Información de la Cuenta</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar Perfil
            </button>
          ) : null}
        </div>

        <p className="text-sm text-gray-600 mb-4">Detalles personales y de contacto.</p>

        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Nombre completo</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Fecha de cumpleaños</p>
              <p className="font-medium">{formData.birthdate || 'No especificada'}</p>
            </div>
            <div>
              <p className="text-gray-600">Plan</p>
              <p className="font-medium">{formData.plan}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">Nombre completo</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
              />
              <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar directamente</p>
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-gray-700 mb-1">Fecha de cumpleaños</label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Plan</label>
              <input
                type="text"
                value={formData.plan}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Opciones de Cuenta</h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
