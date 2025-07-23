'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchServices, fetchProjects, fetchBlogs } from '../../../../lib/api';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('Dashboard');

  const [activeTab, setActiveTab] = useState('dashboard');

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
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 px-10 h-[90vh] flex flex-col justify-center">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 bg-white rounded-lg shadow">
                  <p className="text-sm font-medium text-gray-500 truncate">{t('totalServices')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{services?.message?.length || 0}</p>
                </div>
                <div className="p-5 bg-white rounded-lg shadow">
                  <p className="text-sm font-medium text-gray-500 truncate">{t('activeProjects')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{projects?.message?.length || 0}</p>
                </div>
                <div className="p-5 bg-white rounded-lg shadow">
                  <p className="text-sm font-medium text-gray-500 truncate">{t('totalBlogs')}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{blogs?.message?.length || 0}</p>
                </div>
              </div>

              {/* Create Options */}
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">{t('createTitle')}</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600">{t('createBlog')}</p>
                      <Link href="/" className="text-sm text-gray-500 hover:bg-slate-300 px-4 py-2 rounded-xl">{t('add')}</Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600">{t('createProject')}</p>
                      <Link href="/" className="text-sm text-gray-500 hover:bg-slate-300 px-4 py-2 rounded-xl">{t('add')}</Link>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600">{t('createService')}</p>
                      <Link href="/" className="text-sm text-gray-500 hover:bg-slate-300 px-4 py-2 rounded-xl">{t('add')}</Link>
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
