import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Testing backend API from Next.js API route...');

        const response = await fetch('http://localhost:5000/api/products?sortBy=newest&page=1&limit=5', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Backend response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Backend response success:', data.success);
        console.log('Backend response data length:', data.data?.length);

        return NextResponse.json({
            success: true,
            message: 'API test successful',
            backendResponse: data,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('API test failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}