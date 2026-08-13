import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { fullName, email, password, phone } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const wcStoreUrl = process.env.WOOCOMMERCE_STORE_URL?.replace(/\/$/, '') || '';
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!wcStoreUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'WooCommerce API credentials missing' }, { status: 500 });
    }

    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    // Pass credentials via query string instead of Auth header to bypass server header stripping
    const wcUrl = `${wcStoreUrl}/wp-json/wc/v3/customers?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;

    const wcResponse = await fetch(wcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        billing: {
          first_name: firstName,
          last_name: lastName,
          phone: phone || '',
          email
        }
      })
    });

    const contentType = wcResponse.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await wcResponse.text();
      console.error("WooCommerce returned non-JSON:", text.substring(0, 200));
      return NextResponse.json({ error: 'WooCommerce API returned an invalid response (HTML). Please check your WOOCOMMERCE_STORE_URL in Vercel.' }, { status: 502 });
    }

    const wcData = await wcResponse.json();

    if (!wcResponse.ok) {
      // WooCommerce error response contains message
      return NextResponse.json({ error: wcData.message || 'Registration failed' }, { status: wcResponse.status });
    }

    return NextResponse.json({ 
      success: true, 
      customer: {
        id: wcData.id.toString(),
        email: wcData.email,
        fullName: `${wcData.first_name} ${wcData.last_name}`.trim(),
        phone: wcData.billing?.phone || ''
      }
    });

  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
