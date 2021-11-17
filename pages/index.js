import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import Link from 'next/link';
import qs from 'qs';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  dehydrate
} from 'react-query'

function Home(props) {
  const queryClient = useQueryClient();
  const result = useQuery('todos', async () => await axios.get('https://randomuser.me/api/'), {
    refetchOnWindowFocus: false,
    staleTime: 100
  });

  const a = {some: 'dsfa', data: ["1","2"]};
  console.log(a);
  qs.stringify(a, { arrayFormat: 'comma' });
  if (queryClient.isFetching()) return <div>...loading now</div>

  return (
    <section>
      {JSON.stringify(result?.data?.data?.info?.seed)}
      <Link href="/test">
          <a>/test</a>
      </Link>
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
    </section>
  )
}

Home.getInitialProps = async (context) => {
  if (typeof window === 'undefined') return {};
  console.log(context);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('todos', async () => await axios.get('https://randomuser.me/api/'), { staleTime: 5000 });

  return {
    dehydratedState: dehydrate(queryClient),
  }
}

export default Home;