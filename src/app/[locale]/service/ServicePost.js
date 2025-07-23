'use client';

import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useTranslations } from 'next-intl';

const ServicePost = () => {
  const t = useTranslations('ServicePost');

  const [titleEn, setTitleEn] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descHi, setDescHi] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titleEn', titleEn);
    formData.append('titleHi', titleHi);
    formData.append('descriptionEn', descEn);
    formData.append('descriptionHi', descHi);
    formData.append('category', category);
    formData.append('isActive', isActive);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        body: formData,
      });
      const res = await response.json();
      if (res.message === 'Blog created') {
        close();
        alert(t('alert.success'));
        location.reload();
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert(t('alert.failure'));
    }
  };

  return (
    <div>
      <Popup
        trigger={
          <span className="text-lg py-2 px-4 border-l-4 border-[#08807a] font-normal relative left-3 select-text bg-white rounded-md shadow-sm cursor-default">
            {t('button.trigger')}
          </span>
        }
        modal
        contentStyle={{
          width: '60%',
          height: '80vh',
          borderRadius: '10px',
          padding: '20px',
          overflow: 'auto',
        }}
      >
        {(close) => (
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg relative p-6">
            <button
              className="absolute top-2 right-3 text-2xl font-bold text-gray-700 dark:text-white"
              onClick={close}
            >
              &times;
            </button>

            <h2 className="text-2xl mb-4 font-bold text-black dark:text-white text-center">
              {t('title')}
            </h2>

            <form onSubmit={(e) => handleSubmit(e, close)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.titleEn')}
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.titleHi')}
                </label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.descEn')}
                </label>
                <textarea
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.descHi')}
                </label>
                <textarea
                  value={descHi}
                  onChange={(e) => setDescHi(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.category')}
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  {t('form.image')}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="mt-1 border border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700 dark:text-white">{t('form.active')}</label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-200"
                >
                  {t('button.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {t('button.save')}
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default ServicePost;
