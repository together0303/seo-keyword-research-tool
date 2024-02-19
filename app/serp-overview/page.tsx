"use client";

import { useState } from "react";
import { Badge, Button, Card, Grid, Icon, Select, SelectItem, TextInput } from "@tremor/react";
import CountryPicker from "../components/CountryPicker";
import { RiArrowLeftLine, RiArrowLeftSLine, RiArrowRightSLine, RiFileCopyLine, RiSearchLine } from "@remixicon/react";
import TTIcon from "../components/icons/TTIcon";
import { Tooltip } from "../components/Tooltip";
import test from "../keyword-manager/TEST";
import Link from "next/link";
  
export default function IndexPage() {
    const [filterKeyword, setFilterKeyword] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [checked, setChecked] = useState<number[]>([]);
    
    const data = test();

    function handleChecked(c: Boolean, ind: number) {
        if ( ind === -1 ) {
    
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
    return (
        <main className="mx-auto max-w-lg">
            <div className='mx-4 md:mx-10 mt-16 pb-6 '>
                <div className='py-8'>
                    <Link href={"/keyword-overview"} className="flex items-center mb-2">
                        <Icon icon={RiArrowLeftLine} className="w-5 h-5 text-brand-400" />
                        <span className="text-brand-400 font-medium text-xs">Back</span>
                    </Link>
                    <h3 className='text-primary font-semibold text-2xl sm:text-3xl'>SERP overview</h3>
                </div>
                <div className='flex flex-col gap-6'>
                    
                    <div className='bg-white p-3 gap-2 rounded-md max-w-[368px] sm:max-w-[768px] sm:flex flex-row sm:h-16'>
                        <TextInput className='border-1 mt-2 sm:mt-0' icon={TTIcon} placeholder="Search..." />
                        <CountryPicker className="border-1 mt-2 sm:mt-0" country={country} setCountry={setCountry} />
                        <Button icon={RiSearchLine} className='mt-2 sm:mt-0 bg-brand text-black border-none flex flex-row hover:bg-brand-600 pl-6'>
                            <span>Search Keyword</span>
                        </Button>
                    </div>


                    <Grid numItemsSm={1} numItemsLg={1} className="gap-4 sm:gap-6">
                        <Card className='p-4 sm:p-6 relative flex flex-col gap-6'>
                            <div>
                                <h3 className='text-primary text-lg font-semibold'>Pages</h3>
                                <p className="text-secondary text-xs">4,677 results</p>
                            </div>
                            <div className='overflow-x-auto custom-scroll'>
                                <table className="w-full min-w-md text-secondary border-separate border-spacing-x-0 border-spacing-y-1">
                                    <thead className='text-xs'>
                                    <tr>
                                        <th className='w-4 border-b border-default py-2 px-1 font-semibold text-center'>
                                            <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, -1)} />
                                        </th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-center'>No.</th>
                                        <th className='w-5/12 border-b border-default py-2 px-1 font-semibold text-left'>Keyword</th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Traffic</th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Keywords</th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Top keyword</th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Volume</th>
                                        <th className='border-b border-default py-2 px-1 font-semibold text-right'>Position</th>
                                    </tr>
                                    </thead>
                                    <tbody className='text-sm'>
                                    {data.map((item, index) => (
                                        <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-surface'}`}>
                                        <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                                            <input type='checkbox' className='accent-brand h-3.5 w-3.5' onChange={(e) => handleChecked(e.target.checked, index)}/>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-center'>
                                            {index + 1}
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-primary'>
                                            <div className='w-full flex justify-between '>
                                            <span>{item.keyword}</span>
                                            <Tooltip content='Copy URL'>
                                                <span className='hover-child cursor-pointer'>
                                                <RiFileCopyLine className='w-4 h-4 text-secondary'/>
                                                </span>
                                            </Tooltip>
                                            </div>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-medium text-right text-primary'>
                                        <Tooltip content='Keyword difficulty - '>
                                            <Badge className={`w-8 h-5 text-xs text-primary border ${getBgClassByKD(item.kd)}`}>{item.kd}</Badge>
                                        </Tooltip>
                                        </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {item.sv} </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {item.tkeyword} </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> ${item.cpc} </td>
                                        <td className='py-2 px-1 h-8 font-normal text-right text-primary'> {item.et} </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>   
                            </div>
                            <div className='mt-4 flex flex-wrap items-center gap-4'>
                                <div className="min-w-20 text-sm text-secondary">
                                    <Select defaultValue="50" >
                                        <SelectItem value="50"><b>50</b> rows per page</SelectItem>
                                        <SelectItem value="100">100 rows per page</SelectItem>
                                        <SelectItem value="200">200 rows per page</SelectItem>
                                        <SelectItem value="250">250 rows per page</SelectItem>
                                        <SelectItem value="300">300 rows per page</SelectItem>
                                    </Select>
                                </div>
                                <div className="min-w-20">
                                    <button className="h-9 py-2 px-3 text-sm text-secondary border border-surface-400 hover:bg-surface rounded-lg flex justify-center items-center">
                                        <Icon icon={RiArrowLeftSLine} className="text-gray-400" />
                                        <span className="text-primary ml-1 font-medium">1 - 50 from 617</span>
                                        <Icon icon={RiArrowRightSLine} className="text-primary" />
                                    </button>
                                </div>
                            </div>           
                        </Card>
                        </Grid>                    
                </div>
            </div>
        </main>
    );
}
