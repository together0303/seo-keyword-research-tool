"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiArrowRightLine, RiFileCopyLine, RiInformationLine, RiSearchLine } from '@remixicon/react';
import { TextInput, Button, Grid, Card, BarChart, Badge } from '@tremor/react';
import TTIcon from '../icons/TTIcon';
import CountryPicker from '../CountryPicker';
import KDCart from '../KDChart';
import { Tooltip } from '../Tooltip';
import { API_URL } from '../../config';
import axios from 'axios';

const data = [
    {
        keyword: 'user experience design',
        Role: 'What is user experience design?',
        kd: 14
    },
    {
        keyword: 'ux design',
        Role: 'How ux design can be used to generate more revenue?',
        kd: 84
    },
    {
        keyword: 'ux ui designer',
        Role: 'What is the role of UI UX designer?',
        kd: 100
    },
    {
        keyword: 'ui ux',
        Role: 'How does UI and UX are different?',
        kd: 69
    },
    {
        keyword: 'google ux design',
        Role: 'How does Google uses UX design?',
        kd: 29
    }
];

export default function KeywordOverview() {
    const [keyword, setKeyword] = useState<string>('');
    const [country, setCountry] = useState<string>('United States');
    const [inited, setInited] = useState<boolean>(false);
    const [sv, setSV] = useState<any>(null);
    const [gsv, setGSV] = useState<any>(null);
    const [suggestions, setSuggestions] = useState<any>(null);
    const [questions, setQuestions] = useState<any>(null);
    const [serp, setSerp] = useState<any>(null);
    
    const [filterKeyword, setFilterKeyword] = useState('');
    const [checked, setChecked] = useState<number[]>([]);
    function generateRandomNumbers(min: number, max: number, count: number) {
        const randomNumbers = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            randomNumbers.push({ date: 'Sep 23 2023', volume: randomNumber });
        }
        return randomNumbers;
    }
    function getBgClassByKD(kd: number) {
        if (kd > 90) return 'border-red-500 bg-red-400'
        else if (kd > 80) return 'border-orange-500 bg-orange-400'
        else if (kd > 65) return 'border-amber-500 bg-amber-400'
        else if (kd > 35) return 'border-lime-500 bg-lime-400'
        else if (kd > 20) return 'border-lime-500 bg-lime-400'
        else return 'border-green-500 bg-green-400'

    }
    function handleChecked(c: Boolean, ind: number) {
        if (ind === -1) {

        } else {
            if (c) {
                setChecked([...checked, ind]);
            } else {
                setChecked(checked.filter(cc => cc !== ind));
            }
        }
    }

    const formatNumber = (num: number|null|undefined) => {
        if (!num) return 0;
        if (num > 999999999) {
            return (num / 1000000000).toFixed(1) + "B";
        } else if (num > 999999) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num > 999) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return Math.floor(num);
        }
    }
    function generateVolumeChartData(data: any) {
        if (!data) return [];
        const searches = data.monthly_searches.map((s:any) => {
            return {
                date: s.year + '-' + s.month,
                search_volume: s.search_volume
            }
        });
        return searches.reverse();
    }
    function getInterestGrowth(data: any) {
        if (!data) return '';

        const cmonth = data.monthly_searches[0]['search_volume'];
        const lmonth = data.monthly_searches[1]['search_volume'];
        const percent = (((cmonth - lmonth) / lmonth) * 100).toFixed(2);
        if (parseFloat(percent) >= 0) {
            return <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33341 5.21662L4.06674 8.48328C3.93341 8.61662 3.77785 8.68051 3.60007 8.67495C3.4223 8.6694 3.26674 8.59995 3.13341 8.46662C3.01118 8.33328 2.9473 8.17773 2.94174 7.99995C2.93618 7.82217 3.00007 7.66662 3.13341 7.53328L7.53341 3.13328C7.60007 3.06662 7.6723 3.0194 7.75007 2.99162C7.82785 2.96384 7.91118 2.94995 8.00007 2.94995C8.08896 2.94995 8.1723 2.96384 8.25007 2.99162C8.32785 3.0194 8.40007 3.06662 8.46674 3.13328L12.8667 7.53328C12.989 7.65551 13.0501 7.80828 13.0501 7.99162C13.0501 8.17495 12.989 8.33328 12.8667 8.46662C12.7334 8.59995 12.5751 8.66662 12.3917 8.66662C12.2084 8.66662 12.0501 8.59995 11.9167 8.46662L8.66674 5.21662V12.6666C8.66674 12.8555 8.60285 13.0138 8.47507 13.1416C8.3473 13.2694 8.18896 13.3333 8.00007 13.3333C7.81118 13.3333 7.65285 13.2694 7.52507 13.1416C7.39729 13.0138 7.33341 12.8555 7.33341 12.6666V5.21662Z" fill="#15803D" />
                </svg>
                <span className='text-green-600'>{percent}%</span>
            </>
        } else if (parseFloat(percent) < 0) {
            return <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33353 10.7834V3.33341C7.33353 3.14453 7.39742 2.98619 7.5252 2.85841C7.65297 2.73064 7.81131 2.66675 8.0002 2.66675C8.18908 2.66675 8.34742 2.73064 8.4752 2.85841C8.60297 2.98619 8.66686 3.14453 8.66686 3.33341V10.7834L11.9335 7.51675C12.0669 7.38341 12.2224 7.31953 12.4002 7.32508C12.578 7.33064 12.7335 7.40008 12.8669 7.53341C12.9891 7.66675 13.053 7.8223 13.0585 8.00008C13.0641 8.17786 13.0002 8.33341 12.8669 8.46675L8.46686 12.8667C8.4002 12.9334 8.32797 12.9806 8.2502 13.0084C8.17242 13.0362 8.08908 13.0501 8.0002 13.0501C7.91131 13.0501 7.82797 13.0362 7.7502 13.0084C7.67242 12.9806 7.6002 12.9334 7.53353 12.8667L3.13353 8.46675C3.01131 8.34453 2.9502 8.19175 2.9502 8.00841C2.9502 7.82508 3.01131 7.66675 3.13353 7.53341C3.26686 7.40008 3.4252 7.33341 3.60853 7.33341C3.79186 7.33341 3.9502 7.40008 4.08353 7.53341L7.33353 10.7834Z" fill="#DC2626" />
                </svg>
                <span className='text-red-600'>{percent}%</span>
            </>
            
        } else {
            return '';
        }
    }
    async function fetchWithDelay(fn: Function, delay: number) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fn();
    }
    async function load(k: string, c: string) {
        console.log(country)
        await fetchWithDelay(() => fetchSV(k, c), 0);
        await fetchWithDelay(() => fetchGSV(k, c), 200); // 10ms delay
        await fetchWithDelay(() => fetchSuggestions(k, c), 300); // 20ms delay
        await fetchWithDelay(() => fetchQuestions(k, c), 400); // 30ms delay
        await fetchWithDelay(() => fetchSerp(k, c), 500); // 40ms delay        
    }
    function fetchSV(k: string, c: string) {
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=sv`)
            .then((d: any) => {
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    if (data['result'][0]) setSV(data['result'][0]);
                    console.log(data['result'][0]);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function fetchGSV(k: string, c: string) {
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=gsv`)
            .then((d: any) => {
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    if (data['result'][0]) setGSV(data['result'][0]);
                    console.log(data['result'][0]);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function fetchSuggestions(k: string, c: string) {
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=suggestions`)
            .then((d: any) => {
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    if (data['result'][0]?.['items']) setSuggestions(data['result'][0]['items'].slice(0, 10));
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function fetchQuestions(k: string, c: string) {
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=questions`)
            .then((d: any) => {
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    if (data['result'][0]?.['items']) setQuestions(data['result'][0]['items'].slice(0, 10));
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function fetchSerp(k: string, c: string) {
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=serp`)
            .then((d: any) => {
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    if (data['result'][0]?.['items']) setSerp(data['result'][0]['items'].slice(0, 10));
                    console.log(data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    function searchKeyword() {
        if (keyword) {
            console.log(keyword, country);
            setSV(null);
            setGSV(null);
            setSuggestions(null);
            setQuestions(null);
            setSerp(null);
            load(keyword, country);
        }
    }
    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            let c = urlParams.get('country');
            console.log(c)
            if (c) setCountry(c);
            else c = country;

            const k = urlParams.get('keyword');
            if (k &&  !inited) {
                setKeyword(k);
                setInited(true);
                load(k, c);
            }
        }
        init();
    }, [])
    useEffect(() => {
        if (inited) {
            const newURL = `/keyword-overview?keyword=${keyword}&country=${country}`;
            console.log(newURL)
            window.history.pushState({}, '', newURL);
        }
    }, [keyword, country])
    return (
        <>
            <div className='py-8'>
                <h3 className='text-primary font-semibold text-2xl sm:text-3xl'>Welcome, Jason</h3>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='bg-white p-3 gap-2 rounded-md max-w-[368px] sm:max-w-[768px] sm:flex flex-row sm:h-16'>
                    <TextInput className='border-1 mt-2 sm:mt-0' icon={TTIcon} placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <CountryPicker className="border-1 mt-2 sm:mt-0" country={country} setCountry={setCountry} api="keywords_data" />
                    <Button icon={RiSearchLine} onClick={searchKeyword} className='mt-2 sm:mt-0 bg-brand text-black border-none flex flex-row hover:bg-brand-600 pl-6'>
                        <span>Search Keyword</span>
                    </Button>
                </div>

                <div>
                    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
                        <Card className='w-full p-4 relative'>
                            <h3 className='text-secondaryp text-md font-semibold'>Keyword Difficulty</h3>
                            <Tooltip
                                content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
                            >
                                <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-secondary' /></span>
                            </Tooltip>
                            <div className='mt-2'>
                                <KDCart value={sv?.competition_index ?? 0}></KDCart>
                            </div>
                        </Card>

                        <Card className='p-4 relative'>
                            <h3 className="text-secondary text-sm font-semibold">Search Volume</h3>
                            <Tooltip
                                content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
                            >
                                <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-secondary' /></span>
                            </Tooltip>
                            <p className="text-3xl font-semibold">{formatNumber(sv?.search_volume)}</p>
                            <div className="flex text-secondary text-xs font-medium my-2 gap-1">
                                <span>Keyword interest growth </span>
                                { getInterestGrowth(sv) }
                            </div>
                            <BarChart
                                data={generateVolumeChartData(sv)}
                                index="date"
                                categories={['search_volume']}
                                colors={['blue-300']}
                                showXAxis={false}
                                showYAxis={false}
                                showLegend={false}
                                className='h-32'
                            />
                        </Card>

                        <Card className='p-4 relative'>
                            <h3 className="text-secondary text-sm font-semibold">Global Search Volume</h3>
                            <Tooltip
                                content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
                            >
                                <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-secondary' /></span>
                            </Tooltip>
                            <p className="text-3xl font-semibold">{formatNumber(gsv?.search_volume)}</p>
                            <div className="flex text-secondary text-xs font-medium my-2 gap-1">
                                <span>Keyword interest growth </span>
                                { getInterestGrowth(gsv) }
                            </div>
                            <BarChart
                                data={generateVolumeChartData(gsv)}
                                index="date"
                                categories={['search_volume']}
                                colors={['indigo-300']}
                                showXAxis={false}
                                showYAxis={false}
                                showLegend={false}
                                className='h-32'
                            />
                        </Card>
                    </Grid>
                </div>

                <div>
                    <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
                        <Card className='p-4 sm:p-6 relative'>
                            <h3 className='text-primary text-lg font-semibold'>Keyword Suggestions</h3>
                            <div className='mt-3 sm:mt-4 overflow-x-auto custom-scroll'>
                                <table className="mb-2 w-full min-w-xs text-secondary">
                                    <thead className='text-xs'>
                                        <tr>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                            <th className='w-9/12 border-b border-default py-2 px-1 font-semibold'>Keyword</th>
                                            <th className='w-2/12 border-b border-default py-2 px-1 font-semibold text-right'>
                                                <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm'>
                                        {suggestions?.map((item: any, index: number) => (
                                            <tr key={index} className='border-0 h-8 hover:bg-surface hover-parent'>
                                                <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>{index + 1}</td>
                                                <td className='py-2 px-1 h-8 font-medium text-primary'>
                                                    <div className='w-full flex justify-between '>
                                                        <span>{item.keyword}</span>
                                                        <Tooltip content='Copy'>
                                                            <span className='hover-child cursor-pointer'>
                                                                <RiFileCopyLine className='w-4 h-4 text-secondary' />
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary rounded-e-md'>
                                                    { formatNumber(item.keyword_info.search_volume)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-4'>
                                <Link href={keyword ? '/keyword-manager?keyword='+keyword+'&country='+country : '#'} className='bg-surface text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-surface-600 '>
                                    <span>View All Keywords</span>
                                    <span><RiArrowRightLine /></span>
                                </Link>
                            </div>
                        </Card>

                        <Card className='p-4 sm:p-6 relative'>
                            <h3 className='text-primary text-lg font-semibold'>Long tail keywords & questions</h3>
                            <div className='mt-3 sm:mt-4 overflow-x-auto custom-scroll'>
                                <table className="mb-2 w-full min-w-xs text-secondary">
                                    <thead className='text-xs'>
                                        <tr>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                            <th className='w-9/12 border-b border-default py-2 px-1 font-semibold'>Keyword</th>
                                            <th className='w-2/12 border-b border-default py-2 px-1 font-semibold text-right'>
                                                <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm'>
                                        {questions?.map((item:any, index:number) => (
                                            <tr key={index} className='border-0 h-8 hover:bg-surface hover-parent'>
                                                <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>{index + 1}</td>
                                                <td className='py-2 px-1 h-8 font-medium text-primary'>
                                                    <div className='w-full flex justify-between '>
                                                        <span>{item.keyword}</span>
                                                        <Tooltip content='Copy'>
                                                            <span className='hover-child cursor-pointer'>
                                                                <RiFileCopyLine className='w-4 h-4 text-secondary' />
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary rounded-e-md'>
                                                    { formatNumber(item.keyword_info.search_volume)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-4'>
                                <Link href={keyword ? '/keyword-manager?keyword='+keyword+'&country='+country+'&question=true' : '#'} className='bg-surface text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-surface-600 '>
                                    <span>View All Keywords</span>
                                    <span><RiArrowRightLine /></span>
                                </Link>
                            </div>
                        </Card>
                    </Grid>
                </div>
                <div>
                    <Grid numItemsSm={1} numItemsLg={1} className="gap-6">
                        <Card className='p-4 sm:p-6 relative'>
                            <h3 className='text-primary text-lg font-semibold'>SERP overview</h3>
                            <div className='mt-3 sm:mt-4 overflow-x-auto custom-scroll'>
                                <table className="w-full min-w-sm text-secondary border-separate border-spacing-x-0 border-spacing-y-1">
                                    <thead className='text-xs'>
                                        <tr>
                                            <th className='border-b border-default py-2 px-1 font-semibold text-center'>
                                                <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, -1)} />
                                            </th>
                                            <th className='border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                            <th className='w-5/12 border-b border-default py-2 px-1 font-semibold text-left'>URL</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>KD</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>DA</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>UR</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Backlinks</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Ref.domains</th>
                                            <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Keywords</th>
                                            {/* <th className='w-2/12 border-b border-default py-2 px-1 font-semibold text-right'>
                            <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm'>
                                        {serp?.map((item:any, index:number) => (
                                            <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-surface'}`}>
                                                <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                                                    <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, index)} />
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-center'>
                                                    {index + 1}
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-primary'>
                                                    <div className='w-full flex justify-between '>
                                                        <span>{item.url}</span>
                                                        <Tooltip content='Copy URL'>
                                                            <span className='hover-child cursor-pointer'>
                                                                <RiFileCopyLine className='w-4 h-4 text-secondary' />
                                                            </span>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary'>
                                                    <Tooltip content='Keyword difficulty - '>
                                                        <Badge className={`w-8 h-5 text-xs text-primary border ${getBgClassByKD(40)}`}>{40}</Badge>
                                                    </Tooltip>
                                                </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary'> 66 </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary'> 66 </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary'> 55,658 </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary'> 55,658 </td>
                                                <td className='py-2 px-1 h-8 font-medium text-right text-primary rounded-e-md'> 765 </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-4'>
                            <Link href={keyword ? '/serp-overview?keyword='+keyword+'&country='+country : '#'} className='bg-surface text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-surface-600 '>
                                    <span>Show top 100 positions</span>
                                    <span><RiArrowRightLine /></span>
                                </Link>
                            </div>
                        </Card>
                    </Grid>

                </div>
            </div>
        </>
    );
}
