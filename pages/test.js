import Link from 'next/link';
import axios from 'axios';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  dehydrate
} from 'react-query'

function Test(props) {
  const result = useQuery('todos', async () => await axios.get('https://randomuser.me/api/'), {
    refetchOnWindowFocus: false,
    staleTime: 100,
    initialData: props.data
  });
  console.log('Test');
  return (
    <section>
      {JSON.stringify(result)}
      <div>Test Machine</div>
      <Link href="/">
          <a>/</a>
      </Link>
    </section>
  )
}

Test.getInitialProps = async (context) => {
  if (typeof window === 'undefined') {
    return {}
  }
  const response = await axios.get('https://randomuser.me/api/');

  return {
    data: response.data
  }
}

export default Test;