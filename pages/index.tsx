import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";

interface DataType {
  data?: any;
}

type Props = {
  data?: DataType[];
};

const Home: NextPage = (props: Props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Head>
        <title>Frontend Task</title>
        <meta name="description" content="Frontend Task" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold text-red-800">hello</h1>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const _props: Props = {
    data: [{}],
  };

  return {
    props: _props,
  };
};

export default Home;
