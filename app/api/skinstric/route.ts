import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, location } = await request.json();

    if (!name || !location) {
      return new NextResponse('Name and location are required', { status: 400 });
    }

    const apiResponse = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('External API Error:', {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        body: errorText,
      });
      return new NextResponse(errorText || apiResponse.statusText, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy Internal Error:', error);
    return new NextResponse('An internal server error occurred in the proxy.', { status: 500 });
  }
}
