import Head from 'next/head'

export default function SubPage() {
  return (
    <div>
      <Head>
        <title>Joshuas books</title>
      </Head>
      <main>
        <h1 className="text-4xl">
          You are in Joshua's Books.
        </h1>
      </main>
    </div>
  )
}
