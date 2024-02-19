import KDResearch from "../components/pages/KDResearch";

export const metadata = {
  title: 'Rankulate - Keywords Research',
  description: 'Rankulate offers cutting-edge SEO tools designed to leverage in-depth KD research and competitive analysis, empowering businesses to enhance their online visibility and drive organic traffic. Stay ahead of the competition with Rankulate\'s comprehensive suite of SEO solutions',
};

export default function IndexPage() {
  
  return (
    <main className="px-4 md:px-10 mx-auto max-w-7xl mt-16 pb-6">
      <div className='flex flex-col justify-center items-center'>
        <KDResearch />
      </div>
    </main>
  );
}
