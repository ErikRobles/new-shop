import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';

const Layout = ({ title, children }) => {
  const { state } = useContext(Store);
  const { cart } = state;
  const year = new Date().getFullYear();
  return (
    <>
      <Head>
        <title>{title ? title + ' - PeruShop' : 'PeruShop'}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          name='description'
          content='PeruShop E-Commerce Site Application'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-12 justify-between shadow-md items-center px-4'>
            <Link href='/'>
              <a className='text-lg font-bold'>PeruShop</a>
            </Link>
            <div>
              <Link href='/cart'>
                <a className='p-2'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </a>
              </Link>
              <Link href='/Login'>
                <a className='p-2'>Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <footer className='flex h-10 justify-center items-center shadow-inner'>
          PeruShop &copy; {year} All Rights Reserved.
        </footer>
      </div>
    </>
  );
};

export default Layout;
