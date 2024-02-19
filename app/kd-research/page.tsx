"use client";

import { RiDeleteBin6Line, RiErrorWarningLine, RiFileAddLine, RiFileTextFill, RiSearchLine } from '@remixicon/react';
import { Title, Text, Textarea, TextInput, Button, Icon } from '@tremor/react';
import { useRef, useState } from 'react';
import FileAddIcon from '../components/icons/FileAddIcon';
import CountryPicker from '../components/CountryPicker';
import TTIcon from '../components/icons/TTIcon';

const allowedMimeTypes = [
  'text/csv',
  'text/plain'
];

export default function IndexPage() {
  const [keywords, setKeywords] = useState('');
  const [country, setCountry] = useState('');
  const [file, setFile] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const upload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  const handleFileSelect = (e: any) => {
    const files = e.target.files;
    if (files[0] && allowedMimeTypes.includes(files[0]['type'])) {
      if (files[0]['size'] > 5 * 1024 * 1024) {
        setError("The file is too big. Max file size is 5MB.")
      } else {
        setFile(e.target.files[0]);
        if (error) setError('');
      }
    } else {
      setError("Please select csv or text file.")
    }
  }
  return (
    <main className="px-4 md:px-10 mx-auto max-w-7xl mt-16 pb-6">
      <div className='flex flex-col justify-center items-center'>
        <div className='py-8 px-4'>
          <h3 className='text-primary text-center font-semibold text-2xl sm:text-3xl'>Keywords research</h3>
        </div>
        <div className='w-11/12 sm:w-4/5 max-w-[626px] bg-white p-6 rounded-2xl flex flex-col gap-4'>
          <div className='relative'>
            <TTIcon className="absolute top-3.5 left-0" />
            <Textarea
              id='keyword-input'
              className='py-3.5 pr-4 pl-10 gap-2 text-primary text-base h-48 sm:h-64'
              placeholder='Enter one or multiple keywords'
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          { error && 
            <div className='py-3.5 px-4 bg-red-200 rounded-lg flex items-center gap-4'>
              <Icon icon={RiErrorWarningLine} className='text-red-700' />
              <p className='text-base text-primary font-normal'>{error}</p>
            </div>
          }
          { file ? <div className='py-3.5 px-4 bg-surface-50 rounded-lg flex justify-between items-center gap-4'>
            <div className='flex items-center gap-4'>
              <Icon icon={RiFileTextFill} className='text-brand-300' />
              <p>{file.name}</p>
            </div>
            <Icon icon={RiDeleteBin6Line} onClick={() => setFile(null)} className='text-secondary hover:text-primary cursor-pointer' />
          </div>
          : <div onClick={() => upload()} className='border border-surface-400 border-dashed rounded-lg p-6 flex flex-col justify-center items-center gap-1'>
            <FileAddIcon />
            <p className='text-sm font-normal text-primary'>Click or drop files here, to upload file</p>
            <p className='text-xs font-normal text-secondary'>Max uploaded file size is 5MB</p>
            <input type='file' ref={fileRef} onChange={(e) => handleFileSelect(e)} className='hidden' accept='.csv, .txt'/>
          </div>
          }
          <div className='border-t'></div>
          <div className='flex gap-2'>
            <CountryPicker className="border-1 mt-2 sm:mt-0" country={country} setCountry={setCountry} />
            <Button icon={RiSearchLine} className='mt-2 sm:mt-0 bg-brand text-black border-none w-1/2 flex flex-row hover:bg-brand-600 pl-6'>
              <span>Search Keyword</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
