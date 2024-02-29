"use client";

import { RiDeleteBin6Line, RiErrorWarningLine, RiFileTextFill, RiSearchLine } from '@remixicon/react';
import { Textarea, Button, Icon } from '@tremor/react';
import { useRef, useState } from 'react';
import FileAddIcon from '../icons/FileAddIcon';
import CountryPicker from '../CountryPicker';
import TTIcon from '../icons/TTIcon';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '../../config';

const allowedMimeTypes = [
  'text/csv',
  'text/plain'
];

export default function KDResearch() {
  const [keywords, setKeywords] = useState('');
  const [country, setCountry] = useState('United States');
  const [file, setFile] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const router = useRouter();

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
        readKeywordsFromFile(e.target.files[0]);
        if (error) setError('');
      }
    } else {
      setError("Please select csv or text file.")
    }
  }
  const readKeywordsFromFile = (f: File) => {
    const reader = new FileReader();

    reader.onload = function(e:any) {
      let contents = e.target.result;

      contents = contents.replace(/^\s*[\r]/gm, '');
      let rows = contents.split('\n');
      rows = rows.map((r: string) => r.replace(/^"(.*)"$/, '$1').trim()).filter((r: string) => r.length > 0).join('\n');
      setKeywords(rows);

    }

    reader.readAsText(f);
  }

  const goToKeywordOverviewPage = () => {
    if (file) {
      router.push('/keyword-overview');
    } else if (keywords) {
      if ((keywords.match(/\n/g) || []).length > 0) {
        router.push('/keyword-manager');
      } else {
        router.push('/keyword-overview');
      }
    } else {
      setError("please input keywords or upload file.")
    }
  }
  const searchKeyword = () => {
    let k = keywords.split('\n').map((r: string) => r.trim()).filter((r: string) => r.length > 0);
    console.log(k)
    if (k.length > 0) {
      axios.post(API_URL + '/api/keywords/search', {keywords: k})
        .then(data => {
          if (k.length === 1) {
            router.push(`/keyword-overview?keyword=${k[0]}&country=${country}`);
          } else {
            router.push(`/keyword-manager?country=${country}`);
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setError("please input keywords or upload file.")
    }
  }
  return (
    <>
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
        {error &&
          <div className='py-3.5 px-4 bg-red-200 rounded-lg flex items-center gap-4'>
            <Icon icon={RiErrorWarningLine} className='text-red-700' />
            <p className='text-base text-primary font-normal'>{error}</p>
          </div>
        }
        {file ? <div className='py-3.5 px-4 bg-surface-50 rounded-lg flex justify-between items-center gap-4'>
            <div className='flex items-center gap-4'>
              <Icon icon={RiFileTextFill} className='text-brand-300' />
              <p>{file.name}</p>
            </div>
            <Icon icon={RiDeleteBin6Line} onClick={() => setFile(null)} className='text-secondary hover:text-primary cursor-pointer' />
          </div>
          : <div onClick={() => upload()} className='border border-surface-400 border-dashed rounded-lg p-6 flex flex-col justify-center items-center gap-1 cursor-pointer'>
            <FileAddIcon />
            <p className='text-sm font-normal text-primary'>Click or drop files here, to upload file</p>
            <p className='text-xs font-normal text-secondary'>Max uploaded file size is 5MB</p>
            <input type='file' ref={fileRef} onChange={(e) => handleFileSelect(e)} className='hidden' accept='.csv, .txt' />
          </div>
        }
        <div className='border-t'></div>
        <div className='flex gap-2'>
          <CountryPicker className="border-1 mt-2 sm:mt-0" country={country} setCountry={setCountry} />
          <Button onClick={() => searchKeyword()} icon={RiSearchLine} className='mt-2 sm:mt-0 bg-brand w-1/2 text-black border-none flex flex-row hover:bg-brand-600 pl-6'>
            <span className='hidden sm:block'>Search Keyword</span>
          </Button>
        </div>
      </div>
    </>
  );
}
