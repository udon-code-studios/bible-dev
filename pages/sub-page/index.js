import Head from 'next/head'

export default function SubPage() {
  return (
    <div>
      <Head>
        <title>Sub Page</title>
      </Head>

      <main>
        <h1 className="text-4xl">
          You are in a sub page.
        </h1>
      </main>
    </div>
  )
}
