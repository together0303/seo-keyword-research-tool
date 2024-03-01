"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card, Grid, Icon, Select, SelectItem, TextInput } from "@tremor/react";
import { RiArrowLeftLine, RiArrowLeftSLine, RiArrowRightSLine, RiFileCopyLine, RiLoaderLine, RiSearchLine } from "@remixicon/react";
import CountryPicker from "../CountryPicker";
import TTIcon from "../icons/TTIcon";
import { Tooltip } from "../Tooltip";
import test from "./TEST";
import { API_URL } from "../../config";
import axios from "axios";
import FilterButton from "../FilterButton";
  
export default function SerpOverview() {
    
    const [keyword, setKeyword] = useState<string>('');
    const [inited, setInited] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const [checked, setChecked] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const [serps, setSerps] = useState<any>(null);
    const [filterKeyword, setFilterKeyword] = useState<string>('');

    const data = test();

    function handleChecked(c: Boolean, ind: number) {
        if ( ind === -1 ) {
            if (c) {
                const cc = serps?.serp.map((s: any, index: number) => index);
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
        if (kd > 90) return 'border-red-500 bg-red-400'
        else if (kd > 80) return 'border-orange-500 bg-orange-400'
        else if (kd > 65) return 'border-amber-500 bg-amber-400'
        else if (kd > 35) return 'border-lime-500 bg-lime-400'
        else if (kd > 20) return 'border-lime-500 bg-lime-400'
        else return 'border-green-500 bg-green-400'
  
    }

    function load(k: string = keyword, c: string = country) {
        setLoading(true);
        axios.get(`${API_URL}/api/keywords/overview?keyword=${k}&country=${c}&action=serp`)
            .then((d: any) => {
                console.log(d.data)
                if (d.data?.success) {
                    const data = JSON.parse(d.data.data);
                    console.log(data)
                    if (data) setSerps(data);
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
        console.log(keyword, country);
        if (keyword) {
            console.log(keyword, country);
            setSerps(null);
            load();
        }
    }

    function copyClipboard(text: string) {
        if (text) navigator.clipboard.writeText(text);
    }

    function copySelectedRows() {
        const url = checked.map((c: number) => serps.serp[c]['url']);
        if (url.length > 0) {
            const text = url.join("\n");
            navigator.clipboard.writeText(text);
        }
    }

    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            
            let c = urlParams.get('country');
            if (c) setCountry(c);
            else c = country;

            const k = urlParams.get('keyword');
            if (k) {
                const k = urlParams.get('keyword');
                if (k &&  !inited) {
                    setKeyword(k);
                    load(k, c);
                }
            }
            setInited(true);
        }
        init();
    }, []);    

    useEffect(() => {
        if (inited) {
            const newURL = `/serp-overview?keyword=${keyword}&country=${country}`;
            window.history.pushState({}, '', newURL);
        }
    }, [keyword, country]);    
    return (
        <>
            <div className='py-8'>
                <Link href={`/keyword-overview?keyword=${keyword}&country=${country}`} className="flex items-center mb-2">
                    <Icon icon={RiArrowLeftLine} className="w-5 h-5 text-brand-400" />
                    <span className="text-brand-400 font-medium text-xs">Back</span>
                </Link>
                <h3 className='text-primary font-semibold text-2xl sm:text-3xl'>SERP overview</h3>
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
                    <Card className='p-4 sm:p-6 relative flex flex-col gap-6'>
                        <div>
                            <h3 className='text-primary text-lg font-semibold'>Pages</h3>
                            <p className="text-secondary text-xs">100 results</p>
                        </div>
                        <div className='bg-white gap-2 rounded-md w-full flex flex-col sm:flex-row'>
                            <Button icon={RiFileCopyLine} onClick={() => copySelectedRows()} className="h-9 bg-brand border-brand text-primary hover:bg-brand-600 hover:border-brand">Copy</Button>
                            <FilterButton text="URL" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                            <FilterButton text="Rank" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                            <FilterButton text="Backlinks" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                            <FilterButton text="Ref. domains" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                            <FilterButton text="Traffic" value={filterKeyword} handleChange={setFilterKeyword}></FilterButton>
                        </div>
                        <div className='overflow-x-auto custom-scroll'>
                            <table className="w-full min-w-md text-secondary border-separate border-spacing-x-0 border-spacing-y-1">
                                <thead className='text-xs'>
                                <tr>
                                    <th className='w-4 border-b border-default py-2 px-1 font-semibold text-center'>
                                        <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, -1)} />
                                    </th>
                                    <th className='border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                    <th className='w-6/12 border-b border-default py-2 px-1 font-semibold text-left'>URL</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Traffic</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Domain.Rank</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Page.Rank</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Backliniks</th>
                                    <th className='w-1/12 border-b border-default py-2 px-1 font-semibold text-right'>Ref.Domains</th>
                                </tr>
                                </thead>
                                <tbody className='text-sm'>
                                {serps?.serp.map((item:any, index:number) => (
                                    <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-surface'}`}>
                                    <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                                        <input type='checkbox' className='accent-brand h-3.5 w-3.5'  checked={checked.includes(index)} onChange={(e) => handleChecked(e.target.checked, index)}/>
                                    </td>
                                    <td className='py-2 px-1 h-8 font-medium text-center'>
                                        {index + 1}
                                    </td>
                                    <td className='py-2 px-1 h-8 font-medium text-primary'>
                                        <div className='w-full flex justify-between '>
                                        <span>{item.url.slice(0, 65)} {item.url.length > 65 ? '...' : ''}</span>
                                        <Tooltip content='Copy URL'>
                                            <span className='hover-child cursor-pointer' onClick={() => copyClipboard(item.url)}>
                                            <RiFileCopyLine className='w-4 h-4 text-secondary'/>
                                            </span>
                                        </Tooltip>
                                        </div>
                                    </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {serps.traffic_estimation?.[index]['metrics']['organic']['etv'].toFixed(2) || ''} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {serps.domain_ranks?.[index]['rank'] || ''} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {serps.ranks?.[index]['rank'] || ''} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {serps.backlinks?.[index]['backlinks'].toLocaleString() || ''} </td>
                                    <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {serps.referring_domains?.[index]['referring_domains'].toLocaleString() || ''} </td>
                                    </tr>
                                ))}
                                {loading && 
                                    <tr className='border-0 h-10 hover-parent hover:bg-surface'>
                                        <td className="text-center" colSpan={7}>
                                            <div className="flex justify-center items-center">
                                                <Icon icon={RiLoaderLine} className="animate-spin"></Icon>
                                                <span>Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                </tbody>
                            </table>   
                        </div>    
                    </Card>
                    </Grid>                    
            </div>
        </>
    );
}
