import Link from 'next/link';
import {
  useQuery,
} from 'react-query'
import {fetchRandomPeople} from '../apis';

const TEST_RANDOM_PEOPLE_KEY = 'test_random_people';
function Test(props) {
  console.log(props);
  const result = useQuery(TEST_RANDOM_PEOPLE_KEY, fetchRandomPeople, {
    refetchOnWindowFocus: false,
    // refetchOnMount: false, // 이런 형태면 문제 발생
    initialData: props.data
  });

  return (
    <section>
      <div>
        <Link href="/">
            <a>/</a>
        </Link>
      </div>
      <div>{JSON.stringify(result?.data?.data?.info?.seed)}</div>
      {JSON.stringify(result)}
    </section>
  )
}

Test.getInitialProps = async (context) => {
  if (typeof window === 'undefined') {
    return {}
  }

  const response = await fetchRandomPeople();

  return {
    data: response.data
  }
}

export default Test;