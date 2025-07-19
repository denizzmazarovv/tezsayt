import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, LogOut } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';
import { logout, refreshSession } from '../utils/auth';
import { sanitizeFormData, validateInput, validateEmail, validateURL } from '../utils/security';

interface SecureAdminProps {
  currentLanguage: Language;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onLogout: () => void;
}

const SecureAdmin: React.FC<SecureAdminProps> = ({
  currentLanguage,
  projects,
  onUpdateProjects,
  onLogout
}) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = translations[currentLanguage];

  const emptyProject: Project = {
    id: '',
    title: { ru: '', en: '', uz: '' },
    description: { ru: '', en: '', uz: '' },
    image: '',
    category: 'website',
    technologies: [],
    url: ''
  };

  const [formData, setFormData] = useState<Project>(emptyProject);

  // Refresh session periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshSession();
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const validateForm = (data: Project): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // Validate titles
    Object.keys(data.title).forEach(lang => {
      const title = data.title[lang as keyof typeof data.title];
      if (!validateInput(title, 100)) {
        newErrors[`title_${lang}`] = 'Недопустимое название';
      }
    });

    // Validate descriptions
    Object.keys(data.description).forEach(lang => {
      const desc = data.description[lang as keyof typeof data.description];
      if (!validateInput(desc, 500)) {
        newErrors[`description_${lang}`] = 'Недопустимое описание';
      }
    });

    // Validate image URL
    if (data.image && !validateURL(data.image)) {
      newErrors.image = 'Недопустимый URL изображения';
    }

    // Validate project URL
    if (data.url && !validateURL(data.url)) {
      newErrors.url = 'Недопустимый URL проекта';
    }

    // Validate category
    const validCategories = ['website', 'landing', 'ecommerce'];
    if (!validCategories.includes(data.category)) {
      newErrors.category = 'Недопустимая категория';
    }

    return newErrors;
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsAdding(false);
    setErrors({});
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingProject(null);
    setFormData({ ...emptyProject, id: Date.now().toString() });
    setErrors({});
  };

  const handleSave = () => {
    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData) as Project;
    
    // Validate form
    const formErrors = validateForm(sanitizedData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Process technologies
    const technologies = typeof sanitizedData.technologies === 'string' 
      ? sanitizedData.technologies.split(',').map(t => t.trim()).filter(t => t && validateInput(t, 50))
      : sanitizedData.technologies.filter(t => validateInput(t, 50));

    const updatedProject = { ...sanitizedData, technologies };

    if (isAdding) {
      onUpdateProjects([...projects, updatedProject]);
    } else {
      onUpdateProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
    }

    setEditingProject(null);
    setIsAdding(false);
    setFormData(emptyProject);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот проект?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsAdding(false);
    setFormData(emptyProject);
    setErrors({});
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const updateFormField = (field: string, lang: string, value: string) => {
    if (field === 'title' || field === 'description') {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear specific error when user starts typing
    const errorKey = lang ? `${field}_${lang}` : field;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">{t.admin.title}</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t.admin.addProject}
          </button>
        </div>

        {/* Form */}
        {(editingProject || isAdding) && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {isAdding ? t.admin.addProject : t.admin.editProject}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Title Fields */}
              {['ru', 'en', 'uz'].map(lang => (
                <div key={`title-${lang}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.title_field} ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.title[lang as keyof typeof formData.title]}
                    onChange={(e) => updateFormField('title', lang, e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                      errors[`title_${lang}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={100}
                  />
                  {errors[`title_${lang}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`title_${lang}`]}</p>
                  )}
                </div>
              ))}

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.admin.image_field}
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateFormField('image', '', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={500}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Description Fields */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {['ru', 'en', 'uz'].map(lang => (
                <div key={`desc-${lang}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.description_field} ({lang.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description[lang as keyof typeof formData.description]}
                    onChange={(e) => updateFormField('description', lang, e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                      errors[`description_${lang}`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={500}
                  />
                  {errors[`description_${lang}`] && (
                    <p className="text-red-500 text-sm mt-1">{errors[`description_${lang}`]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Other Fields */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.admin.category_field}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateFormField('category', '', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="website">Website</option>
                  <option value="landing">Landing</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.admin.technologies_field}
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
                  onChange={(e) => updateFormField('technologies', '', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors"
                  maxLength={200}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.admin.url_field}
                </label>
                <input
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => updateFormField('url', '', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-colors ${
                    errors.url ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={500}
                />
                {errors.url && (
                  <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {t.admin.save}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {t.admin.cancel}
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={project.image}
                alt={project.title[currentLanguage]}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.title[currentLanguage]}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {project.description[currentLanguage]}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecureAdmin;