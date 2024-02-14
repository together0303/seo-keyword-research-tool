import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';

  const users = [] as User[];
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl mt-16">
      <Title>Rankulate</Title>
      <Text>Unlocking Your SEO Potential: Harnessing KD Research and Competitive Analysis Tools</Text>
    </main>
  );
}
