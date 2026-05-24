import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return new NextResponse('Image data is required', { status: 400 });
    }

    // The image data is a base64 string, so we might need to strip the prefix
    const base64Data = image.split(',')[1] || image;

    const apiResponse = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('External API Error:', {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        body: errorText,
      });
      return new NextResponse(errorText || 'Error from external API', { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    
    // The actual results are nested inside a 'result' property and are a JSON string.
    // We need to parse this string to get the final object.
    if (data.result) {
      const nestedResult = JSON.parse(data.result);
      return NextResponse.json(nestedResult);
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy Internal Error:', error);
    return new NextResponse('An internal server error occurred.', { status: 500 });
  }
}
