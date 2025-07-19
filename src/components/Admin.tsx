import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Project, Language } from '../types';
import { translations } from '../data/translations';

interface AdminProps {
  currentLanguage: Language;
  projects: Project[];
  onUpdateProjects: (projects: Project[]) => void;
  onClose: () => void;
}

const Admin: React.FC<AdminProps> = ({
  currentLanguage,
  projects,
  onUpdateProjects,
  onClose
}) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
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

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(project);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingProject(null);
    setFormData({ ...emptyProject, id: Date.now().toString() });
  };

  const handleSave = () => {
    const technologies = typeof formData.technologies === 'string' 
      ? formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      : formData.technologies;

    const updatedProject = { ...formData, technologies };

    if (isAdding) {
      onUpdateProjects([...projects, updatedProject]);
    } else {
      onUpdateProjects(projects.map(p => p.id === formData.id ? updatedProject : p));
    }

    setEditingProject(null);
    setIsAdding(false);
    setFormData(emptyProject);
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsAdding(false);
    setFormData(emptyProject);
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
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{t.admin.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
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
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {isAdding ? t.admin.addProject : t.admin.editProject}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.title_field} (RU)
                  </label>
                  <input
                    type="text"
                    value={formData.title.ru}
                    onChange={(e) => updateFormField('title', 'ru', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.title_field} (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => updateFormField('title', 'en', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.title_field} (UZ)
                  </label>
                  <input
                    type="text"
                    value={formData.title.uz}
                    onChange={(e) => updateFormField('title', 'uz', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.image_field}
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateFormField('image', '', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.description_field} (RU)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description.ru}
                    onChange={(e) => updateFormField('description', 'ru', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.description_field} (EN)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description.en}
                    onChange={(e) => updateFormField('description', 'en', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.description_field} (UZ)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description.uz}
                    onChange={(e) => updateFormField('description', 'uz', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="website">Website</option>
                    <option value="landing">Landing</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.admin.technologies_field}
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
                    onChange={(e) => updateFormField('technologies', '', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
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
    </div>
  );
};

export default Admin;