import Link from 'next/link';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  dehydrate
} from 'react-query';
import {fetchRandomPeople} from '../apis';

const RANDOM_PEOPLE_KEY = 'random_people';

function Home(props) {
  const queryClient = useQueryClient();
  const result = useQuery(RANDOM_PEOPLE_KEY, fetchRandomPeople, {
    refetchOnWindowFocus: false,
    staleTime: 100
  });

  if (queryClient.isFetching()) return <div>...loading now</div>

  return (
    <section>
      <div>
        <Link href="/test">
            <a>/test</a>
        </Link>
      </div>
      {JSON.stringify(result?.data?.data?.info?.seed)}
    </section>
  )
}

Home.getInitialProps = async (context) => {
  if (typeof window === 'undefined') return {};

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(RANDOM_PEOPLE_KEY, fetchRandomPeople, { staleTime: 5000 });

  return {
    dehydratedState: dehydrate(queryClient),
  }
}

export default Home;