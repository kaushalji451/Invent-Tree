import React from 'react'
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import RoatedSVG from "../../components/RoatedSVG"
const Slide1 = ({ slideRefs }) => {

    const t = useTranslations('Home');
    return (
        <div ref={slideRefs.current[0]} className="w-[100vw] h-screen flex max-md:flex-col items-center justify-center bg-cover bg-center bg-slate-200 min-md:gap-10 min-md:px-20 snap-start"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dpbpu5b0v/image/upload/v1752593870/Screenshot_2025-07-15_210659_xpsbuf.png')" }}
        >
            <div className="flex flex-col items-center ps-20 gap-5 min-md:h-1/2">
                <h1 className="w-2/3  text-2xl  text-center text-[#20998e] max-md:text-center max-md:mt-10">
                    {/* {t('slide1title')} */}

                    To empower political leaders, candidates, and parties with strategic, data-driven consultancy and innovative digital tools that enhance voter engagement, streamline campaign management, and drive successful election outcomes.

                </h1>
                <p className="text-[#20998e] border-t w-[120px] text-center">{t('slide1msg')}</p>
            </div>
            <div className="max-w-xl">
                <p className="pb-10 max-md:px-5 max-md:text-center text-base text-gray-700 leading-relaxed">
                    {/* {t('slide1description')} */}
                    At Nivesh Jano, we are dedicated to transforming political vision into electoral success. Our comprehensive consultancy services span every aspect of modern campaigning — from strategic planning and voter outreach to app development, branding, and real-time war room operations.

                    With a strong foundation in political science, technology, and analytics, our team brings a unique blend of expertise to the table. We help you craft compelling narratives, engage meaningfully with voters, and make informed decisions using actionable insights.

                    Whether you are contesting an election or looking to strengthen governance, we provide the customized support and digital infrastructure needed to lead effectively and connect with the public.
                </p>
                <div className='max-md:flex max-md:justify-center'>
                    <Link href="/about" className="rounded-md border border-slate-300 shadow-xl w-50 px-6 py-3 hover:bg-[#20998e] hover:text-white transition duration-300 dark:bg-slate-400 dark:text-white">
                        {t('slide1CTA')}
                    </Link>
                </div>
            </div>

            {/* roated svg */}
            <RoatedSVG />


        </div>
    )
}

export default Slide1
