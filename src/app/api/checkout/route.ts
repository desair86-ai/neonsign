import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { form, cart } = body;

    // WooCommerce REST API credentials
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;
    
    // We assume NEXT_PUBLIC_WORDPRESS_URL ends with /graphql, so we strip it.
    // e.g., https://example.com/graphql -> https://example.com
    const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
    const baseUrl = graphqlUrl.replace('/graphql', '');

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        { error: 'WooCommerce API keys are not configured on the server.' },
        { status: 500 }
      );
    }

    if (!baseUrl) {
      return NextResponse.json(
        { error: 'WordPress URL is not configured on the server.' },
        { status: 500 }
      );
    }

    // Format the order payload for WooCommerce
    const lineItems = cart.map((item: any) => ({
      product_id: item.databaseId || 0, // Fallback to 0 if we don't have databaseId
      quantity: item.quantity,
    }));

    // For custom products without a specific ID, you might want to create a line item with dynamic price.
    // However, basic Woo API requires product_id for standard items. 
    // If it's a completely custom item, you can pass name and total but WooCommerce requires a product ID generally.
    // To be safe, if we don't have a product ID, WooCommerce might reject it or treat it weirdly, but we'll try it.
    
    // Let's create a more robust line_items mapped to actual WP products.
    // If it's a completely custom sign, we should ideally have a generic "Custom Neon Sign" product ID to map it to, 
    // but we will try creating it as a simple fee or passing name.
    const formattedLineItems = cart.map((item: any) => {
        // Convert customDetails into WooCommerce meta_data
        const metaData = [];
        if (item.customDetails) {
            for (const [key, value] of Object.entries(item.customDetails)) {
                if (value !== undefined && value !== null && value !== '') {
                    metaData.push({ key: key.charAt(0).toUpperCase() + key.slice(1), value: String(value) });
                }
            }
        }

        if (item.databaseId) {
            return {
                product_id: item.databaseId,
                quantity: item.quantity,
                // Passing 'total' overrides the WooCommerce base product price
                total: String(item.price * item.quantity),
                meta_data: metaData
            };
        } else {
            // It's a custom sign with no database ID provided yet
            // WooCommerce typically accepts a line item with just name and total, but meta_data makes it robust
            return {
                name: item.name,
                total: String(item.price * item.quantity),
                quantity: item.quantity,
                meta_data: metaData
            };
        }
    });

    const orderData = {
      payment_method: form.paymentMethod,
      payment_method_title: form.paymentMethod === 'razorpay' ? 'Razorpay' : form.paymentMethod,
      set_paid: false,
      billing: {
        first_name: form.fullName.split(' ')[0] || '',
        last_name: form.fullName.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        address_2: '',
        city: form.city,
        state: form.state,
        postcode: form.pincode,
        country: 'IN',
        email: form.email,
        phone: form.phone
      },
      shipping: {
        first_name: form.fullName.split(' ')[0] || '',
        last_name: form.fullName.split(' ').slice(1).join(' ') || '',
        address_1: form.address,
        address_2: '',
        city: form.city,
        state: form.state,
        postcode: form.pincode,
        country: 'IN'
      },
      line_items: formattedLineItems
    };

    const authHeader = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const wpResponse = await fetch(`${baseUrl}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(orderData)
    });

    const responseData = await wpResponse.json();

    if (!wpResponse.ok) {
      console.error('WooCommerce API Error:', responseData);
      return NextResponse.json(
        { error: 'Failed to create order in WordPress', details: responseData },
        { status: wpResponse.status }
      );
    }

    return NextResponse.json({ success: true, order: responseData });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing checkout' },
      { status: 500 }
    );
  }
}
