import Head from 'next/head';
import Shelf from './shelf';

export default function SubPage() {
  return (
    <div>
      <Head>
        <title>Joshuas books</title>
      </Head>
      <main>
        <div className = 'h-screen'>
					<div className = 'flex justify-center'>
						<Shelf/>
					</div>
				</div>
      </main>
    </div>
  )
}
