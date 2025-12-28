import { NextRequest, NextResponse } from 'next/server';
import { generateScript } from '@/lib/script-generator';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || 'AllSet Profile';
    const stack = searchParams.get('stack')?.split(',') || [];

    if (stack.length === 0) {
        return new NextResponse('Error: No stack provided', { status: 400 });
    }

    const script = generateScript(name, stack);

    return new NextResponse(script, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
