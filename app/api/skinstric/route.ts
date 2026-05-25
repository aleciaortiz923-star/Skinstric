import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ success: false, message: 'Image is required.' }, { status: 400 });
    }

    const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('External API Error:', errorData);
      return NextResponse.json({ success: false, message: 'An error occurred with the analysis service.' }, { status: response.status });
    }

    const data = await response.json();
   const rawData = data.data || data;

   const formatConcepts = (obj: Record<string, number> = {} ) => {
    return Object.entries(obj).map(([name, value])=> ({
      name,
      value,
    }))
   }
   return NextResponse.json({
    demographics: {
      age_appearance: {
        concepts: formatConcepts(rawData.age),
        raw: rawData.age,
      },
      gender_appearance: {
        concepts: formatConcepts(rawData.gender),
        raw: rawData.gender,
      },
      multicultural_appearance: {
        concepts: formatConcepts(rawData.race),
        raw: rawData.race,
      },
    },
   });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
