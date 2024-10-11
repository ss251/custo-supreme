import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('timings')
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error reading timings:', error);
    return NextResponse.json({ error: 'Failed to read timings', details: error as string }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const timings = await request.json();
    const { data, error } = await supabase
      .from('timings')
      .upsert({ id: 1, ...timings })
      .select();

    if (error) throw error;

    return NextResponse.json({ message: 'Timings updated successfully', data });
  } catch (error) {
    console.error('Error updating timings:', error);
    return NextResponse.json({ error: 'Failed to update timings', details: error as string }, { status: 500 });
  }
}