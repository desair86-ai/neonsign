import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const wcStoreUrl = process.env.WOOCOMMERCE_STORE_URL?.replace(/\/$/, '') || '';
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!wcStoreUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'WooCommerce API credentials missing' }, { status: 500 });
    }

    // Since headless WP doesn't have a native REST login without JWT plugin,
    // we can securely verify the password by attempting to log into wp-login.php
    const loginParams = new URLSearchParams();
    loginParams.append('log', email);
    loginParams.append('pwd', password);
    loginParams.append('wp-submit', 'Log In');
    loginParams.append('testcookie', '1');

    const loginRes = await fetch(`${wcStoreUrl}/wp-login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginParams.toString(),
      redirect: 'manual' // We don't want it to follow redirects automatically
    });

    // WordPress typically returns 302 redirect on successful login
    // and sets authentication cookies in the headers.
    const setCookieHeader = loginRes.headers.get('set-cookie') || '';
    const isLoginSuccessful = setCookieHeader.includes('wordpress_logged_in_') || loginRes.status === 302;

    if (!isLoginSuccessful) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Now that we've verified the password, let's fetch the customer data via WooCommerce API
    const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;
    const customerRes = await fetch(`${wcStoreUrl}/wp-json/wc/v3/customers?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    });

    const contentType = customerRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await customerRes.text();
      console.error("WooCommerce returned non-JSON:", text.substring(0, 200));
      return NextResponse.json({ error: 'WooCommerce API returned an invalid response (HTML). Please check your WOOCOMMERCE_STORE_URL in Vercel.' }, { status: 502 });
    }

    const customers = await customerRes.json();
    if (!customers || customers.length === 0) {
      return NextResponse.json({ error: 'Customer not found in WooCommerce' }, { status: 404 });
    }

    const wcData = customers[0];

    return NextResponse.json({ 
      success: true, 
      customer: {
        id: wcData.id.toString(),
        email: wcData.email,
        fullName: `${wcData.first_name} ${wcData.last_name}`.trim(),
        phone: wcData.billing?.phone || '',
        address: wcData.billing?.address_1 || '',
        city: wcData.billing?.city || '',
        state: wcData.billing?.state || '',
        pincode: wcData.billing?.postcode || '',
        createdAt: wcData.date_created
      }
    });

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
