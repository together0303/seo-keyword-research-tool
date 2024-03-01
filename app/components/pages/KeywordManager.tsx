"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, Grid, Icon, Select, SelectItem, TextInput } from "@tremor/react";
import { RiArrowLeftLine, RiArrowLeftSLine, RiArrowRightSLine, RiFileCopyLine, RiLoader2Fill, RiLoaderLine, RiSearchLine } from "@remixicon/react";
import FilterButton from "../FilterButton";
import CountryPicker from "../CountryPicker";
import TTIcon from "../icons/TTIcon";
import { Tooltip } from "../Tooltip";
import test from "./TEST";
import axios from "axios";
import { API_URL } from "../../config";
import MiniChart from "../MiniChart";
  
export default function KeywordManager() {
    const [keyword, setKeyword] = useState<string>('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [country, setCountry] = useState<string>('');
    const [question, setQuesiton] = useState<boolean>(false)
    const [inited, setInited] = useState<boolean>(false);
    const [isAll, setIsALl] = useState<boolean>(false); // if true, keyword list, if false, keyword suggestions

    const [perPage, setPerPage] = useState<number>(100);
    const [page, setPage] = useState<number>(0);
    const [pageChanged, setPageChanged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [filterKeyword, setFilterKeyword] = useState<string>('');
    const [checked, setChecked] = useState<number[]>([]);
    
    const [suggestions, setSuggestions] = useState<any>(null);
    const [keywordsData, setKeywordsData] = useState<any>(null);
    const data = test();

    function handleChecked(c: Boolean, ind: number) {
        if ( ind === -1 ) {
            if (c) {
                const cc = (isAll ? keywordsData?.items.map((s: any, index: number) => index) : suggestions?.items.map((s: any, index: number) => index)) || [];
                setChecked(cc);
            } else {
                setChecked([]);
            }
        } else {
          if (c) {
            setChecked([...checked, ind]);
          } else {
            setChecked(checked.filter(cc => cc !== ind));
          }
        }
      }

    function getBgClassByKD(kd: number) {
        if (!kd) return 'hidden';

        if (kd > 90) return 'border-red-500 bg-red-400'
        else if (kd > 80) return 'border-orange-500 bg-orange-400'
        else if (kd > 65) return 'border-amber-500 bg-amber-400'
        else if (kd > 35) return 'border-lime-500 bg-lime-400'
        else if (kd > 20) return 'border-lime-500 bg-lime-400'
        else return 'border-green-500 bg-green-400'
  
    }

    function convert_date_to_text(date_string: string) {
        if (!date_string) return '';

        const dateObject = new Date(date_string);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (dateObject.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (dateObject.toDateString() === yesterday.toDateString()) {
            return "Yesterday";;
        } else {
            const day = dateObject.getDate();
            const month = dateObject.toLocaleString('en-US', {month: 'short'});
            const year = dateObject.getFullYear();
            return `${day} ${month} ${year}`;
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

    function load(k: string = keyword, c: string = country, q: boolean = question) {
        setLoading(true);
        axios.get(`${API_URL}/api/keywords/suggestions?keyword=${k}&country=${c}&question=${q}&page=${page}&perPage=${perPage}`)
            .then((d: any) => {
                console.log(d.data)
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    console.log(data)
                    if (data['result'][0]) setSuggestions(data['result'][0]);
                    // console.log(data['result'][0]);
                }
            })
            .catch(error => {
                console.log(data);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function searchKeyword() {
        if (keyword) {
            console.log(keyword, country);
            setIsALl(false);
            setSuggestions(null);
            setKeywordsData(null);
            load();
        }
    }

    function changePage(i: number) {
        if (page === 0 && i === -1) return ;
        if (page * perPage >= suggestions?.total_count && i === 1) return ;

        setPage(page + i);
        setPageChanged(true);
    }
    function changePerPage(i: number) {
        setPerPage(i);
        setPage(0);
        setPageChanged(true);
    }
    function bulkLoad(k: string[]) {
        setLoading(true);
        axios.post(API_URL + '/api/keywords/bulk-overview', {keywords: k, country})
        .then(data => {
            console.log(data.data);
            if (data.data.success) {
                const items = data.data.keywords.map((d:any) => {
                    if (d.sv?.data) {
                        const cc = JSON.parse(d.sv.data);
                        cc['result'][0]['updated_at'] = d.updated_at;
                        return cc['result'][0];
                    } else {
                        console.log(d.keyword)
                        return {keyword: d.keyword};
                    }
                })
                setKeywordsData({ total_count: items.length, items: items});
            } else {
                // console.error(data);
            }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
            setLoading(false);
        }) 
    }

    function copyClipboard(text: string) {
        if (text) navigator.clipboard.writeText(text);
    }

    function copySelectedRows() {
        const selectedKeywords = checked.map((c: number) => suggestions.items[c]['keyword']);
        if (selectedKeywords.length > 0) {
            const text = selectedKeywords.join("\n");
            navigator.clipboard.writeText(text);
        }
    }

    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            
            let c = urlParams.get('country');
            if (c) setCountry(c);
            else c = country;

            let q: boolean = urlParams.get('question') === 'true' ? true : false;
            if (q) setQuesiton(q);

            const isAll = urlParams.get('all');
            console.log(isAll);
            if (isAll === 'true') {
                const k = JSON.parse(localStorage.getItem('rankulate-keywords') || "[]");
                if (k.length > 0) {
                    setKeywords(k);
                }
                setIsALl(true);
                setInited(true);
            } else {
                const k = urlParams.get('keyword');
                if (k &&  !inited) {
                    setKeyword(k);
                    setInited(true);
                    load(k, c, q);
                }
            }
        }
        init();
    }, []);

    useEffect(() => {
        if (inited) {
            const newURL = `/keyword-manager?keyword=${keyword}&country=${country}&question=${question}`;
            window.history.pushState({}, '', newURL);
        }
    }, [keyword, country]);

    useEffect(() => {
        if (pageChanged) {
            setChecked([]);
            load();
            setPageChanged(false);
        }
    }, [pageChanged]);

    useEffect(() => {
        if (keywords.length > 0) {
            bulkLoad(keywords);
        }
    }, [keywords]);
    return (
        <>
            <div className='py-8'>
                <Link href={isAll ? `/kd-research` : `/keyword-overview?country=${country}&keyword=${keyword}`} className="flex items-center mb-2">
                    <Icon icon={RiArrowLeftLine} className="w-5 h-5 text-brand-400" />
                    <span className="text-brand-400 font-medium text-xs">Back</span>
                </Link>
                <h3 className='text-primary font-semibold text-2xl sm:text-3xl'>Keyword suggestions</h3>
            </div>
            <div className='flex flex-col gap-6'>
                
                <div className='bg-white p-3 gap-2 rounded-md max-w-[368px] sm:max-w-[768px] sm:flex flex-row sm:h-16'>
                    <TextInput className='border-1 mt-2 sm:mt-0' icon={TTIcon} placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    <CountryPicker className="border-1 mt-2 sm:mt-0" country={country} setCountry={setCountry} />
                    <Button icon={RiSearchLine} onClick={searchKeyword} className='mt-2 sm:mt-0 bg-brand text-black border-none flex flex-row hover:bg-brand-600 pl-6'>
                        <span>Search Keyword</span>
                    </Button>
                </div>


                <Grid numItemsSm={1} numItemsLg={1} className="gap-4 sm:gap-6">
                    { !!isAll ? 
                    <Card className='p-4 sm:p-6 relative flex flex-col gap-6'>
                        <div>
                            <h3 className='text-primary text-lg font-semibold'>All keywords</h3>
                            <p className="text-secondary text-xs">{ (keywordsData?.total_count || 0).toLocaleString() } results</p>
                        </div>
                        <div className='overflow-x-auto custom-scroll'>
                            <table className="w-full min-w-md text-secondary border-separate border-spacing-x-0 border-spacing-y-1">
                                <thead className='text-xs'>
                                <tr>
                                    <th className='border-b border-default py-2 px-1 font-semibold text-center'>
                                    <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, -1)} />
                                    </th>
                                    <th className='border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                    <th className='w-5/12 border-b border-default py-2 px-1 font-semibold text-left'>Keyword</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>SV</th>
                                    <th className='w-2/12 border-b border-default py-2 px-1 font-semibold text-right'>Monthly SV</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>CPC</th>
                                    <th className='border-b border-default py-2 px-1 font-semibold text-right'>Updated</th>
                                </tr>
                                </thead>
                                <tbody className='text-sm'>
                                {loading && 
                                    <tr className='border-0 h-10 hover-parent hover:bg-surface'>
                                        <td className="text-center" colSpan={8}>
                                            <div className="flex justify-center items-center">
                                                <Icon icon={RiLoaderLine} className="animate-spin	"></Icon>
                                                <span>Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {!loading && !(keywordsData?.items && keywordsData.total_count > 0) && 
                                    <tr className='border-0 hover-parent hover:bg-surface'>
                                        <td className="text-center p-4" colSpan={8}>
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="font-bold text-lg">No results found</span>
                                                <span className="max-w-64">Try adjusting your search or filter options to find what you&apos;re looking for.</span>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {keywordsData?.items.map((item: any, index: number) => (
                                    <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-surface'}`}>
                                    <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                                        <input type='checkbox' className='accent-brand h-3.5 w-3.5' checked={checked.includes(index)} onChange={(e) => handleChecked(e.target.checked, index)}/>
                                    </td>
                                    <td className='py-2 px-1 h-8 font-medium text-center'>
                                        {page * perPage + index + 1}
                                    </td>
                                    <td className='py-2 px-1 h-8 font-medium text-primary'>
                                        <div className='w-full flex justify-between '>
                                        <span>{item.keyword}</span>
                                        <Tooltip content='Copy Keyword'>
                                            <span className='hover-child cursor-pointer' onClick={() => copyClipboard(item.keyword)}>
                                            <RiFileCopyLine className='w-4 h-4 text-secondary'/>
                                            </span>
                                        </Tooltip>
                                        </div>
                                    </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {formatNumber(item.search_volume)} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> <MiniChart values={item.monthly_searches?.map((s: any) => s.search_volume) || []} /> </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {item.cpc ? '$' + item.cpc : ''} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary rounded-e-md'> {convert_date_to_text(item.updated_at)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>   
                        </div>
                    </Card>
                    : 
                        <Card className='p-4 sm:p-6 relative flex flex-col gap-6'>
                            <div>
                                <h3 className='text-primary text-lg font-semibold'>{ question ? "Long tail keywords & questions" : "All Keyword suggestions" }</h3>
                                <p className="text-secondary text-xs">{ (suggestions?.total_count || 0).toLocaleString() } results</p>
                            </div>
                            <div className='bg-white gap-2 rounded-md w-full flex flex-col sm:flex-row'>
                                <Button icon={RiFileCopyLine} onClick={() => copySelectedRows()} className="h-9 bg-brand border-brand text-primary hover:bg-brand-600 hover:border-brand">Copy</Button>
                                <FilterButton text="Keyword" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                                <FilterButton text="SV" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                                <FilterButton text="Global SV" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                                <FilterButton text="Word count" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                            </div>
                            <div className='overflow-x-auto custom-scroll'>
                                <table className="w-full min-w-md text-secondary border-separate border-spacing-x-0 border-spacing-y-1">
                                    <thead className='text-xs'>
                                    <tr>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-center'>
                                        <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, -1)} />
                                        </th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                        <th className='w-5/12 border-b border-default py-2 px-1 font-semibold text-left'>Keyword</th>
                                        <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>KD</th>
                                        <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>SV</th>
                                        <th className='w-2/12 border-b border-default py-2 px-1 font-semibold text-right'>Monthly SV</th>
                                        <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>CPC</th>
                                        {/* <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>ET</th> */}
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Updated</th>
                                    </tr>
                                    </thead>
                                    <tbody className='text-sm'>
                                    {loading && 
                                        <tr className='border-0 h-10 hover-parent hover:bg-surface'>
                                            <td className="text-center" colSpan={8}>
                                                <div className="flex justify-center items-center">
                                                    <Icon icon={RiLoaderLine} className="animate-spin	"></Icon>
                                                    <span>Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    {!loading && !(suggestions?.items && suggestions.total_count > 0) && 
                                        <tr className='border-0 hover-parent hover:bg-surface'>
                                            <td className="text-center p-4" colSpan={8}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <span className="font-bold text-lg">No results found</span>
                                                    <span className="max-w-64">Try adjusting your search or filter options to find what you&apos;re looking for.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                    {suggestions?.items?.map((item: any, index: number) => (
                                        <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-surface'}`}>
                                        <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                                            <input type='checkbox' className='accent-brand h-3.5 w-3.5' checked={checked.includes(index)} onChange={(e) => handleChecked(e.target.checked, index)}/>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-center'>
                                            {page * perPage + index + 1}
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-primary'>
                                            <div className='w-full flex justify-between '>
                                            <span>{item.keyword}</span>
                                            <Tooltip content='Copy Keyword'>
                                                <span className='hover-child cursor-pointer' onClick={() => copyClipboard(item.keyword)}>
                                                <RiFileCopyLine className='w-4 h-4 text-secondary'/>
                                                </span>
                                            </Tooltip>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-right text-primary'>
                                        <Tooltip content='Keyword difficulty - '>
                                            <Badge className={`w-8 h-5 text-xs text-primary border ${getBgClassByKD(item.keyword_properties.keyword_difficulty)}`}>{item.keyword_properties.keyword_difficulty}</Badge>
                                        </Tooltip>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {formatNumber(item.keyword_info.search_volume)} </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> <MiniChart values={item.keyword_info.monthly_searches?.map((s: any) => s.search_volume) || []} /> </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {item.keyword_info.cpc ? '$' + item.keyword_info.cpc : ''} </td>
                                        {/* <td className='py-2 px-1 h-8 font-normal text-right text-primary'> 1 </td> */}
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary rounded-e-md'> {convert_date_to_text(item.keyword_info.last_updated_time)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>   
                            </div>
                            <div className='mt-4 flex flex-wrap items-center gap-4'>
                                <div className="min-w-20 text-sm text-secondary">
                                    <Select value={perPage.toString()} onValueChange={(e) => changePerPage(parseInt(e))} >
                                        <SelectItem value="50">50 rows per page</SelectItem>
                                        <SelectItem value="100">100 rows per page</SelectItem>
                                        <SelectItem value="200">200 rows per page</SelectItem>
                                        <SelectItem value="250">250 rows per page</SelectItem>
                                        <SelectItem value="300">300 rows per page</SelectItem>
                                    </Select>
                                </div>
                                <div className="min-w-20">
                                    <button className="h-9 py-2 px-3 text-sm text-secondary border border-surface-400 hover:bg-surface rounded-lg flex justify-center items-center">
                                        <Icon icon={RiArrowLeftSLine} onClick={() => changePage(-1)} className={page === 0 ? "text-gray-400" : 'text-primary'} />
                                        <span className="text-primary ml-1 font-medium">{page*perPage + 1} - {Math.min((page+1)*perPage, suggestions?.total_count || 0)} from {suggestions?.total_count || 0}</span>
                                        <Icon icon={RiArrowRightSLine} onClick={() => changePage(1)} className={page * perPage >= suggestions?.total_count ? "text-gray-400" : 'text-primary'} />
                                    </button>
                                </div>
                            </div>           
                        </Card>
                    }
                </Grid>                    
            </div>
        </>
    );
}
