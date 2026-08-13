import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { id, fullName, phone, address, city, state, pincode } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    const wcStoreUrl = process.env.WOOCOMMERCE_STORE_URL?.replace(/\/$/, '') || '';
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!wcStoreUrl || !consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'WooCommerce API credentials missing' }, { status: 500 });
    }

    const [firstName, ...lastNameParts] = fullName ? fullName.split(' ') : ['', ''];
    const lastName = lastNameParts.join(' ');

    const authHeader = `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`;

    const updatePayload: any = {
      billing: {}
    };

    if (firstName) {
      updatePayload.first_name = firstName;
      updatePayload.billing.first_name = firstName;
    }
    if (lastName) {
      updatePayload.last_name = lastName;
      updatePayload.billing.last_name = lastName;
    }
    if (phone) updatePayload.billing.phone = phone;
    if (address) updatePayload.billing.address_1 = address;
    if (city) updatePayload.billing.city = city;
    if (state) updatePayload.billing.state = state;
    if (pincode) updatePayload.billing.postcode = pincode;

    const wcResponse = await fetch(`${wcStoreUrl}/wp-json/wc/v3/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(updatePayload)
    });

    const wcData = await wcResponse.json();

    if (!wcResponse.ok) {
      return NextResponse.json({ error: wcData.message || 'Profile update failed' }, { status: wcResponse.status });
    }

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
    console.error('Update Profile API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
