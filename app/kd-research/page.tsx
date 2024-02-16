"use client";

import { RiArrowRightLine, RiFileCopyFill, RiFileCopyLine, RiFlag2Fill, RiInformationLine, RiSearchLine } from '@remixicon/react';
import { Title, Text, TextInput, Button, Grid, Card, BarChart, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, BadgeDelta } from '@tremor/react';
import TTIcon from '../components/icons/TTIcon';
import CountryPicker from '../components/CountryPicker';
import { useState } from 'react';
import KDCart from '../components/KDChart';
import { Tooltip } from '../components/Tooltip';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

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

export default function IndexPage() {
  const [country, setCountry] = useState('');
  const [checked, setChecked] = useState<number[]>([]);
  function generateRandomNumbers(min: number, max: number, count: number) {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push({date: 'Sep 23 2023', volume: randomNumber});
    }
    return randomNumbers;
  }
  function getBgClassByKD(kd: number) {
      if (kd > 90) return 'border-[#EF4444] bg-[#F87171]'
      else if (kd > 80) return 'border-[#F97316] bg-[#FB923C]'
      else if (kd > 65) return 'border-[#F59E0B] bg-[#FBBF24]'
      else if (kd > 35) return 'border-[#84CC16] bg-[#A3E635]'
      else if (kd > 20) return 'border-[#84CC16] bg-[#A3E635]'
      else return 'border-[#22C55E] bg-[#4ADE80]'

  }
  function handleChecked(c: Boolean, ind: number) {
    if ( ind === -1 ) {
      // if (c) {
      //   const arr = [];
      //   for (let i = 0; i < data.length; i++) {
      //     arr.push(i);          
      //   }
      //   setChecked(arr);
      // } else {
      //   setChecked([]);
      // }
    } else {
      if (c) {
        setChecked([...checked, ind]);
      } else {
        setChecked(checked.filter(cc => cc !== ind));
      }
    }
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl mt-16">
      <Title>KD Research</Title>
      <Text>Unlocking SEO Success: Understanding Keyword Difficulty with Research Tools</Text>
      <div className='mt-4'>
        <Title className='my-4'>Search & Location</Title>
        <div className='flex flex-row bg-white p-3 gap-2 rounded-md h-16 max-w-[700px]'>
            <TextInput icon={TTIcon} placeholder="Search..." />
              <CountryPicker country={country} setCountry={setCountry} />
            <Button icon={RiSearchLine} className='bg-[#05D5BF] text-black border-none flex flex-row hover:bg-[#05DFBF] pl-6'>
              <span className='hidden sm:block'>Search Keyword</span>
            </Button>
        </div>
      </div>
      <div className='mt-4'>
        <Title className='my-4'>Keyword difficulty - definition</Title>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={10}></KDCart>
            </div>
          </Card>
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={25}></KDCart>
            </div>
          </Card>
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={40}></KDCart>
            </div>
          </Card>
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={55}></KDCart>
            </div>
          </Card>
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={70}></KDCart>
            </div>
          </Card>
          <Card className='p-4 relative'>
            <h3 className='text-[#425752] text-md font-semibold'>Keyword Difficulty</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <div className='mt-2'>
              <KDCart value={99}></KDCart>
            </div>
          </Card>
        </Grid>
      </div>
      
      <div className='mt-4'>
        <Title className='my-4'>Details on chart</Title>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          <Card className='p-4 relative'>
            <h3 className="text-[#425752] text-sm font-semibold">Global Search Volume</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <p className="text-3xl font-semibold">1,251,600</p>
            <div className="flex text-[#425752] text-xs font-medium my-2 gap-1">
              <span>Keyword interest growth </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33353 10.7834V3.33341C7.33353 3.14453 7.39742 2.98619 7.5252 2.85841C7.65297 2.73064 7.81131 2.66675 8.0002 2.66675C8.18908 2.66675 8.34742 2.73064 8.4752 2.85841C8.60297 2.98619 8.66686 3.14453 8.66686 3.33341V10.7834L11.9335 7.51675C12.0669 7.38341 12.2224 7.31953 12.4002 7.32508C12.578 7.33064 12.7335 7.40008 12.8669 7.53341C12.9891 7.66675 13.053 7.8223 13.0585 8.00008C13.0641 8.17786 13.0002 8.33341 12.8669 8.46675L8.46686 12.8667C8.4002 12.9334 8.32797 12.9806 8.2502 13.0084C8.17242 13.0362 8.08908 13.0501 8.0002 13.0501C7.91131 13.0501 7.82797 13.0362 7.7502 13.0084C7.67242 12.9806 7.6002 12.9334 7.53353 12.8667L3.13353 8.46675C3.01131 8.34453 2.9502 8.19175 2.9502 8.00841C2.9502 7.82508 3.01131 7.66675 3.13353 7.53341C3.26686 7.40008 3.4252 7.33341 3.60853 7.33341C3.79186 7.33341 3.9502 7.40008 4.08353 7.53341L7.33353 10.7834Z" fill="#DC2626"/>
              </svg>
              <span className='text-red-600'>18%</span>
            </div>
            <BarChart
              data={generateRandomNumbers(1000, 4000, 40)}
              index="date"
              categories={['volume']}
              colors={['indigo-300']}
              showXAxis={false}
              showYAxis={false}
              showLegend={false}
              className='h-32'
            />
          </Card>
          <Card className='p-4 relative'>
            <h3 className="text-[#425752] text-sm font-semibold">Search Volume</h3>
            <Tooltip
              content='Keyword Difficulty (KD) - Is an SEO metric that estimates how hard it would be to rank on the first page of Google for a given keyword. It is measured on a scale from 0 to 100, with the latter being the hardest to rank for.'
            >
              <span className='absolute top-4 right-4'><RiInformationLine className='w-5 h-5 text-[#425752]' /></span>
            </Tooltip>
            <p className="text-3xl font-semibold">51,600</p>
            <div className="flex text-[#425752] text-xs font-medium my-2 gap-1">
              <span>Keyword interest growth </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33341 5.21662L4.06674 8.48328C3.93341 8.61662 3.77785 8.68051 3.60007 8.67495C3.4223 8.6694 3.26674 8.59995 3.13341 8.46662C3.01118 8.33328 2.9473 8.17773 2.94174 7.99995C2.93618 7.82217 3.00007 7.66662 3.13341 7.53328L7.53341 3.13328C7.60007 3.06662 7.6723 3.0194 7.75007 2.99162C7.82785 2.96384 7.91118 2.94995 8.00007 2.94995C8.08896 2.94995 8.1723 2.96384 8.25007 2.99162C8.32785 3.0194 8.40007 3.06662 8.46674 3.13328L12.8667 7.53328C12.989 7.65551 13.0501 7.80828 13.0501 7.99162C13.0501 8.17495 12.989 8.33328 12.8667 8.46662C12.7334 8.59995 12.5751 8.66662 12.3917 8.66662C12.2084 8.66662 12.0501 8.59995 11.9167 8.46662L8.66674 5.21662V12.6666C8.66674 12.8555 8.60285 13.0138 8.47507 13.1416C8.3473 13.2694 8.18896 13.3333 8.00007 13.3333C7.81118 13.3333 7.65285 13.2694 7.52507 13.1416C7.39729 13.0138 7.33341 12.8555 7.33341 12.6666V5.21662Z" fill="#15803D"/>
              </svg>
              <span className='text-green-600'>18%</span>
            </div>
            <BarChart
              data={generateRandomNumbers(1000, 4000, 40)}
              index="date"
              categories={['volume']}
              colors={['blue-300']}
              showXAxis={false}
              showYAxis={false}
              showLegend={false}
              className='h-32'
            />
          </Card>
        </Grid>
      </div>
      <div className='mt-4'>
        <Title className='my-4'>Keyword suggestions ( + Long tail keywords & questions) - hovers, tooltips</Title>
        <Grid numItemsSm={1} numItemsLg={2} className="gap-6">
          
          <Card className='p-6 relative'>
            <h3 className='text-[#0B0F0D] text-lg font-semibold'>Keyword Suggestions</h3>
            <div className='mt-2'>
            <table className="mt-5 w-full text-[#425752]">
              <thead className='text-xs'>
                <tr>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-center'>No.</th>
                  <th className='w-9/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold'>Keyword</th>
                  <th className='w-2/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>
                    <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                  </th>
                </tr>
              </thead>
              <tbody className='text-sm'>
                {data.map((item, index) => (
                  <tr key={index} className='border-0 h-8 hover:bg-[#F1F4F3] hover-parent'>
                    <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>{index + 1}</td>
                    <td className='py-2 px-1 h-8 font-medium text-[#0B0F0D]'>
                      <div className='w-full flex justify-between '>
                        <span>{item.keyword}</span>
                        <Tooltip content='Copy'>
                          <span className='hover-child cursor-pointer'>
                            <RiFileCopyLine className='w-4 h-4 text-[#425752]'/>
                            </span>
                        </Tooltip>
                      </div>
                    </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D] rounded-e-md'>
                      55,658
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>   
            <div className='mt-4'>
              <div className='bg-[#F1F4F3] text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-[#E1F1F1] '>
                <span className='hidden sm:block'>View All Keywords</span>
                <span><RiArrowRightLine /></span>
              </div>
            </div>           
            </div>
          </Card>
          <Card className='p-6 relative'>
            <h3 className='text-[#0B0F0D] text-lg font-semibold'>Long tail keywords & questions</h3>
            <div className='mt-2'>
              <table className="mt-5 w-full text-[#425752]">
                <thead className='text-xs'>
                  <tr>
                    <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-center'>No.</th>
                    <th className='w-9/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold'>Keyword</th>
                    <th className='w-2/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>
                      <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {data.map((item, index) => (
                    <tr key={index} className='border-0 h-8 hover:bg-[#F1F4F3] hover-parent'>
                      <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>{index + 1}</td>
                      <td className='py-2 px-1 h-8 font-medium text-[#0B0F0D]'>
                        <div className='w-full flex justify-between '>
                          <span>{item.Role}</span>
                          <Tooltip content='Copy'>
                            <span className='hover-child cursor-pointer'>
                              <RiFileCopyLine className='w-4 h-4 text-[#425752]'/>
                            </span>
                          </Tooltip>
                        </div>
                      </td>
                      <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D] rounded-e-md'>
                        55,658
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>              
            </div>
            <div className='mt-4'>
              <div className='bg-[#F1F4F3] text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-[#E1F1F1] '>
                <span className='hidden sm:block'>View All Keywords</span>
                <span><RiArrowRightLine /></span>
              </div>
            </div>
          </Card>
        </Grid>
      </div>
      <div className='mt-4'>
        <Title className='my-4'>SERP Overview</Title>
        <div className='hidden border-[#EF4444] bg-[#F87171]'></div>
        <div className='hidden border-[#F97316] bg-[#FB923C]'></div>
        <div className='hidden border-[#F59E0B] bg-[#FBBF24]'></div>
        <div className='hidden border-[#EAB308] bg-[#EAB308]'></div>
        <div className='hidden border-[#84CC16] bg-[#A3E635]'></div>
        <div className='hidden border-[#22C55E] bg-[#4ADE80]'></div>
        <Grid numItemsSm={1} numItemsLg={1} className="gap-6">
          <Card className='p-6 relative'>
            <h3 className='text-[#0B0F0D] text-lg font-semibold'>Keyword Suggestions</h3>
            <div className='mt-2'>
            <table className="mt-5 w-full text-[#425752] border-separate border-spacing-x-0 border-spacing-y-1">
              <thead className='text-xs'>
                <tr>
                  <th className='border-b border-[#D4DEDB] py-2 px-1 font-semibold text-center'>
                    <input type='checkbox' onChange={(e) => handleChecked(e.target.checked, -1)} />
                  </th>
                  <th className='border-b border-[#D4DEDB] py-2 px-1 font-semibold text-center'>No.</th>
                  <th className='w-5/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-left'>URL</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>KD</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>DA</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>UR</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>Backlinks</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>Ref.domains</th>
                  <th className='w-1/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>Keywords</th>
                  {/* <th className='w-2/12 border-b border-[#D4DEDB] py-2 px-1 font-semibold text-right'>
                    <Tooltip content='Search Volume'><span>SV</span></Tooltip>
                  </th> */}
                </tr>
              </thead>
              <tbody className='text-sm'>
                {data.map((item, index) => (
                  <tr key={index} className={`border-0 h-8 hover-parent ${checked.includes(index) ? 'bg-[#05D5BF12]' : 'hover:bg-[#F1F4F3]'}`}>
                    <td className='py-2 px-1 h-8 font-medium text-center rounded-s-md'>
                      <input type='checkbox' onChange={(e) => handleChecked(e.target.checked, index)}/>
                    </td>
                    <td className='py-2 px-1 h-8 font-medium text-center'>
                      {index + 1}
                    </td>
                    <td className='py-2 px-1 h-8 font-medium text-[#0B0F0D]'>
                      <div className='w-full flex justify-between '>
                        <span>{item.keyword}</span>
                        <Tooltip content='Copy URL'>
                          <span className='hover-child cursor-pointer'>
                            <RiFileCopyLine className='w-4 h-4 text-[#425752]'/>
                            </span>
                        </Tooltip>
                      </div>
                    </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D]'>
                    <Tooltip content='Keyword difficulty - '>
                      <Badge className={`w-8 h-5 text-xs text-[#0B0F0D] border ${getBgClassByKD(item.kd)}`}>{item.kd}</Badge>
                    </Tooltip>
                    </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D]'> 66 </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D]'> 66 </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D]'> 55,658 </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D]'> 55,658 </td>
                    <td className='py-2 px-1 h-8 font-medium text-right text-[#0B0F0D] rounded-e-md'> 765 </td>
                  </tr>
                ))}
              </tbody>
            </table>   
            <div className='mt-4'>
              <div className='bg-[#F1F4F3] text-black border-none flex flex-row h-[38px] py-2 px-4 text-sm font-semibold rounded-lg w-fit cursor-pointer hover:bg-[#E1F1F1] '>
                <span className='hidden sm:block'>Show top 100 positions</span>
                <span><RiArrowRightLine /></span>
              </div>
            </div>           
            </div>
          </Card>
        </Grid>

      </div>
    </main>
  );
}
