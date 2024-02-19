import Link from "next/link";
import { Icon } from "@tremor/react";
import { RiArrowLeftLine } from "@remixicon/react";
import KeywordManager from "../components/pages/KeywordManager";

export const metadata = {
  title: 'Rankulate - Keywords Manager',
  description: 'Rankulate offers cutting-edge SEO tools designed to leverage in-depth KD research and competitive analysis, empowering businesses to enhance their online visibility and drive organic traffic. Stay ahead of the competition with Rankulate\'s comprehensive suite of SEO solutions',
};

export default function IndexPage() {
  
  return (
    <main className="mx-auto max-w-lg">
        <div className='mx-4 md:mx-10 mt-16 pb-6 '>
            <KeywordManager />
        </div>
    </main>
  );
}
