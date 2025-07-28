'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchServices, fetchProjects, fetchBlogs } from '../../../../lib/api';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('Dashboard');

  const [activeTab] = useState('dashboard');

  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const servicesData = await fetchServices();
      const projectsData = await fetchProjects();
      const blogsData = await fetchBlogs();

      setServices(servicesData);
      setProjects(projectsData);
      setBlogs(blogsData);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 px-10 h-[90vh] flex flex-col justify-center">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{t('totalServices')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{services?.message?.length || 0}</p>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{t('activeProjects')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{projects?.message?.length || 0}</p>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{t('totalBlogs')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{blogs?.message?.length || 0}</p>
                </div>
              </div>

              {/* Create Options */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-300">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('createTitle')}</h2>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('createBlog')}</p>
                      <Link
                        href="/blog"
                        className="text-sm text-gray-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors duration-300"
                      >
                        {t('add')}
                      </Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('createProject')}</p>
                      <Link
                        href="/projects"
                        className="text-sm text-gray-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors duration-300"
                      >
                        {t('add')}
                      </Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('createService')}</p>
                      <Link
                        href="/service"
                        className="text-sm text-gray-500 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors duration-300"
                      >
                        {t('add')}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
